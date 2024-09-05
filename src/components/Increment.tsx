import useCounterState from "@/store/counter.store";
import useObjState from "@/store/objState.store";

const Increment = () => {
  const { setCount } = useCounterState();
  const { obj, setObj } = useObjState();

  return (
    <button
      onClick={() => {
        setCount((prev) => prev + 1);
        setObj({ value: obj.value + 1 });
      }}
    >
      Increment
    </button>
  );
};

export default Increment;
