import React from "react";
import {
  MdHome,
  MdSubscriptions,
  MdVideoLibrary,
  MdWatchLater,
  MdMusicNote,
  MdSportsSoccer,
  MdSportsEsports,
  MdMovie
} from "react-icons/md";

const SideBars = () => {
  return (
    <div className="w-64 h-full bg-white shadow-md border-r border-gray-200 py-4 overflow-y-auto">
      
      {/* MAIN MENU */}
      <div className="px-3">
        <SidebarItem icon={<MdHome size={22} />} label="Home" />
        <SidebarItem icon={<MdSubscriptions size={22} />} label="Subscriptions" />
        <SidebarItem icon={<MdVideoLibrary size={22} />} label="Library" />
      </div>

      <Divider />

      {/* SUBSCRIPTIONS */}
      <h2 className="text-sm font-semibold px-4 py-2 text-gray-700">
        Subscribed
      </h2>

      <div className="px-3">
        <SidebarItem icon={<MdMusicNote size={22} />} label="Music" />
        <SidebarItem icon={<MdSportsSoccer size={22} />} label="Sports" />
        <SidebarItem icon={<MdSportsEsports size={22} />} label="Gaming" />
        <SidebarItem icon={<MdMovie size={22} />} label="Movies" />
      </div>

      <Divider />

      {/* WATCH LATER */}
      <h2 className="text-sm font-semibold px-4 py-2 text-gray-700">
        Watch Later
      </h2>

      <div className="px-3">
        <SidebarItem icon={<MdMusicNote size={22} />} label="Music" />
        <SidebarItem icon={<MdSportsSoccer size={22} />} label="Sports" />
        <SidebarItem icon={<MdSportsEsports size={22} />} label="Gaming" />
        <SidebarItem icon={<MdMovie size={22} />} label="Movies" />
      </div>

      <Divider />
      
    </div>
  );
};

// 🔥 REUSABLE REACT COMPONENT FOR MENU ITEMS
const SidebarItem = ({ icon, label }) => {
  return (
    <div
      className="flex items-center gap-4 px-3 py-2 rounded-lg cursor-pointer 
                 hover:bg-gray-100 transition-all active:bg-gray-200"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
};

// Divider
const Divider = () => <div className="border-b border-gray-200 my-3" />;

export default SideBars;
