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
  const [isLoading, setIsLoading] = useState(true); // Add this
  const [error, setError] = useState(null);
  const taskFormData = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  // In fetchAllTasks
  async function fetchAllTasks() {
    try {
      if (user !== null) {
        const response = await callGetAllTasks(user?._id);
        if (response?.success) {
          setTasksList(response?.tasksList);
          setError(null);
        }
      }
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error(err);
    }
  }

  useEffect(() => {
    async function AuthenticateUser() {
      try {
        setIsLoading(true);
        const data = await callAuthUserApi();

        if (data?.userInfo) {
          setUser(data?.userInfo);

          // Check if user is on auth page or root
          if (location.pathname === "/auth" || location.pathname === "/") {
            navigate("/tasks/list");
          }
        } else {
          // If no user data, redirect to auth
          navigate("/auth");
        }
      } catch (error) {
        console.log(error);
        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
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
  }, [user, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
        isLoading,
        error,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider;
