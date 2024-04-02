import React from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TooltipWrapper, Tooltip } from "react-tooltip";

let coursesAssigned = [
  {
    courseName: "Physics",
    branchName: "Computer Science Engineering",
    courseID: "CS101",
    totalStudents: 50,
    semester: "1st",
  },
  {
    courseName: "Mathematics",
    branchName: "Electrical Engineering",
    courseID: "EE201",
    totalStudents: 45,
    semester: "2nd",
  },
  {
    courseName: "Chemistry",
    branchName: "Mechanical Engineering",
    courseID: "ME301",
    totalStudents: 60,
    semester: "3rd",
  },
  {
    courseName: "Biology",
    branchName: "Civil Engineering",
    courseID: "CE401",
    totalStudents: 55,
    semester: "4th",
  },
  {
    courseName: "Computer Programming",
    branchName: "Chemical Engineering",
    courseID: "CH501",
    totalStudents: 40,
    semester: "5th",
  },
  {
    courseName: "English Literature",
    branchName: "Biotechnology",
    courseID: "BT601",
    totalStudents: 48,
    semester: "6th",
  },
];
const FacultyHome = () => {
  const navigate = useNavigate();
  return (
    <FacultyDashBoard>
      <Tooltip />
      <div className="flex justify-between items-center">
        {/* assigend courses */}
        <div>
          <p className="poppins-medium text-gray-800 text-xl">
            Courses Assigned
          </p>
          <p className="poppins-regular text-gray-600 text-sm">
            Total 10 courses assigned
          </p>
        </div>
        {/* take attendance button */}
        <button
          onClick={() => navigate("/faculty/attendance")}
          className="poppins-medium text-white bg-themeBlue p-2 tracking-wide rounded hover:bg-opacity-90"
        >
          <MdOutlineBookmarkAdd className="inline text-xl mr-2 " />
          Take Attendance
        </button>
      </div>

      {/* courses boxes */}
      <div className="grid grid-cols-2 w-full justify-center items-center gap-y-4  mt-10">
        {coursesAssigned?.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            {/* Your CourseBox component */}
            <CourseBox
              courseName={item?.courseName}
              courseID={item?.courseID}
              branchName={item?.branchName}
              semester={item?.semester}
              totalStudents={item?.totalStudents}
            />
          </div>
        ))}
      </div>
    </FacultyDashBoard>
  );
};

export default FacultyHome;

function CourseBox({
  courseName,
  branchName,
  courseID,
  totalStudents,
  semester,
}) {
  return (
    <div className="bg-themeBlue bg-opacity-95 w-[500px] h-48 text-white  p-2  m-1">
      <div className="flex justify-between items-center">
        {" "}
        <div className=" poppins-medium text-xl ">{courseName}</div>
        <TooltipWrapper
          content="Total students"
          variant="light"
          place="left-start"
        >
          <div className=" poppins-regular bg-white bg-opacity-30  rounded-full w-10 h-10 flex items-center justify-center ">
            {totalStudents}
          </div>
        </TooltipWrapper>
      </div>

      <TooltipWrapper content="Branch Name" variant="light" place="bottom-end">
        <span className="my-10 mt-auto poppins-regular bg-white bg-opacity-30 px-2 py-1 rounded ">
          {branchName}
        </span>
      </TooltipWrapper>

      <div className="flex gap-5 mt-10 justify-center">
        <TooltipWrapper content="course ID" variant="light" place="left">
          <div className="mt-auto poppins-regular bg-white bg-opacity-30 px-2 py-1 rounded ">
            {courseID}
          </div>
        </TooltipWrapper>

        <TooltipWrapper content="semester" variant="light" place="right">
          <div className="mt-auto poppins-regular bg-white bg-opacity-30 px-2 py-1 rounded ">
            {semester}
          </div>
        </TooltipWrapper>
      </div>
    </div>
  );
}
