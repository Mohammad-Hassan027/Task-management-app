import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import TaskManagerProvider from "./context/index";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TaskManagerProvider>
      <App />
      <Toaster />
    </TaskManagerProvider>
  </BrowserRouter>
);
