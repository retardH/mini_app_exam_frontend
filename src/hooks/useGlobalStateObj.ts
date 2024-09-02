// useStateObject.ts
import { useEffect, useState } from 'react';
import { useGlobalState } from '../context/GlobalStateContext';

// Define the type for the action
interface Action<T> {
    type: 'UPDATE_VALUE';
    name: string;
    value: T;
}

// Define the generic hook
const useStateObject = <T>(name: string, defaultValue?: T) => {
    const { state, dispatch } = useGlobalState();
    const [value, setValue] = useState<T | undefined>(state[name]?.value);

    useEffect(() => {
        // Initialize the state object if it does not exist
        const storedValue = localStorage.getItem(name);
        const initialValue = storedValue !== null ? JSON.parse(storedValue) : defaultValue;

        if (!state[name]) {
            dispatch({ type: 'UPDATE_VALUE', name, value: initialValue } as Action<T>);
        }

        // Update local state to match the global state
        setValue(state[name]?.value);
    }, [name, defaultValue, state, dispatch]);

    const updateValue = (newValue: T) => {
        dispatch({ type: 'UPDATE_VALUE', name, value: newValue } as Action<T>);
        localStorage.setItem(name, JSON.stringify(newValue));
        setValue(newValue);
    };

    const resetPersistent = () => {
        if (state[name]) {
            localStorage.removeItem(name);
        }

    };

    return {
        value: value as T,
        updateValue,
        resetPersistent
    };
};

export default useStateObject;