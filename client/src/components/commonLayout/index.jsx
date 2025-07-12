import { Outlet } from "react-router-dom";
import Header from "../header";

function CommomLayout() {
  return (
    <div className="flex flex-col justify-items-start">
      <Header />
      <Outlet />
    </div>
  );
}

export default CommomLayout;
