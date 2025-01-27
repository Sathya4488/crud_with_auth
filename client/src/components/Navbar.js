import React from "react";
import { capitalize } from "lodash";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  const userName = localStorage.getItem("username");
  const navigate = useNavigate();
  const logout = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between bg-black w-full h-12 gap-4 px-8">
      <div>
        <p className="h-10 w-10 rounded-full border- bg-slate-100 flex justify-center items-center text-2xl text-indigo-600 font-extrabold align-middle">
          {capitalize(userName?.charAt(0))}
        </p>
      </div>
      <div>
        <button
          className="py-1 px-4 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 hover:text-slate-50"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
