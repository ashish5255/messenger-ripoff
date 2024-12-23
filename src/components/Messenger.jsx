import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchUsers } from "../redux/messageSlice";

import Send from "../assets/navicons/sendbutton.png";
import PlusIcon from "../assets/icons/plusicon.svg";
import CameraIcon from "../assets/icons/cameraicon.png";
import GalleryIcon from "../assets/icons/galleryicon.png";
import MicIcon from "../assets/icons/micicon.svg";
import DownArrow from "../assets/icons/downarrow.svg";

import BackIcon from "../assets/navicons/backicon.png";
import CallIcon from "../assets/navicons/callicon.png";
import VIcon from "../assets/navicons/videocallicon.png";
import InfoIcon from "../assets/navicons/infoicon.png";
import GroupImage from "../assets/images/groupimage.jpg";

const Messenger = () => {
  const dispatch = useDispatch();
  const { messages, page, loading } = useSelector((state) => state.messages);
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Fetch initial messages
  useEffect(() => {
    if (!hasFetchedOnce) {
      dispatch(fetchUsers(page)).finally(() => {
        setHasFetchedOnce(true);
        scrollToBottom();
      });
    }
  }, [dispatch, page, hasFetchedOnce]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageInput = e.target.elements.message;
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    dispatch(
      addMessage({
        id: Date.now(),
        message: messageText,
        type: "outgoing",
      })
    );
    messageInput.value = "";
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle scroll to fetch older messages and check scroll position
  const handleScroll = (e) => {
    const container = e.target;

    // Check if user is at the bottom
    const isBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;
    setIsAtBottom(isBottom);

    if (container.scrollTop === 0 && !loading) {
      setIsFetchingMore(true); // Prevent auto-scroll to bottom
      const currentHeight = messagesContainerRef.current.scrollHeight;

      dispatch(fetchUsers(page + 1)).finally(() => {
        setIsFetchingMore(false);
        // Maintain scroll position after fetching older messages
        setTimeout(() => {
          const newHeight = messagesContainerRef.current.scrollHeight;
          messagesContainerRef.current.scrollTop = newHeight - currentHeight;
        }, 0);
      });
    }
  };

  // Autoscroll to bottom when new message is added, it wasn't working with previous renditions
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className=" min-h-screen flex flex-col">
      {/* top section */}
      <div className="flex mx-auto py-5 gap-12 abso sm:space-x-11">
        <div className="flex gap-3">
          <img
            src={BackIcon}
            alt="backicon"
            className="w-7 h-7 sm:w-8 sm:h-8 image-blue500"
          />
          <img
            src={GroupImage}
            alt="group-image"
            className=" w-7 h-7 sm:w-8 sm:h-8 rounded-full"
          />
          <p className=" fontsemi">Group </p>
        </div>

        <div className="flex gap-5 sm:gap-10 items-center justify-center">
          <img
            src={CallIcon}
            alt="call-icon"
            className="w-7 h-7 sm:w-8 sm:h-8 image-blue500"
          />
          <img
            src={VIcon}
            alt="videocall-icon"
            className="w-7 h-7 sm:w-8 sm:h-8 image-blue500"
          />
          <img
            src={InfoIcon}
            alt="info"
            className="w-7 h-7 sm:w-8 sm:h-8 image-blue500"
          />
        </div>
      </div>

      {/* message section */}
      <div className=" h-[92vh]  flex flex-grow flex-col mx-auto relative">
        {/* Messages Section */}
        <div
          className="flex flex-col overflow-y-auto bg-gray-100 px-4 space-y-3 w-full"
          ref={messagesContainerRef}
          onScroll={handleScroll}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs px-3 py-2 rounded-full ${
                msg.type === "outgoing"
                  ? "self-end bg-blue-500 text-white text-right"
                  : "self-start bg-gray-300 text-black text-left"
              }`}
            >
              {msg.message}
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Down Arrow */}
        {!isAtBottom && (
          <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2">
            <button
              onClick={scrollToBottom}
              className="rounded-full p-2 shadow-lg"
            >
              <img className="w-6 h-6" src={DownArrow} alt="downarrow" />
            </button>
          </div>
        )}

        {/* Input Section */}
        <div className="py-4 flex  items-center justify-around   w-auto mx-2">
          <div className="flex gap-4 gap-x-6 items-center">
            <img
              src={PlusIcon}
              alt="plusicon"
              className="sm:h-7 sm:w-7 h-5 w-5"
            />
            <img
              src={CameraIcon}
              alt="cameraicon"
              className="sm:h-7 sm:w-7 h-5 w-5"
            />
            <img
              src={GalleryIcon}
              alt="galleryicon"
              className="sm:h-7 sm:w-7 h-5 w-5"
            />
            <img
              src={MicIcon}
              alt="micicon"
              className="sm:h-7 sm:w-7 h-5 w-5"
            />
          </div>
          <form
            onSubmit={handleSendMessage}
            className="flex gap-3  items-center justify-center"
          >
            <input
              type="text"
              name="message"
              placeholder="Message"
              className="bg-gray-200  sm:px-4 py-2 border rounded-full text-center w-[100px] sm:w-auto ml-1"
            />
            <button type="submit" className="sm:h-8 sm:w-8 h-6 w-6 ">
              <img src={Send} alt="Send" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
