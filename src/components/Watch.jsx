// Watch.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./comments-container";
import LiveChat from "./live-chat";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  return (
    <div className="w-full flex flex-col items-center px-2 sm:px-4 md:px-6">
      
      {/* Video Wrapper */}
      <div className="w-full max-w-5xl">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {/* Comments */}
      <div className="w-full max-w-5xl mt-4 sm:mt-6">
        <LiveChat/>
        <CommentsContainer />
      </div>
    </div>
  );
};

export default Watch;
