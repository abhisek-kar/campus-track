import React, { useState } from "react";
import SideBar from "./SideBar";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { studentSidebarrData } from "../services/sidebarData/studentSidebarData";
import StudentNotificationModal from "./modals/StudentNotificationModal";

const StudentDashBoard = ({ children }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  return (
    <div className="grid grid-cols-[260px,1fr]">
      {/* sidebar */}
      <SideBar data={studentSidebarrData} />
      {/* right part */}
      <div className="grid grid-rows-[50px,1fr]">
        {/* 1st child of right part - 50px */}
        <div className=" flex flex-row-reverse items-center mt-4 gap-5 mr-5">
          <button onClick={() => setShowNotificationModal(true)}>
            <IoMdNotifications className="w-6 h-6  text-gray-700" />
          </button>
          <button>
            <AiTwotoneSetting className="w-6 h-6  text-gray-700" />
          </button>
          <div className="flex items-center bg-white px-4 py-1 rounded-full ">
            <FaUserAlt className="w-6 h-6 mx-4 text-gray-700" />
            <div className=" flex flex-col  ">
              <span className="font-semibold text-sm text-gray-700">
                Abhisek
              </span>
              <span className=" text-xs font-semibold text-gray-600">
                4th Year
              </span>
            </div>
          </div>
        </div>
        {/* 2nd part of right part - 1fr */}
        <div className="">{children}</div>
      </div>
      {/* modal shoowing all notification for students */}
      <StudentNotificationModal
        showModal={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />
    </div>
  );
};

export default StudentDashBoard;
