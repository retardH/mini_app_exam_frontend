import { GetUserInfoResponse } from "@/interfaces";
import { apiClient } from "@/utils/apiClient";

export const getUserInfo = async (
  accessToken: string
): Promise<GetUserInfoResponse> => {
  try {
    const response = await apiClient.post("/autoLogin/get-userInfo", {
      access_token: accessToken,
    });
    return response?.data;
  } catch (error) {
    console.error("Error getting user info:", error);
    throw error;
  }
};
