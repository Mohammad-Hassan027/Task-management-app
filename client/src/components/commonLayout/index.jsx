import { Outlet } from "react-router-dom";
import Header from "../header";

function CommomLayout() {
  console.log("CommonLayout rendered");
  return (
    <div className="flex flex-col justify-items-start">
      <Header />
      <Outlet />
    </div>
  );
}

export default CommomLayout;
