import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { useModal } from "../../context/modalContext";
import { useSelector } from "react-redux";

const DashboardHeader = ({ onClick, role, userName, children }) => {
  const {
    openStudentDeatilsModal,
    openAdminDeatilsModal,
    openFacultyDeatilsModal,
  } = useModal();
  const { loading, user } = useSelector((state) => state.auth);

  const handleUserModalClick = () => {
    switch (role) {
      case "Admin":
        return openAdminDeatilsModal();
      case "Student":
        return openStudentDeatilsModal();
      case "Faculty":
        return openFacultyDeatilsModal();
    }
  };
  return (
    <div className=" flex items-center justify-between px-2 py-[5px] shadow-md w-full z-30 fixed bg-white">
      <div>{children}</div>
      <div className="flex items-center gap-5 mr-5">
        {/* <button onClick={onClick}>
          <IoMdNotifications className="w-6 h-6  text-gray-700" />
        </button> */}
        {/* <button>
          <AiTwotoneSetting className="w-6 h-6  text-gray-700" />
        </button> */}
        <div
          className="flex items-center  pr-3 cursor-pointer bg-slate-300  rounded-full "
          onClick={handleUserModalClick}
        >
          <FaUserAlt className="w-6 h-6 mx-4 text-gray-700" />
          <div className="p-1">
            <div className="poppins-bold text-sm text-gray-700 ">
              {user?.name || "User Name"}
            </div>
            <div className="poppins-medium text-xs text-gray-500 ">
              {user?.email || "example@mail.com"}
            </div>
          </div>{" "}
        </div>
      </div>
      {/* show user modal */}
    </div>
  );
};

export default DashboardHeader;
