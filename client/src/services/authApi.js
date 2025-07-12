import axios from "axios";

export const callRegisterUserApi = async (formData) => {
  const apiResponse = await axios.post(
    "http://localhost:5000/api/user/register",
    formData,
    { withCredentials: true }
  );

  return apiResponse?.data;
};

export const callLoginUserApi = async (formData) => {
  const apiResponse = await axios.post(
    "http://localhost:5000/api/user/login",
    formData,
    { withCredentials: true }
  );

  return apiResponse?.data;
};

export const callLogoutUserApi = async () => {
  const apiResponse = await axios.post(
    "http://localhost:5000/api/user/logout",
    {},
    { withCredentials: true }
  );

  return apiResponse?.data;
};

export const callAuthUserApi = async () => {
  const apiResponse = await axios.post(
    "http://localhost:5000/api/user/auth",
    {},
    { withCredentials: true }
  );

  return apiResponse?.data;
};