import React, { useState } from "react";
import SideBar from "../SideBar";
import { studentSidebarData } from "../../services/sidebarData/studentSidebarData";
import DashboardHeader from "./DashboardHeader";
import StudentNotificationModal from "./../modals/StudentNotificationModal";

const StudentDashBoard = ({ children }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  return (
    <div className="grid grid-cols-[260px,1fr]">
      {/* sidebar */}
      <SideBar data={studentSidebarData} />
      {/* right part */}
      <div className="grid grid-rows-[50px,1fr]">
        {/* 1st child of right part - 50px  - header section*/}
        <DashboardHeader
          onClick={() => {
            setShowNotificationModal(true);
          }}
          role={"Student"}
          userName={"Satya Ranjan Behera"}
        />
        {/* 2nd part of right part - 1fr */}
        <div className="absolute ml-[200px] mt-[60px] w-[calc(100%-210px)] p-2">
          {children}
        </div>
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
