import { useEffect, useState } from "react";
import { callAuthUserApi } from "../services/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskManagerContext } from "./task-manager-context";
import { useForm } from "react-hook-form";
import { callGetAllTasks } from "../services/tasksApi";

function TaskManagerProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [tasksList, setTasksList] = useState([]);
  const taskFormData = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  async function fetchAllTasks() {
    if (user !== null) {
      const response = await callGetAllTasks(user?._id);
      if (response?.success) {
        setTasksList(response?.tasksList);
      }
    }
  }

  useEffect(() => {
    async function AuthenticateUser() {
      const data = await callAuthUserApi();

      if (data?.userInfo) setUser(data?.userInfo);

      data?.success
        ? navigate(
            location.pathname === "/auth" || location.pathname === "/"
              ? "/tasks/list"
              : `${location.pathname}`
          )
        : navigate("/auth");
    }
    AuthenticateUser();
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (
      location.pathname === "/tasks/list" ||
      location.pathname === "/tasks/scrum-board"
    ) {
      fetchAllTasks();
    }
  }, [user]);

  return (
    <TaskManagerContext.Provider
      value={{
        user,
        setUser,
        currentEditedId,
        setCurrentEditedId,
        tasksList,
        setTasksList,
        taskFormData,
        fetchAllTasks,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider;
