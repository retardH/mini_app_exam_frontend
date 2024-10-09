import DetailPage from "@/pages/detail/DetailPage";
import HomePage from "@/pages/home/HomePage";
import OrderInformation from "@/pages/order-info/CartPage";
import ReceiptPage from "@/pages/receipt/ReceiptPage";
import { getUserInfo } from "@/services/auto-login";
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { createHashRouter } from "react-router-dom";

const routes = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/detail/:id",
    element: <DetailPage />,
  },
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
  useEffect(() => {
    getUserInfo(
      "a33d87224a7d2b95fe3d60c696b8831416810ced06228a4d2a51f8623b7da383" // replace with token from ma.callNativeApi()
    )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default AppRoutes;
