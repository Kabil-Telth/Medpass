import axios from "axios";
import { toast } from "react-toastify";

export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      error?.response?.data?.error ||
      error?.response?.data ||
      error?.message ||
      "Something went wrong!";

    console.error("API Error:", message, error?.response);
    toast.error(message);
  } else {
    console.error("Unexpected Error:", error);
  }
};
