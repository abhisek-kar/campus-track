import React, { useState } from "react";
import SideBar from "../SideBar";
import { facultySidebarData } from "../../services/sidebarData/facultySidebarData";
import StudentNotificationModal from "../modals/StudentNotificationModal";
import { Routes, Route } from "react-router-dom";
import FacultyHome from "../../pages/faculty/FacultyHome";
import FacultyAttendance from "../../pages/faculty/FacultyAttendance";
import FacultyStudents from "../../pages/faculty/FacultyStudents";
import FacultyAssignments from "../../pages/faculty/FacultyAssignments";
import FacultySchedule from "../../pages/faculty/FacultySchedule";
import DashboardHeader from "./DashboardHeader";

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
