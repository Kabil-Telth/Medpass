import axios from "axios";
import BASE_URL from "../BASE_URL";
import { headers, headers_content } from "../Constant";
import { User } from "lucide-react";

// Signup API
const signUp = (responseData: any) => {
  return axios
    .post(`${BASE_URL}users/`, responseData, headers)
    .then((res) => res.data);
};

// Get User
const getAllUser = () => {
  return axios
    .get(`${BASE_URL}users/`, headers_content())
    .then((res) => res.data);
};

// OTP Trigger
const otpVerfiyAPi = (payload: { email: string; password: string }) => {
  return axios
    .post(`${BASE_URL}otp-trigger/`, payload, headers)
    .then((res) => res.data);
};

//profile view
const profileUpdate = (UserId: any, responseData: any) => {
  return axios
    .patch(`${BASE_URL}users/${UserId}/`, responseData, headers_content())
    .then((responseData) => {
      return responseData.data;
    });
};

// Login with OTP
const loginApi = (payload: {
  emamil: string;
  password: string;
  otp: string;
}) => {
  return axios
    .post(`${BASE_URL}token/`, payload, headers)
    .then((res) => res.data);
};

// Get User
const getUser = (userId: any) => {
  return axios
    .get(`${BASE_URL}account/${userId}/`, headers_content())
    .then((res) => res.data);
};

// ✅ Get Invite Mail (used in Signup.tsx)
const getInviteMail = (token: string) => {
  return axios
    .get(`${BASE_URL}get-invite/${token}/`, headers_content())
    .then((res) => res.data);
};

// Reset Password
const resetPassword = (userName: string, responseData: any) => {
  return axios
    .put(
      `${BASE_URL}account/${userName}/change-password/`,
      responseData,
      headers_content()
    )
    .then((res) => res.data);
};

//get usertypes
/// Get user list with refresh flow
const usermaindashboardlist = async (
  page: number = 1,
  pageSize: number = 10
) => {
  let accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refresh_token");

  const fetchUsers = async (token: string) => {
    return axios.get(`${BASE_URL}users/?page=${page}&page_size=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  try {
    // ✅ Try request with current access token
    const res = await fetchUsers(accessToken as string);
    return res.data;
  } catch (error: any) {
    // ✅ If unauthorized or token invalid → try refresh
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data?.code === "token_not_valid") &&
      refreshToken
    ) {
      try {
        const refreshRes = await axios.post(`${BASE_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = refreshRes.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // 🔄 Retry the original request with new access token
        const retryRes = await fetchUsers(newAccessToken);
        return retryRes.data;
      } catch (refreshError) {
        console.error("Refresh token expired or invalid:", refreshError);
        // 🚪 Force logout (clear storage and redirect)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // redirect to login
        throw refreshError;
      }
    }

    throw error;
  }
};

// Send Invite
const sendInvite = (responseData: any) => {
  return axios
    .post(`${BASE_URL}send-invite/`, responseData, headers_content())
    .then((res) => res.data);
};

// Send Forgot Mail
const sendforgetmail = (emailsend: { email: string }) => {
  return axios
    .post(`${BASE_URL}send-forgot-password-email/`, emailsend)
    .then((res) => res.data);
};

// Forget Password
const forgetpassword = async (data: {
  token: string;
  new_password: string;
}) => {
  try {
    const res = await axios.post(
      `${BASE_URL}account/email/reset-password/`,
      data
    );
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw new Error("Something went wrong");
  }
};

// Delete User
const deleteUser = async (userId: any) => {
  let accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refresh_token");

  const attemptDelete = async (token: string) => {
    return axios.delete(`${BASE_URL}users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  try {
    // ✅ Try with current token
    const res = await attemptDelete(accessToken as string);
    return res.data;
  } catch (error: any) {
    if (
      error.response &&
      (error.response.status === 401 ||
        error.response.data?.code === "token_not_valid") &&
      refreshToken
    ) {
      try {
        // 🔄 Refresh access token
        const refreshRes = await axios.post(`${BASE_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = refreshRes.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        // ✅ Retry delete
        const retryRes = await attemptDelete(newAccessToken);
        return retryRes.data;
      } catch (refreshError) {
        console.error("Refresh token expired or invalid:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        throw refreshError;
      }
    }
    throw error;
  }
};

export {
  signUp,
  profileUpdate,
  loginApi,
  otpVerfiyAPi,
  getAllUser,
  getUser,
  sendInvite,
  forgetpassword,
  sendforgetmail,
  resetPassword,
  getInviteMail,
  usermaindashboardlist,
  deleteUser,
};
