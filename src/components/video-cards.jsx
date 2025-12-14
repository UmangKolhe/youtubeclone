import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const VideoCards = ({ info }) => {
  if (!info) return null;

  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails, publishedAt } = snippet;
  const { viewCount } = statistics;

  return (
    <div className="w-full max-w-[360px] cursor-pointer rounded-xl hover:bg-gray-200 p-2 transition">
      {/* Thumbnail */}
      <div className="w-full h-[200px] rounded-xl overflow-hidden">
        <img
          src={thumbnails?.high?.url}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Video Info */}
      <div className="flex gap-3 mt-3">
        {/* Avatar */}
        <Avatar className="w-10 h-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>YT</AvatarFallback>
        </Avatar>

        {/* Title + Channel Info */}
        <div className="flex flex-col">
          <h1 className="font-semibold text-[15px] leading-tight line-clamp-2">
            {title}
          </h1>

          <p className="text-sm text-gray-600">{channelTitle}</p>

          <p className="text-sm text-gray-600">
             {Number(viewCount).toLocaleString()} views · {new Date(publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCards;
