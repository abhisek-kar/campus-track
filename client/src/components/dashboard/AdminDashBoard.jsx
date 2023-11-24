import React, { useState } from "react";
import SideBar from "../SideBar";
import { adminSidebarData } from "../../services/sidebarData/adminSidebarData";
import StudentNotificationModal from "../modals/StudentNotificationModal";
import { Routes, Route } from "react-router-dom";
import AdminHome from "../../pages/admin/AdminHome";
import AdminAddStudent from "../../pages/admin/AdminAddStudent";
import AdminFaculties from "../../pages/admin/AdminFaculties";
import AdminCourses from "../../pages/admin/AdminCourses";
import AdminStudents from "../../pages/admin/AdminStudents";
import DashboardHeader from "./DashboardHeader";

const AdminDashBoard = () => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  return (
    <div className="grid grid-cols-[260px,1fr]">
      {/* sidebar */}
      <SideBar data={adminSidebarData} />
      {/* right part */}
      <div className="grid grid-rows-[50px,1fr]">
        {/* 1st child of right part - 50px */}
        <DashboardHeader
          onClick={() => {
            setShowNotificationModal(true);
          }}
          role={"Admin"}
          userName={"Admin Name"}
        />
        {/* 2nd part of right part - 1fr */}
        <div className="">
          {/* Admin  */}
          <Routes>
            <Route path="" element={<AdminHome />} />
            <Route path="add-student" element={<AdminAddStudent />} />
            <Route path="faculties" element={<AdminFaculties />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="students" element={<AdminStudents />} />
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

export default AdminDashBoard;
