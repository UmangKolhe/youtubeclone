import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex m-2 items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg shadow-sm bg-white w-full">
      
      {/* Avatar */}
      <Avatar className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 shrink-0">
        <AvatarImage
          className="cursor-pointer"
          src="https://github.com/shadcn.png"
        />
        <AvatarFallback>
          {name?.[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      {/* Text Content */}
      <div className="flex flex-col w-full">
        <span className="text-xs sm:text-sm font-semibold leading-tight">
          {name}
        </span>

        <p className="text-xs sm:text-sm md:text-base leading-snug break-words">
          {message}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
