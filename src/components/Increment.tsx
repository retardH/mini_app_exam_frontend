import useCounterState from "@/store/counter.store";
import useObjState from "@/store/objState.store";

const Increment = () => {
  const { count, setCount } = useCounterState();
  const { obj, setObj } = useObjState();

  return (
    <button
      onClick={() => {
        setCount(count + 1);
        setObj({ value: obj.value + 1 });
      }}
    >
      Increment
    </button>
  );
};

export default Increment;
