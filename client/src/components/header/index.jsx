import { TaskManagerContext } from "../../context/task-manager-context";
import { callLogoutUserApi } from "../../services/authApi";
import { LogOut } from "lucide-react";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { user, setUser } = useContext(TaskManagerContext);
  const navigate = useNavigate();

  async function handleLogout() {
    const apiResponse = await callLogoutUserApi();

    if (apiResponse?.success) {
      setUser(null);
      navigate("/auth");
    }
  }

  const PRIMARY_COLOR = "text-blue-600";
  const HOVER_COLOR = "hover:text-blue-800";
  const ACCENT_COLOR_BG = "bg-blue-50";

  return (
    <header className="border-b border-gray-100 bg-white shadow-sm w-screen sticky top-0 z-10">
      <div className="h-[72px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="flex-shrink-0">
            <h1
              className={`scroll-m-20 text-3xl font-extrabold tracking-tight ${PRIMARY_COLOR}`}
            >
              TaskMaster 🚀
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              className={`font-medium text-lg text-gray-700 transition duration-150 ease-in-out ${HOVER_COLOR}`}
              to={"/tasks/list"}
            >
              Tasks
            </Link>
            <Link
              className={`font-medium text-lg text-gray-700 transition duration-150 ease-in-out ${HOVER_COLOR}`}
              to={"/tasks/scrum-board"}
            >
              Scrum Board
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {user?.name && (
            <div
              className={`py-1 px-3 rounded-full ${ACCENT_COLOR_BG} text-blue-700 font-semibold text-sm`}
            >
              {user.name}
            </div>
          )}

          <LogOut
            onClick={handleLogout}
            color="#4B5563"
            size={24}
            className={`cursor-pointer transition duration-150 ease-in-out ${HOVER_COLOR}`}
            title="Logout"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
