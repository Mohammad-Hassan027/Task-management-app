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
  return (
    <header className="border-b border-gray-200 w-screen">
      <div className="h-[64px] w-full flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div className="px-5 w-2xl">
            <h1 className="text-green-600 scroll-m-20 text-center text-2xl sm:text-3xl font-extrabold tracking-tight text-balance  text-ellipsis overflow-hidden whitespace-nowrap">
              Task Manager
            </h1>
          </div>
          <div className="pt-2.5 flex gap-6 w-[200px] sm:w-[300px]">
            <Link className="text-black font-bold text-xl" to={"/tasks/list"}>
              Tasks
            </Link>
            <Link
              className="text-black font-bold text-xl"
              to={"/tasks/scrum-board"}
            >
              Scrum board
            </Link>
          </div>
        </div>
        <div className="pr-6 flex justify-between items-center gap-6 w-auto">
          <div className="bg-amber-300 p-2 rounded-2xl">
            <p className="font-semibold text-xl">{user?.name}</p>
          </div>
          <LogOut
            onClick={handleLogout}
            color="#000"
            className="cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
