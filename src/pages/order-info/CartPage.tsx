import { FC } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { useAppContext } from "@/context/AppContext";
import TopBar from "@/components/top-bar/TopBar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const OrderInformation: FC = () => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();
  const totalPrice = state.cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  return (
    <>
      <TopBar title="Cart" />
      <section className="mt-[60px] flex flex-col h-[calc(100dvh-60px)]">
        <div className="p-2 pb-4 overflow-scroll flex-grow flex flex-col gap-2">
          {/* <h6 className="text-lg">Your items</h6> */}
          <div className="flex flex-col gap-2">
            {state.cart.length > 0 ? (
              state.cart.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-stretch justify-stretch gap-2"
                  >
                    <figure className="p-2 shadow-sm rounded-md bg-stone-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-[80px] h-[80px] object-contain object-center"
                      />
                    </figure>
                    <div className="h-full justify-between flex-grow flex flex-col">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <span className="text-sm">${item.price}</span>
                      </div>
                      <div className="mt-2 flex w-full items-center justify-between">
                        <div
                          role="button"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item.id,
                            });
                          }}
                          className="flex items-center mt-auto justify-center max-w-min gap-1 rounded-md bg-red-50 p-2"
                        >
                          <TrashIcon width={16} height={16} strokeColor="red" />
                          <span className="text-sm text-red-600">Remove</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => {
                              dispatch({
                                type: "DECREASE_ITEM_QUANTITY",
                                payload: item.id,
                              });
                            }}
                          >
                            <MinusIcon width={18} height={18} />
                          </button>
                          <span className="text-sm w-[15px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              dispatch({
                                type: "INCREASE_ITEM_QUANTITY",
                                payload: item.id,
                              });
                            }}
                          >
                            <PlusIcon width={18} height={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-stone-600 mt-4 text-sm">
                No Item In The Cart Yet.
              </div>
            )}
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-green-600 gap-0 bg-green-100/50 rounded-xl max-w-max mx-auto mt-2"
            onClick={() => navigate("/home")}
          >
            <PlusIcon width={8} height={8} />
            <span className="text-xs">Add More</span>
          </Button>
          {/* <Link
            to="/"
            className="w-full py-2 px-3 max-w-max mx-auto border-2 text-sm border-green-600 text-green-600 rounded-md"
          >
            Add More
          </Link> */}
        </div>
        <footer className="flex p-2 items-center gap-2 flex-row">
          <div>
            <p className="text-sm">Total</p>
            <p className="font-semibold tracking-wide w-[50px] text-left">
              ${totalPrice}
            </p>
          </div>
          <Button
            disabled={totalPrice <= 0}
            className="w-full"
            // className="py-2 w-full flex-grow px-4 disabled:bg-stone-300 text-white rounded-md bg-green-600"
            onClick={() => navigate("/receipt")}
          >
            Order Now
          </Button>
        </footer>
      </section>
    </>
  );
};

export default OrderInformation;
