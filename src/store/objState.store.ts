import useGlobalState from "@/hooks/useGlobalState";

type objValueType = {
    value: number;
}
interface ObjState {
    obj: objValueType;
    setObj: (count: objValueType) => void;
    resetObj: (resetValue?: objValueType) => void;
}


const useObjState = (): ObjState => {
    const countStateConfig = { name: "objState", defaultValue: { value: 1 } }
    const
        { value: obj,
            updateValue: setObj,
            resetPersistent: resetObj
        } = useGlobalState<objValueType>(countStateConfig);

    return { obj, setObj, resetObj };
};

export default useObjState;
