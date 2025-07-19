import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import TasksPage from "./pages/tasks";
import AuthPage from "./pages/auth";
import ScrumBoardPage from "./pages/scrum-board";
import CommomLayout from "./components/commonLayout";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/tasks" element={<CommomLayout />}>
        <Route path="list" element={<TasksPage />} />
        <Route path="scrum-board" element={<ScrumBoardPage />} />
      </Route>    
    </Routes>
  );
}

export default App;
