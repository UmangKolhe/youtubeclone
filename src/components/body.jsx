import React from "react";
import { useState } from "react";
import SideBars from "./side-bars";
import MainContainer from "./main-container";
import { useSelector } from "react-redux";

const Body = () => {

 const isSidebarOpen =  useSelector((store)=>store.app.isMenuOpen)



  

  return (
    <div className="relative  w-full ">
      {isSidebarOpen && (
        <div className="absolute top-0 left-0 h-full w-[250px]  z-50">
          <SideBars />
        </div>
      )}
     <div className=" relative h-full w-full">
       <MainContainer  />
     </div>
    </div>
  );
};

export default Body;
