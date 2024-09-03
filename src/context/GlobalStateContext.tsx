import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define a type for state objects
interface StateObject<T> {
  name: string;
  value: T;
  dispatch: React.Dispatch<Action<T>>;
}

// Define the state type
interface GlobalState<T> {
  [key: string]: StateObject<T>;
}

// Define actions for updating state
type Action<T> = { type: "UPDATE_VALUE"; name: string; value: T };

// Define the reducer
function globalReducer<T>(
  state: GlobalState<T>,
  action: Action<T>
): GlobalState<T> {
  switch (action.type) {
    case "UPDATE_VALUE":
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          value: action.value,
        },
      };
    default:
      return state;
  }
}

// Create the context
const GlobalStateContext = createContext<
  { state: GlobalState<any>; dispatch: React.Dispatch<Action<any>> } | undefined
>(undefined);

// Create the provider component
const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer<any>, {});

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the context
const useGlobalContext = <T,>() => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalStateProvider"
    );
  }
  return context as {
    state: GlobalState<T>;
    dispatch: React.Dispatch<Action<T>>;
  };
};

export { GlobalStateProvider, useGlobalContext };
