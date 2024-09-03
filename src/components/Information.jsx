import useCounterState from "@/store/counter.store";
import Decrement from "./Decrement";
import Increment from "./Increment";
import ObjectTest from "./ObjectTest";
import Reset from "./Reset";
import Typography from "./Typography";

const Information = () => {
  const { count } = useCounterState();
  return (
    <div>
      <Typography
        textAlign="center"
        color="darkBlue"
        fontWeight={"bold"}
        fontSize={"20px"}
      >
        React (TS + JS + SCSS)
      </Typography>
      <Typography textAlign="center">
        <Decrement />
        <Increment />
        <Reset />
      </Typography>

      <Typography textAlign="center">
        Persist State: {count}
        <ObjectTest />
      </Typography>
    </div>
  );
};

export default Information;
