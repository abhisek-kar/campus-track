import React, { useState } from "react";
import SideBar from "../SideBar";
import { adminSidebarData } from "../../services/sidebarData/adminSidebarData";
import StudentNotificationModal from "../modals/StudentNotificationModal";
import DashboardHeader from "./DashboardHeader";

const AdminDashBoard = ({ children }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  return (
    <div className="grid grid-cols-[1fr, 5fr]">
      {/* sidebar */}
      <SideBar data={adminSidebarData} />
      {/* right part */}
      <div className="w-full">
        <DashboardHeader
          onClick={() => {
            setShowNotificationModal(true);
          }}
          role={"Admin"}
          userName={"Admin Name"}
        />

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

export default AdminDashBoard;
