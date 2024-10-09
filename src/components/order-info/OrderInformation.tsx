import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { FC, ReactNode } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "../icons";
import { useAppContext } from "@/context/AppContext";

interface OrderInformationProps {
  renderTriggerBtn: () => ReactNode;
}
const OrderInformation: FC<OrderInformationProps> = ({ renderTriggerBtn }) => {
  const { state, dispatch } = useAppContext();
  return (
    <Drawer>
      <DrawerTrigger asChild>{renderTriggerBtn()}</DrawerTrigger>
      <DrawerContent aria-describedby={undefined}>
        <DrawerHeader>
          <DrawerTitle>Order Information</DrawerTitle>
        </DrawerHeader>
        <div className="p-2 min-h-[200px] flex flex-col gap-2">
          <h6>Your items</h6>
          <div className="flex flex-col gap-2">
            {state.cart.length > 0 ? (
              state.cart.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-stretch justify-stretch gap-2"
                  >
                    <figure className="p-2 rounded-md bg-stone-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-[80px] h-[80px] object-contain object-center"
                      />
                    </figure>
                    <div className="h-full flex-grow flex flex-col">
                      <h4 className="font-medium">{item.name}</h4>
                      <span className="text-sm">${item.price}</span>
                      <div className="mt-2 flex w-full items-center justify-between">
                        <div
                          role="button"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item.id,
                            });
                          }}
                          className="flex items-center mt-auto justify-center max-w-min gap-1 rounded-full bg-red-50 p-1"
                        >
                          <TrashIcon width={14} height={14} strokeColor="red" />
                          <span className="text-xs">Remove</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <MinusIcon width={14} height={14} />
                          <span className="text-xs">{item.quantity}</span>
                          <PlusIcon width={14} height={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-sm">
                No Item In The Cart Yet.
              </div>
            )}
          </div>
        </div>
        <footer className="flex px-2 py-4 items-center gap-8 flex-row justify-between">
          <div>
            <p className="text-sm">Total</p>
            <p className="font-medium">$230</p>
          </div>
          <button className="py-2 flex-grow px-4 text-white rounded-md bg-green-600">
            Order Now
          </button>
        </footer>
      </DrawerContent>
    </Drawer>
  );
};

export default OrderInformation;
