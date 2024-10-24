import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SplashScreenPage = () => {
  const navigate = useNavigate();
  let [timerSec, setTimerSec] = useState(5);

  useEffect(() => {
    let intervalRef = setInterval(() => {
      setTimerSec((prev) => (prev <= 1 ? 1 : prev - 1));
      if (timerSec === 1) {
        navigate("/home", { replace: true });
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef);
    };
  }, [timerSec]);

  return (
    <div className="w-full h-[100dvh] p-2 pb-4 bg-green-600 flex flex-col justify-center items-center">
      <div className="flex-grow flex flex-col items-center justify-center">
        <img src="/banner.png" alt="banner" />
        <h4 className="text-xl font-medium text-white">
          Welcome to Our [NAME HERE]
        </h4>
        <p className="text-sm text-stone-100">
          Get your fresh goodies in as fast as an hour
        </p>
      </div>
      <button
        onClick={() => navigate("/home", { replace: true })}
        className="py-2 px-4 bg-stone-50 text-green-600 font-medium rounded-md w-full"
      >
        Get Started ({timerSec})
      </button>
    </div>
  );
};

export default SplashScreenPage;
