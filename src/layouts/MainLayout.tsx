import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <nav className="nav-bar">
        <h6>Home</h6>
      </nav>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
