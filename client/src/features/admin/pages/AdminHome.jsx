import React from "react";
import AdminDashBoard from "../../../components/dashboard/AdminDashBoard";

const AdminHome = () => {
  return (
    <AdminDashBoard>
      {/* boxes */}

      <div className="w-full h-full flex justify-evenly items-center  mt-10">
        <div className="bg-themeBlue flex flex-col items-center justify-center w-[25%] h-36 rounded shadow-2xl shadow-gray-500 text-white cursor-pointer hover:scale-105 transition-all ">
          <span className="font-mono tracking-wide font-semibold text-xl">
            Total Students
          </span>
          <span className="font-mono tracking-wide text-lg">230</span>
        </div>
        <div className="bg-themeBlue flex flex-col items-center justify-center w-[25%] h-36 rounded shadow-2xl shadow-gray-500 text-white cursor-pointer hover:scale-105 transition-all ">
          <span className="font-mono tracking-wide font-semibold text-xl">
            Total Faculties
          </span>
          <span className="font-mono tracking-wide text-lg">18</span>
        </div>
        <div className="bg-themeBlue flex flex-col items-center justify-center w-[25%] h-36 rounded shadow-2xl shadow-gray-500 text-white cursor-pointer hover:scale-105 transition-all ">
          <span className="font-mono tracking-wide font-semibold text-xl">
            Total Courses
          </span>
          <span className="font-mono tracking-wide text-lg">55</span>
        </div>
      </div>
    </AdminDashBoard>
  );
};

export default AdminHome;
