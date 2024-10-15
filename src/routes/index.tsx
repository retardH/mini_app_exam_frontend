import { useAppContext } from "@/context/AppContext";
import HomePage from "@/pages/home/HomePage";
import OrderInformation from "@/pages/order-info/CartPage";
import ReceiptPage from "@/pages/receipt/ReceiptPage";
import { getUserInfo } from "@/services/auto-login";
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { createMemoryRouter } from "react-router-dom";

const routes = createMemoryRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  // {
  //   path: "/detail/:id",
  //   element: <DetailPage />,
  // },
  {
    path: "/order-info",
    element: <OrderInformation />,
  },
  {
    path: "/receipt",
    element: <ReceiptPage />,
  },
]);

const AppRoutes = () => {
  const { dispatch } = useAppContext();
  useEffect(() => {
    window.ma.callNativeAPI(
      "gethwssostring",
      { merchantAppId: "kp7595593cfcbf4af38d381570001225" },
      (res) => {
        console.log("ssostring: ", res);
        const callbackKey = res.xm_string_callback_key;
        getUserInfo(callbackKey)
          .then((data) => {
            console.log("get user info response === ", data);
            dispatch({
              type: "SET_USER_ID",
              payload: data.Response.customer_info.openID,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
    );
  }, []);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default AppRoutes;
