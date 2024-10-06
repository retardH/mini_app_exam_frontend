import { FC, ReactNode } from "react";
import { ChevronLeftIcon } from "../icons";
import { useNavigate } from "react-router";

interface TopBarProps {
  includeBackNavigation?: boolean;
  renderRightIcon?: () => ReactNode;
  title: string;
}
const TopBar: FC<TopBarProps> = ({
  renderRightIcon,
  includeBackNavigation = true,
  title,
}) => {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 w-full bg-white border-b h-[60px] flex items-center justify-between px-2">
      {includeBackNavigation ? (
        <button onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
      ) : (
        <div></div>
      )}
      <h4 className="text-lg font-medium">{title}</h4>
      {renderRightIcon ? renderRightIcon() : <div></div>}
    </header>
  );
};

export default TopBar;
