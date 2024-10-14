export interface CreateOrderResponse {
  result: "SUCCESS" | "FAIL";
  prepay_id: string;
  orderInfo: string;
  sign: string;
  signType: string;
}

export interface GetUserInfoRequestPayload {
  access_token: string;
}

export interface GetUserInfoResponse {
  Response: {
    result: "SUCCESS" | "FAIL";
    customer_info: {
      openID: string;
    };
    nonce_str: string;
    sign_type: string;
    sign: string;
  };
}
