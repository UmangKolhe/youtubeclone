import React, { useEffect, useState } from "react";
import ChatMessage from "./chat-message";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/utils/chatSlice";
import { generateRandomName, generateRandomStrings } from "@/utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiviMessage] = useState("");
  const dispatch = useDispatch();
  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          id: Date.now(),
          name: generateRandomName(),
          message: generateRandomStrings(),
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      
      {/* Chat Box */}
      <div className="flex flex-col-reverse overflow-y-auto border rounded-xl p-2 sm:p-4 mt-4 h-[60vh] sm:h-[500px] bg-white shadow-sm">
        <div className="space-y-2">
          {chatMessages.map((c) => (
            <ChatMessage
              key={c.id}
              name={c.name}
              message={c.message}
            />
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!liveMessage.trim()) return;

          dispatch(
            addMessage({
              id: Date.now(),
              name: "Akshay Saini",
              message: liveMessage,
            })
          );
          setLiviMessage("");
        }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full border rounded-xl p-2 mt-3 bg-white shadow-sm"
      >
        <input
          className="w-full px-3 py-2 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-300"
          value={liveMessage}
          onChange={(e) => setLiviMessage(e.target.value)}
          placeholder="Type a message…"
          type="text"
        />

        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-green-500 text-white text-sm sm:text-base hover:bg-green-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;
