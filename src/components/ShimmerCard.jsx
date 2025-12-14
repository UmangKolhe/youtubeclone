import React from "react";

const ShimmerCard = () => {
  return (
    <div className="w-full animate-pulse">
      {/* Thumbnail */}
      <div className="w-full h-48 bg-zinc-800 rounded-xl mb-3"></div>

      <div className="flex gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 bg-zinc-800 rounded-full"></div>

        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="h-3 bg-zinc-800 rounded-md w-3/4"></div>
          {/* Subtitle */}
          <div className="h-3 bg-zinc-800 rounded-md w-5/6"></div>
          <div className="h-3 bg-zinc-800 rounded-md w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerCard;
