import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full h-[calc(100vh-3rem)] bg-[#F8F8F8] overflow-auto">
      {children}
    </div>
  );
};

export default MainLayout;
