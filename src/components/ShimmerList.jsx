import React from "react";
import ShimmerCard from "./ShimmerCard";

const ShimmerList = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
      {Array(12)
        .fill("")
        .map((_, i) => (
          <ShimmerCard key={i} />
        ))}
    </div>
  );
};

export default ShimmerList;
