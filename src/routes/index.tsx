import HomePage from "@/pages/home/HomePage";
import OrderInformation from "@/pages/order-info/CartPage";
import ReceiptPage from "@/pages/receipt/ReceiptPage";
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
  // const { dispatch } = useAppContext();
  // useEffect(() => {
  // window.ma.callNativeAPI(
  //   "gethwssostring",
  //   { merchantAppId: "kp28b334394b244516a1f5ba436fb7bf" },
  //   (res) => {
  //     console.log("ssostring: ", res);
  //   }
  // );

  // getUserInfo(
  //   "90cedc3b93464659704586cf67947ff9" // replace with token from ma.callNativeApi()
  // )
  //   .then((data) => {
  //     console.log("get user info response === ", data);
  //     dispatch({
  //       type: "SET_USER_ID",
  //       payload: data.Response.customer_info.openID,
  //     });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // }, []);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default AppRoutes;
