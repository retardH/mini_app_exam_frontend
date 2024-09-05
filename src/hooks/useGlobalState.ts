// useStateObject.ts
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/GlobalStateContext';

// Define the type for the action
interface Action<T> {
    type: 'UPDATE_VALUE';
    name: string;
    value: T;
}

// Define the generic hook
const useGlobalState = <T>({ name: stateName, defaultValue, isPersist }: { name: string, defaultValue?: T, isPersist?: boolean }) => {
    const { state, dispatch } = useGlobalContext();
    const [value, setValue] = useState<T | undefined>(state[stateName]?.value as T);

    const isPersistAndSetLocalStorage = (value: T) => {
        isPersist && localStorage.setItem(stateName, JSON.stringify(value));
    }

    useEffect(() => {

        // Initialize the state object if it does not exist
        const storedValue = localStorage.getItem(stateName);
        const initialValue = storedValue !== null ? JSON.parse(storedValue) : defaultValue;


        if (!state[stateName]) {
            dispatch({ type: 'UPDATE_VALUE', name: stateName, value: initialValue } as Action<T>);
        }

        // Update local state to match the global state
        setValue(state[stateName]?.value as T);
    }, [stateName, defaultValue, state, dispatch]);




    const updateValue = (newValue: T | ((prevValue: T) => T)) => {
        // If newValue is a function, call it with the current value to get the new value
        const updatedValue = typeof newValue === 'function' ?
            (newValue as (prevValue: T) => T)(value as T) // this is function call syntax eg: newValue(value) newValue is passed void function
            : newValue;

        dispatch({ type: 'UPDATE_VALUE', name: stateName, value: updatedValue } as Action<T>);
        isPersistAndSetLocalStorage(updatedValue);
        setValue(updatedValue);
    };

    const resetPersistent = (resetValue?: T) => {
        if (state[stateName]) {
            localStorage.removeItem(stateName);
        }
        if (resetValue !== undefined) {
            setValue(resetValue);
            dispatch({ type: 'UPDATE_VALUE', name: stateName, value: resetValue } as Action<T>);
        }
        return
    };

    return {
        value: value as T,
        updateValue,
        resetPersistent
    };
};

export default useGlobalState;