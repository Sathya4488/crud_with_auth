import React from "react";

const CustomButton = ({ label, onClick }) => {
  return (
    <button
      className="py-2 px-6 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 hover:text-slate-50"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
