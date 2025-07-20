import { useEffect, useState } from "react";
import { callAuthUserApi } from "../services/authApi";
import { useLocation, useNavigate } from "react-router-dom";
import { TaskManagerContext } from "./task-manager-context";
import { useForm } from "react-hook-form";

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

  useEffect(() => {
    let mounted = true;

    async function AuthenticateUser() {
      try {
        setIsLoading(true);
        const data = await callAuthUserApi();

        if (!mounted) return;

        if (data?.success && data?.userInfo) {
          console.log("User authenticated:", data.userInfo, data.success);
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
        isLoading,
        error,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider;
