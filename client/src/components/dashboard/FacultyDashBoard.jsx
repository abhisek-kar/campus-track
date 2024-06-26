import React, { useState } from "react";
import SideBar from "../SideBar";
import { facultySidebarData } from "../../services/sidebarData/facultySidebarData";
import StudentNotificationModal from "../modals/StudentNotificationModal";
import DashboardHeader from "./DashboardHeader";
import { useModal } from "../../context/modalContext";
import FacultyDetailsModal from "../modals/FacultyDetailsModal";

const FacultyDashBoard = ({ children }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { showFacultyDeatilsModal, closeFacultyDeatilsModal } = useModal();

  return (
    <div className="grid grid-cols-[260px,1fr]">
      {/* sidebar */}
      <SideBar role={"Faculty"} data={facultySidebarData} />
      {/* right part */}
      <div className="grid grid-rows-[50px,1fr]">
        {/* 1st child of right part - 50px */}
        <DashboardHeader
          onClick={() => {
            setShowNotificationModal(true);
          }}
          role={"Faculty"}
          userName={"Faculty Name"}
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
      {showFacultyDeatilsModal && (
        <FacultyDetailsModal onClose={closeFacultyDeatilsModal} />
      )}
    </div>
  );
};

export default FacultyDashBoard;
