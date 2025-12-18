import axios from "axios";
import BASE_URL from "../BASE_URL";
import { headers, headers_content } from "../Constant";

// Signup
const signUp = (payload: any) => {
  return axios
    .post(`${BASE_URL}users/`, payload, headers)
    .then(res => res.data);
};

// Login with OTP
const loginApi = (payload: {
  emamil: string;
  password: string;
  otp: string;
}) => {
  return axios
    .post(`${BASE_URL}token/`, payload, headers)
    .then(res => res.data);
};

// OTP Verify
const otpVerfiyAPi = (payload: { email: string; password: string }) => {
  return axios
    .post(`${BASE_URL}otp/`, payload, headers)
    .then(res => res.data);
};

// Get all users
const getAllUser = () => {
  return axios
    .get(`${BASE_URL}users/`, headers_content())
    .then(res => res.data);
};

// Get user by ID (admin)
const getProfileUser = (userId: any) => {
  return axios
    .get(`${BASE_URL}users/${userId}/`, headers_content())
    .then(res => res.data);
};

// Get logged-in user details
const getUser = (userId: any) => {
  return axios
    .get(`${BASE_URL}account/${userId}/`, headers_content())
    .then(res => res.data);
};

// Update profile
const profileUpdate = (userId: any, payload: any) => {
  return axios
    .patch(`${BASE_URL}users/${userId}/`, payload, headers_content())
    .then(res => res.data);
};

// Reset password (logged-in user)
const resetPassword = (userName: string, payload: any) => {
  return axios
    .put(
      `${BASE_URL}account/${userName}/change-password/`,
      payload,
      headers_content()
    )
    .then(res => res.data);
};

// Get invite mail data
const getInviteMail = (token: string) => {
  return axios
    .get(`${BASE_URL}get-invite/${token}/`, headers_content())
    .then(res => res.data);
};

// Send invite
const sendInvite = (payload: any) => {
  return axios
    .post(`${BASE_URL}send-invite/`, payload, headers_content())
    .then(res => res.data);
};

// Send forgot password email
const sendforgetmail = (payload: { email: string }) => {
  return axios
    .post(`${BASE_URL}send-forgot-password-email/`, payload)
    .then(res => res.data);
};

// Reset password via email
const forgetpassword = async (payload: {
  token: string;
  new_password: string;
}) => {
  try {
    const res = await axios.post(
      `${BASE_URL}account/email/reset-password/`,
      payload
    );
    return res.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw new Error("Something went wrong");
  }
};

const usermaindashboardlist = async (
  page: number = 1,
  pageSize: number = 10
) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refresh_token");

  const fetchUsers = (token: string) =>
    axios.get(`${BASE_URL}users/?page=${page}&page_size=${pageSize}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  try {
    const res = await fetchUsers(accessToken as string);
    return res.data;
  } catch (error: any) {
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
        const retryRes = await fetchUsers(newAccessToken);
        return retryRes.data;
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        throw refreshError;
      }
    }
    throw error;
  }
};

const deleteUser = async (userId: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refresh_token");

  const attemptDelete = (token: string) =>
    axios.delete(`${BASE_URL}users/${userId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

  try {
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
        const refreshRes = await axios.post(`${BASE_URL}token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = refreshRes.data.access;
        localStorage.setItem("accessToken", newAccessToken);

        const retryRes = await attemptDelete(newAccessToken);
        return retryRes.data;
      } catch (refreshError) {
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
  loginApi,
  otpVerfiyAPi,
  getAllUser,
  getUser,
  getProfileUser,
  profileUpdate,
  resetPassword,
  getInviteMail,
  sendInvite,
  sendforgetmail,
  forgetpassword,
  usermaindashboardlist,
  deleteUser,
};
