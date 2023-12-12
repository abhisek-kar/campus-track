import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";

const DashboardHeader = ({ onClick, role, userName, children }) => {
  return (
    <div className=" flex items-center justify-between mt-2 ">
      <div>{children}</div>
      <div className="flex items-center gap-5 mr-5">
        <button onClick={onClick}>
          <IoMdNotifications className="w-6 h-6  text-gray-700" />
        </button>
        <button>
          <AiTwotoneSetting className="w-6 h-6  text-gray-700" />
        </button>
        <div className="flex items-center bg-white pr-2  pl-1 py-1 rounded-full ">
          <FaUserAlt className="w-6 h-6 mx-4 text-gray-700" />
          <div className=" flex flex-col  ">
            <span className="font-semibold text-sm text-gray-700">
              {userName}
            </span>
            <span className=" text-xs font-semibold text-gray-600">{role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
