import axios from "axios";

export const callGetAllTasks = async (getcurrentId) => {
  try {
    const apiResponse = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/task/get-all-task/${getcurrentId}`,
      { withCredentials: true }
    );
    return apiResponse.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const callAddNewTask = async (formData) => {
  const apiResponse = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/task/add-new-task`,
    formData
  );

  return apiResponse.data;
};

export const callupdateTask = async (formData) => {
  const apiResponse = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/task/update-task`,
    formData
  );

  return apiResponse.data;
};

export const callDeleteTask = async (getcurrentId) => {
  const apiResponse = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/task/delete-task/${getcurrentId}`
  );

  return apiResponse.data;
};
