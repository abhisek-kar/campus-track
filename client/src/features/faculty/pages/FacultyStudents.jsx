import React, { useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Table from "../../../components/Table";
import toast from "react-hot-toast";
import API from "../../../services/API";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";

const FacultyStudents = () => {
  const [selectedCourse, setSelectedCourse] = useState({
    courseId: "",
    departmentId: "",
    semester: "",
  });
  const { allCoursesAssigned } = useSelector((state) => state?.faculty);
  const [takingAttendanceFor, setTakingAttendanceFor] = useState("");
  const [viewTable, setViewTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const dispatch = useDispatch();
  const handleCourseChange = (e) => {
    setViewTable(false);
    const { value } = e.target;
    const selectedOption = allCoursesAssigned
      // ?.slice(1)
      ?.find((course) => course.course._id === value);
    setSelectedCourse({
      courseId: selectedOption.course._id,
      departmentId: selectedOption.department._id,
      semester: selectedOption.semester,
    });
    setTakingAttendanceFor(
      selectedOption
        ? `${selectedOption.department.name} -- ${selectedOption.semester} sem -- ${selectedOption.course.name}`
        : ""
    );
  };
  const handleGetDetails = async () => {
    if (
      !selectedCourse.courseId ||
      !selectedCourse.departmentId ||
      !selectedCourse.semester
    ) {
      return toast.error("please select any of assigned courses");
    }
    setLoading(true);

    console.log(selectedCourse);
    try {
      const { data } = await API.post(
        "student/get-students-stats-by-course",
        selectedCourse
      );
      console.log(data);
      setAttendanceDetails(data?.students);
      toast.success(data?.message);
      // console.log(data);
      setViewTable(true);
      setSelectedCourse({
        courseId: "",
        departmentId: "",
        semester: "",
      });
    } catch (error) {
      console.log(error);
      setViewTable(false);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };
  const attendanceTableHeadData = [
    {
      accessorKey: "serial",
      header: "Serial",
      size: 50,
    },
    {
      accessorKey: "regdNo",
      header: "Regd. No.",
      size: 150,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 200,
    },
    {
      accessorKey: "totalPresent",
      header: "Present",
      size: 50,
    },
    {
      accessorKey: "totalAbsent",
      header: "Absent",
      size: 50,
    },
    {
      accessorKey: "totalSick",
      header: "Sick",
      size: 50,
    },
    {
      accessorKey: "total",
      header: "Total",
      size: 50,
    },
  ];

  const attendanceTableData = attendanceDetails?.map((item, idx) => {
    return {
      serial: idx + 1,
      regdNo: item?.regdNo,
      name: item?.name,
      totalPresent: (
        <button
          disabled
          className="poppins-medium bg-green-600 text-white w-10 px-2  py-1 rounded"
        >
          {item?.totalPresent}
        </button>
      ),
      totalAbsent: (
        <button
          disabled
          className="poppins-medium bg-red-600 text-white px-2 w-10  py-1 rounded"
        >
          {item?.totalAbsent}
        </button>
      ),
      totalSick: (
        <button
          disabled
          className="poppins-medium bg-yellow-600 text-white w-10 px-2  py-1 rounded"
        >
          {item?.totalSick}
        </button>
      ),
      total: (
        <button
          disabled
          className="poppins-medium bg-blue-600 text-white w-10 px-2  py-1 rounded"
        >
          {item?.totalAttendances}
        </button>
      ),
    };
  });

  return (
    <FacultyDashBoard>
      {loading && <Loader />}
      {/* dropdown */}
      <div className="flex items-center justify-between mt-5 mb-10">
        <select
          value={selectedCourse.courseId}
          onChange={handleCourseChange}
          className="p-2 poppins-bold-italic border-2 outline-none border-none  rounded"
        >
          <option value="" className="poppins-medium">
            Select a course
          </option>
          {allCoursesAssigned?.map((course) => {
            return (
              <option
                key={course._id}
                value={course.course._id}
                className="poppins-medium"
              >
                {course.department.name} {"--->"} {course.semester}{" "}
                {" sem --->"} {course.course.name}
              </option>
            );
          })}
        </select>

        <button
          onClick={handleGetDetails}
          className="ml-auto scale-110 px-2 py-1 poppins-medium text-white bg-themeBlue rounded hover:opacity-90"
        >
          Get Student Attendances
        </button>
      </div>

      {viewTable && (
        <>
          {/* attendance section */}

          <div className="mt-10 relative ">
            <div className=" mb-5  ">
              <div className=" poppins-bold  mb-1  text-gray-700">
                {takingAttendanceFor}
              </div>
              <div className=" poppins-medium    text-gray-500">
                {attendanceDetails?.length} student{"(s)"} available
              </div>
            </div>

            <Table
              tableData={attendanceTableData}
              tableHeadData={attendanceTableHeadData}
            />
          </div>
        </>
      )}
    </FacultyDashBoard>
  );
};

export default FacultyStudents;

function Badge({ status = "present" }) {
  return (
    <button
      onClick={() => {}}
      className={`rounded ${
        status === "present"
          ? "bg-green-200 text-green-700 hover:bg-green-400 hover:text-green-900 active:bg-green-300 active:text-green-800"
          : "bg-red-200 text-red-700 hover:bg-red-400 hover:text-red-900 active:bg-red-300 active:text-red-800"
      } poppins-medium  w-[71px] text-center px-2 py-1 cursor-pointer `}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
  );
}
