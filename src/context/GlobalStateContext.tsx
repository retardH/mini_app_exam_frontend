// GlobalStateContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define a type for state objects
interface StateObject<T> {
  name: string;
  value: T;
  dispatch: React.Dispatch<Action>;
}

// Define the state type
interface GlobalState {
  [key: string]: StateObject<any>;
}

// Define actions for updating state
type Action = { type: "UPDATE_VALUE"; name: string; value: any };

// Define the reducer
function globalReducer(state: GlobalState, action: Action): GlobalState {
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
  | {
      state: GlobalState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

// Create the provider component
const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(globalReducer, {});

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the context
const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

export { GlobalStateProvider, useGlobalState };
