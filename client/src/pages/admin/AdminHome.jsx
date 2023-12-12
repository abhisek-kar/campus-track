import React from "react";

const AdminHome = () => {
  return (
    <div className="w-full h-full">
      {/* boxes */}

      <div className="w-full h-full flex justify-evenly items-center  ">
        <div className="bg-themeBlue flex flex-col items-center justify-center w-[20%] h-[25%] rounded shadow-2xl shadow-gray-500 text-white cursor-pointer hover:scale-105 transition-all ">
          <span className="font-mono tracking-wide font-semibold text-xl">
            Total Students
          </span>
          <span className="font-mono tracking-wide text-lg">230</span>
        </div>
        <div className="bg-themeBlue flex flex-col items-center justify-center w-[20%] h-[25%] rounded shadow-2xl shadow-gray-500 text-white cursor-pointer hover:scale-105 transition-all ">
          <span className="font-mono tracking-wide font-semibold text-xl">
            Total Faculties
          </span>
          <span className="font-mono tracking-wide text-lg">18</span>
        </div>
        <div className="bg-themeBlue flex flex-col items-center justify-center w-[20%] h-[25%] rounded shadow-2xl shadow-gray-500 text-white cursor-pointer hover:scale-105 transition-all ">
          <span className="font-mono tracking-wide font-semibold text-xl">
            Total Courses
          </span>
          <span className="font-mono tracking-wide text-lg">55</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
