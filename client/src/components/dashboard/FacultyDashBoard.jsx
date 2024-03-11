import React, { useState } from "react";
import SideBar from "../SideBar";
import { facultySidebarData } from "../../services/sidebarData/facultySidebarData";
import StudentNotificationModal from "../modals/StudentNotificationModal";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import FacultyHome from "./../../features/faculty/pages/FacultyHome";
import FacultyAttendance from "./../../features/faculty/pages/FacultyAttendance";
import FacultyStudents from "./../../features/faculty/pages/FacultyStudents";
import FacultyAssignments from "./../../features/faculty/pages/FacultyAssignments";
import FacultySchedule from "./../../features/faculty/pages/FacultySchedule";

const FacultyDashBoard = () => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  return (
    <div className="grid grid-cols-[260px,1fr]">
      {/* sidebar */}
      <SideBar data={facultySidebarData} />
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
        <div className="">
          {/* faculty dashboard routes */}
          <Routes>
            <Route path="" element={<FacultyHome />} />
            <Route path="attendance" element={<FacultyAttendance />} />
            <Route path="students" element={<FacultyStudents />} />
            <Route path="assignments" element={<FacultyAssignments />} />
            <Route path="schedule" element={<FacultySchedule />} />
          </Routes>
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

export default FacultyDashBoard;
