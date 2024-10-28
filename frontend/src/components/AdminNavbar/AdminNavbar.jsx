import { ClipLoader } from "react-spinners";
import Clock from "../Clock/Clock";
import Logo from "../../assets/images/logo.png";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";

export default function AdminNavBar() {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("refresh_token");
    window.location.href = '/admin/login'
  };

  return (
    <div className="w-screen">
      <div className="w-full h-[100px] bg-background_gray flex items-center justify-between fixed top-0 z-10 px-24">
        <div className="flex items-center">
          <img src={Logo} alt="" className="w-[100px] h-auto" />
        </div>
        <p className="text-xl text-primary_text">
          <Clock />
        </p>

        <button
          onClick={handleLogout}
          className="hover:border-custom_red text-custom_red bg-background_gray w-28 h-12 rounded-md hover:text-primary_text text-xl hover:bg-custom_red float-end flex justify-center items-center"
          to={""}
        >
          {loading ? (
            <ClipLoader
              className="mt-1 flex justify-items-center"
              size={20}
              color={"#fff"}
              loading={loading}
            />
          ) : (
            <div className="flex justify-center items-center space-x-1">
              <LuLogOut className="text-2xl mt-1" />
              <span>Logout</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
