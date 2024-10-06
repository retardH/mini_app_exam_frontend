import DetailPage from "@/pages/detail/DetailPage";
import HomePage from "@/pages/home/HomePage";
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
]);

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default AppRoutes;
