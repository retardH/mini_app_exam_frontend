import useObjState from "@/store/objState.store";

const ObjectTest = () => {
  const { obj } = useObjState();
  return <div>{JSON.stringify(obj, null, 2)}</div>;
};

export default ObjectTest;
