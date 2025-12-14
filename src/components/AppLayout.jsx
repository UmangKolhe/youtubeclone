// AppLayout.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Head from "./head";
import SideBars from "./side-bars";

const AppLayout = () => {
  const isSidebarOpen = useSelector((store) => store.app.isMenuOpen);

  return (
    <div className="relative w-full min-h-screen">
      <div className="border-b border-white/20">
        <Head />
      </div>

      {isSidebarOpen && (
        <div className=" fixed 
      top-[64px]           /* height of header */
      left-0 
      h-[calc(100vh-64px)] /* fill full height below header */
      w-60 
      bg-black 
      z-50 
      overflow-y-auto
      shadow-lg
      transition-transform 
      duration-300">
          <SideBars />
        </div>
      )}

      <div className="pt-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
