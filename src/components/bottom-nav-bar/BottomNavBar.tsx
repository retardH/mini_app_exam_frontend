import { NavLink } from "react-router-dom";

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 px-4 w-full bg-white shadow-md rounded-t-xl h-[60px] flex items-center">
      <div className="w-full flex items-center justify-between gap-2">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/">Favorites</NavLink>
        <NavLink to="/">Cart</NavLink>
      </div>
    </nav>
  );
};

export default BottomNavBar;
