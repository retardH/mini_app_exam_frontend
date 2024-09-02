import useStateObject from "../hooks/useGlobalStateObj";

const Reset = () => {
  const { updateValue, resetPersistent } = useStateObject<number>("count");
  const { updateValue: setObj, resetPersistent: resetObj } = useStateObject<{
    value: number;
  }>("objState");

  const handleReset = () => {
    updateValue(1);
    setObj({ value: 1 });
    resetPersistent();
    resetObj();
  };
  return (
    <div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Reset;
