import useStateObject from "../hooks/useGlobalStateObj";

const Increment = () => {
  const { value, updateValue } = useStateObject<number>("count");
  const { value: obj, updateValue: setObj } = useStateObject<{
    value: number;
  }>("objState");

  return (
    <button
      onClick={() => {
        updateValue(value + 1);
        setObj({ value: obj.value + 1 });
      }}
    >
      Increment
    </button>
  );
};

export default Increment;
