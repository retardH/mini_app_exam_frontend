import { createContext, Dispatch, useContext, useReducer } from "react";

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}
interface AppContextState {
  cart: Array<CartItem>;
  favoriteItems: Array<{
    id: number;
    name: string;
    image: string;
    price: number;
  }>;
  userId: string;
}

interface AppContextProviderProps {
  state: AppContextState;
  dispatch: Dispatch<TAction<any>>;
}

// type TActionType =
//   | "ADD_TO_CART"
//   | "REMOVE_FROM_CART"
//   | "SET_USER_ID"
//   | "CLEAR_CART"
//   | "INCREASE_ITEM_QUANTITY"
//   | "DECREASE_ITEM_QUANTITY";

type TAction<TData extends {} = any> = {
  type:
    | "ADD_TO_CART"
    | "REMOVE_FROM_CART"
    | "SET_USER_ID"
    | "CLEAR_CART"
    | "INCREASE_ITEM_QUANTITY"
    | "DECREASE_ITEM_QUANTITY";
  payload?: TData;
};

const AppContext = createContext<AppContextProviderProps | undefined>(
  undefined
);

const appReducer = (
  state: AppContextState,
  action: TAction
): AppContextState => {
  switch (action.type) {
    case "SET_USER_ID":
      return {
        ...state,
        userId: action?.payload,
      };
    case "ADD_TO_CART":
      const itemAlreadyInCart = state.cart.find(
        (item) => item.id === action?.payload.id
      );
      if (itemAlreadyInCart) {
        return {
          ...state,
          cart: state.cart.map((item) => {
            if (item.id === action?.payload.id) {
              return action?.payload;
            }
            return item;
          }),
        };
      }
      return {
        ...state,
        cart: [...state.cart, action?.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action?.payload),
      };
    case "INCREASE_ITEM_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action?.payload) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case "DECREASE_ITEM_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action?.payload) {
            return {
              ...item,
              quantity: item.quantity === 1 ? item.quantity : item.quantity - 1,
            };
          }
          return item;
        }),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

const defaultState: AppContextState = {
  cart: [],
  favoriteItems: [],
  userId: "",
};

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("useAppContext must be used within a AppContextProvider");
  }

  return appContext;
};
