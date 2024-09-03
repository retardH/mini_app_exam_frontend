import useCounterState from "@/store/counter.store";
import useObjState from "@/store/objState.store";

const Reset = () => {
  const { resetCount } = useCounterState();
  const { resetObj } = useObjState();

  const handleReset = () => {
    resetCount(1);
    resetObj({ value: 1 });
  };
  return (
    <div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Reset;
