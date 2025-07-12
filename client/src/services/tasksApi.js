import axios from "axios";

export const callGetAllTasks = async (getcurrentId) => {
  try {
    const apiResponse = await axios.get(
      `https://task-management-app-1krw.onrender.com/api/task/get-all-task/${getcurrentId}`,
      { withCredentials: true }
    );
    return apiResponse?.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const callAddNewTask = async (formData) => {
  const apiResponse = await axios.post(
    "https://task-management-app-1krw.onrender.com/api/task/add-new-task",
    formData
  );

  return apiResponse?.data;
};

export const callupdateTask = async (formData) => {
  const apiResponse = await axios.put(
    "https://task-management-app-1krw.onrender.com/api/task/update-task",
    formData
  );

  return apiResponse?.data;
};

export const callDeleteTask = async (getcurrentId) => {
  const apiResponse = await axios.delete(
    `https://task-management-app-1krw.onrender.com/api/task/delete-task/${getcurrentId}`
  );

  return apiResponse?.data;
};
