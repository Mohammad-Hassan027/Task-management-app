import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import TasksPage from "./pages/tasks";
import AuthPage from "./pages/auth";
import ScrumBoardPage from "./pages/scrum-board";
import CommomLayout from "./components/commonLayout";
import { TaskManagerContext } from "./context/task-manager-context";

function ProtectedRoute({ children }) {
  const { isLoading } = useContext(TaskManagerContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (!user) {
  //   return <Navigate to="/auth" replace />;
  // }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <CommomLayout />
          </ProtectedRoute>
        }
      >
        <Route path="list" element={<TasksPage />} />
        <Route path="scrum-board" element={<ScrumBoardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
}

export default App;
