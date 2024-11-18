// eslint-disable-next-line no-unused-vars
import React from "react";
import BackIcon from "../assets/navicons/backicon.png";
import CallIcon from "../assets/navicons/callicon.png";
import VIcon from "../assets/navicons/videocallicon.png";
import InfoIcon from "../assets/navicons/infoicon.png";
import GroupImage from "../assets/images/groupimage.jpg";

const Navbar = () => {
  return (
    <div className="flex justify-between h-[8vh] w-full sm:w-[50vh] mx-auto px-2 items-center">
      <div className="flex gap-3">
        <img src={BackIcon} alt="backicon" className="w-8 h-8 image-blue500" />
        <img
          src={GroupImage}
          alt="group-image"
          className=" w-8 h-8 rounded-full"
        />
        <p className=" fontsemi">Group Chat</p>
      </div>

      <div className="flex gap-8 sm:gap-10 items-center justify-center">
        <img src={CallIcon} alt="call-icon" className="w-8 h-8 image-blue500" />
        <img
          src={VIcon}
          alt="videocall-icon"
          className="w-8 h-8 image-blue500"
        />
        <img src={InfoIcon} alt="info" className="w-8 h-8 image-blue500" />
      </div>
    </div>
  );
};

export default Navbar;
