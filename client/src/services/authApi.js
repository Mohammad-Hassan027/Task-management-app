import axios from "axios";

export const callRegisterUserApi = async (formData) => {
  const apiResponse = await axios.post(
    "https://task-management-app-1krw.onrender.com/api/user/register",
    formData,
    { withCredentials: true }
  );

  return apiResponse?.data;
};

export const callLoginUserApi = async (formData) => {
  try {
    const apiResponse = await axios.post(
      "https://task-management-app-1krw.onrender.com/api/user/login",
      formData,
      { withCredentials: true }
    );

    return apiResponse?.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const callLogoutUserApi = async () => {
  try {
    const apiResponse = await axios.post(
      "https://task-management-app-1krw.onrender.com/api/user/logout",
      {},
      { withCredentials: true }
    );

    return apiResponse?.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const callAuthUserApi = async () => {
  try {
    const apiResponse = await axios.post(
      "https://task-management-app-1krw.onrender.com/api/user/auth",
      {},
      { withCredentials: true }
    );

    return apiResponse?.data;
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};
