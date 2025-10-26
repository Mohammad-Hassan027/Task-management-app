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
    async function AuthenticateUser() {
      try {
        setIsLoading(true);
        console.log("authenticating user");
        const data = await callAuthUserApi();
        console.log("Auth data received:", data);

        if (data?.success && data?.userInfo !== null) {
          setUser(data.userInfo);
          setError(null);
          if (location.pathname === "/auth" || location.pathname === "/") {
            navigate("/tasks/list");
            console.log("Authenticated", location.pathname);
          }
          console.log("User authenticated:", data?.userInfo, data?.success);
        } else {
          console.log("User not authenticated, redirecting to auth page");
          setUser(null);
          setError(data?.message || "Authentication failed");
          if (location.pathname !== "/auth") {
            navigate("/auth");
          }
        }
      } catch (error) {
        console.log("Auth error:", error);
        setUser(null);
        if (location.pathname !== "/auth") {
          navigate("/auth");
        }
      } finally {
        setIsLoading(false);
      }
    }

    AuthenticateUser();
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
