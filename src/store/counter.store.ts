import useGlobalState from "@/hooks/useGlobalState";

interface CounterState {
    count: number;
    setCount: (count: number | ((prevCount: number) => number)) => void;
    resetCount: (resetValue?: number) => void;
}

const useCounterState = (): CounterState => {
    const countStateConfig = { name: "count", defaultValue: 1, isPersist: true }
    const
        { value: count,
            updateValue: setCount,
            resetPersistent: resetCount
        } = useGlobalState<number>(countStateConfig);

    return { count, setCount, resetCount };
};

export default useCounterState;
