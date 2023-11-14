import React from "react";
import StudentDashBoard from "../../components/StudentDashBoard";
import { Circle } from "rc-progress";

const StudentAttendance = () => {
  return (
    <StudentDashBoard>
      <div className="pt-[5%] pl-[2%] w-full h-full flex gap-[2%] justify-evenly ">
        {/* total present */}
        <div className="relative w-48 h-48 ">
          <Circle
            percent={75}
            strokeWidth={6}
            strokeColor="#0f7491"
            trailWidth={6}
            trailColor="white"
            className=""
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center ">
            <span className="font-semibold font-mono text-lg  text-gray-800">
              Total Present
            </span>
            <span className="font-semibold font-mono text-lg  text-gray-600">
              {/* data from database */}
              56/70
            </span>
          </div>
        </div>
        {/* total absent */}
        <div className="relative w-48 h-48 ">
          <Circle
            percent={25}
            strokeWidth={6}
            strokeColor="#0f7491"
            trailWidth={6}
            trailColor="white"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center ">
            <span className="font-semibold text-lg font-mono  text-gray-800">
              Total Absent
            </span>
            <span className="font-semibold text-lg font-mono text-gray-600">
              {/* data from database */}
              14/70
            </span>
          </div>
        </div>
        {/* total attendance percentage */}
        <div className="relative w-48 h-48 ">
          <Circle
            percent={75}
            strokeWidth={6}
            strokeColor="#0f7491"
            trailWidth={6}
            trailColor="white"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center ">
            <span className="font-semibold text-lg font-mono text-gray-800">
              Attendance
            </span>
            <span className="font-semibold text-lg font-mono  text-gray-600">
              {/* data from database */}
              75%
            </span>
          </div>
        </div>
        {/* seek leaves */}
        <div className="relative w-48 h-48 ">
          <Circle
            percent={10}
            strokeWidth={6}
            strokeColor="#0f7491"
            trailWidth={6}
            trailColor="white"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center ">
            <span className="font-semibold text-lg font-mono text-gray-800">
              Seek Leaves
            </span>
            <span className="font-semibold text-lg font-mono  text-gray-600">
              {/* data from database */}5
            </span>
          </div>
        </div>
      </div>
    </StudentDashBoard>
  );
};

export default StudentAttendance;
