import React, { useState } from "react";
import SideBar from "../SideBar";

import { studentSidebarData } from "../../services/sidebarData/studentSidebarData";
import StudentNotificationModal from "../modals/StudentNotificationModal";
import StudentHome from "../../pages/student/StudentHome";
import StudentAttendance from "../../pages/student/StudentAttendance";
import StudentAcademy from "../../pages/student/StudentAcademy";
import StudentPerformance from "../../pages/student/StudentPerformance";
import StudentSchedule from "../../pages/student/StudentSchedule";
import { Routes, Route } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const StudentDashBoard = () => {
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
        <div>
          {/* student dashboard routes */}
          <Routes>
            <Route path="" element={<StudentHome />} />
            <Route path="attendance" element={<StudentAttendance />} />
            <Route path="academy" element={<StudentAcademy />} />
            <Route path="performance" element={<StudentPerformance />} />
            <Route path="schedule" element={<StudentSchedule />} />
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

export default StudentDashBoard;
