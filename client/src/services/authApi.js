import axios from "axios";

export const callRegisterUserApi = async (formData) => {
  const apiResponse = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
    formData,
    { withCredentials: true }
  );

  return apiResponse?.data;
};

export const callLoginUserApi = async (formData) => {
  try {
    const apiResponse = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
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
      `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
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
      `${import.meta.env.VITE_BACKEND_URL}/api/user/auth`,
      {},
      {
        withCredentials: true,
      }
    );

    if (apiResponse?.data?.userInfo) {
      console.log("User authenticated:", apiResponse?.data?.userInfo);
      return {
        success: true,
        userInfo: apiResponse?.data?.userInfo,
      };
    }
    return { success: false };
  } catch (error) {
    console.error("Auth error:", error);
    return { success: false };
  }
};
