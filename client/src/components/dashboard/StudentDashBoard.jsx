import React, { useState } from "react";
import SideBar from "../SideBar";
import { studentSidebarData } from "../../services/sidebarData/studentSidebarData";
import DashboardHeader from "./DashboardHeader";
import StudentNotificationModal from "./../modals/StudentNotificationModal";
import { useModal } from "../../context/modalContext";
import UserModal from "./../modals/UserModal";
import StudentDetailsModal from "../modals/StudentDetailsModal";

const StudentDashBoard = ({ children }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { showStudentDeatilsModal, closeStudentDeatilsModal } = useModal();
  return (
    <div className="grid grid-cols-[260px,1fr]">
      {/* sidebar */}
      <SideBar role={"Student"} data={studentSidebarData} />
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
      {/*  */}
      {showStudentDeatilsModal ? (
        <StudentDetailsModal onClose={closeStudentDeatilsModal} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default StudentDashBoard;
