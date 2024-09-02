import useStateObject from "../hooks/useGlobalStateObj";

const ObjectTest = () => {
  const { value: obj } = useStateObject("objState", { value: 1 });
  return <div>{JSON.stringify(obj, null, 2)}</div>;
};

export default ObjectTest;
