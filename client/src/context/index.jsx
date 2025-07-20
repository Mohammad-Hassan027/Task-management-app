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
  const [isLoading, setIsLoading] = useState(true);
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
    let mounted = true;

    async function AuthenticateUser() {
      try {
        setIsLoading(true);
        const data = await callAuthUserApi();

        if (!mounted) return;

        if (data?.success && data?.userInfo) {
          setUser(data?.userInfo);
          setError(null);
          if (location.pathname === "/auth" || location.pathname === "/") {
            navigate("/tasks/list");
          }
        }
      } catch (error) {
        console.log("Auth error:", error);
        setUser(null);
        if (location.pathname !== "/auth") {
          navigate("/auth");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    AuthenticateUser();

    return () => {
      mounted = false;
    };
    // // Only run on mount and when navigation changes
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!user) return; // Don't fetch if no user

    if (
      location.pathname === "/tasks/list" ||
      location.pathname === "/tasks/scrum-board"
    ) {
      fetchAllTasks();
      console.log(tasksList);
    }
  }, [user, location.pathname]); // Add fetchAllTasks to deps if you memoize it

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
