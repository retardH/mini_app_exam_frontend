import { CreateOrderResponse } from "@/interfaces";
import { apiClient } from "@/utils/apiClient";

export const createOrder = async (
  amount: string
): Promise<CreateOrderResponse> => {
  try {
    const response = await apiClient.post("/payment/create-order", {
      title: "Test Order",
      total_amount: amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const startPay = (payload: StartPay, cb?: () => void) => {
  window.ma?.callNativeAPI("startPay", payload, (res: any) => {
    console.log(res);
    if (res.resultCode == 1) {
      console.log("start pay success");
      cb?.();
    }
  });
};
