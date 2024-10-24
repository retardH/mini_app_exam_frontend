import TopBar from "@/components/top-bar/TopBar";
import { useAppContext } from "@/context/AppContext";
import { createOrder, startPay } from "@/services/payment";
import { useState } from "react";
import { useNavigate } from "react-router";

const ReceiptPage = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const totalPrice = state.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const deliveryFee = totalPrice > 1000 ? 0 : 6;
  const [isLoading, setIsLoading] = useState(false);

  const handlePay = async () => {
    setIsLoading(true);
    try {
      const { orderInfo, prepay_id, result, sign, signType } =
        await createOrder((totalPrice + deliveryFee).toString());

      const payload: StartPay = {
        prepayId: prepay_id,
        orderInfo: orderInfo,
        sign: sign,
        signType: signType,
        disableNewCheckout: "true",
        tradeType: "MINIAPP",
      };
      console.log("Prepay ID:", prepay_id);

      setIsLoading(false);
      if (result !== "FAIL") {
        startPay(payload, () => {
          window.ma
            .showToast({
              title: "Payment Success",
              icon: "success",
            })
            .then(() => {
              console.log("Payment Success");
            });

          // clear cart and navigate back to home page
          dispatch({
            type: "CLEAR_CART",
          });
          navigate("/", { replace: true });
        });
      } else {
        alert("Payment Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TopBar title="Receipt" />
      <div className="mt-[60px] flex flex-col h-[calc(100dvh-60px)] p-2">
        <div className="flex-grow">
          <div className="bg-stone-50 px-4 pt-5 pb-6 shadow-sm border rounded-md text-sm">
            <h4 className="text-lg font-medium">Order Summary</h4>
            <ul className="space-y-1 mt-2">
              {state.cart.map((item) => {
                return (
                  <li
                    key={item.id}
                    className="flex items-center w-full justify-between
                  "
                  >
                    <span className="text-sm">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-sm">
                      ${item.price * item.quantity}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="h-[0.5px] w-full bg-stone-200 my-4"></div>
            <div className="flex items-center justify-between">
              <span>Sub-total</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex items-center mt-2 justify-between">
              <span>Devlivery Fee</span>
              <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
            </div>
          </div>
        </div>
        <footer className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-lg">Total</span>
            <span className="text-lg font-semibold">
              ${totalPrice + deliveryFee}
            </span>
          </div>
          <button
            onClick={handlePay}
            className="py-2 bg-green-600 text-white rounded-md w-full px-4"
          >
            {isLoading ? "Loading..." : "Pay Now"}
          </button>
        </footer>
      </div>
    </>
  );
};

export default ReceiptPage;
