import React, { useEffect, useState } from "react";
import StudentDashBoard from "../../../components/dashboard/StudentDashBoard";
import Table from "../../../components/Table";
import Dropdown from "react-dropdown";
import API from "../../../services/API";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { formatDate } from "../../../services/util";
import Loader from "../../../components/Loader";

const StudentAttendance = () => {
  const subjects = ["COA", "CN", "OS", "AON"];
  const { user } = useSelector((state) => state?.auth);
  const [listOfAssignedCourses, setListOfAssignedCourses] = useState([]);
  const [selectedCourse, setSelctedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewTable, setViewTable] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [course, setCourse] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(`/course/assigned-courses/${user?._id}`);
        setListOfAssignedCourses(data?.courses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  const handleGetAttendance = async () => {
    if (!selectedCourse) {
      return toast.error("please select a course");
    }
    setLoading(true);
    const courseData = {
      studentId: user?._id,
      courseId: selectedCourse,
    };
    try {
      const { data } = await API.post(
        "/attendance/get-stats-course",
        courseData
      );
      setAttendanceData(data?.data?.attendanceDetails);
      toast.success(data?.message);
      setSelctedCourse("");
      setViewTable(true);
    } catch (error) {
      console.log(error);
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
      accessorKey: "date",
      header: "Date",
      size: 200,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 200,
    },
  ];

  const attendanceTableData = attendanceData?.map((item, idx) => {
    return {
      serial: idx + 1,
      date: formatDate(item?.date),
      status: <Badge status={item?.status} />,
    };
  });
  return (
    <StudentDashBoard>
      {loading && <Loader />}
      {/* dropdown */}
      <div className="flex gap-5 mt-5">
        <select
          value={selectedCourse}
          onChange={(e) => {
            const courseId = e.target.value;
            setSelctedCourse(courseId);

            const id = listOfAssignedCourses.findIndex(
              (item) => item._id === courseId
            );

            // Check if the course was found
            if (id !== -1) {
              const courseName = listOfAssignedCourses[id].name;
              setCourse(courseName); // Update course name state based on the selected course
            }
            setViewTable(false);
          }}
          className="p-2 w-[70%] poppins-bold-italic border-2 outline-none border-none border-gray-600  rounded"
        >
          <option value="" className="poppins-medium">
            Select a course
          </option>
          {listOfAssignedCourses?.map((course) => {
            return (
              <option
                key={course._id}
                value={course._id}
                className="poppins-medium"
              >
                {course?.name}
              </option>
            );
          })}
        </select>

        <button
          onClick={handleGetAttendance}
          className="ml-auto px-2 py-1 poppins-medium text-white bg-themeBlue rounded hover:opacity-90"
        >
          Get Attendance
        </button>
      </div>
      {/* attendance table */}
      {viewTable && (
        <>
          {/* attendance section */}

          <div className="mt-10 relative ">
            <div className=" mb-5 flex items-center justify-between ">
              <div className="">
                <div className=" poppins-bold  mb-1  text-gray-700">
                  {course}
                </div>
                <div className=" poppins-medium    text-gray-500">
                  {attendanceData?.length} attendance{"(s)"} available
                </div>
              </div>
            </div>

            <Table
              tableData={attendanceTableData}
              tableHeadData={attendanceTableHeadData}
            />
          </div>
        </>
      )}
    </StudentDashBoard>
  );
};

export default StudentAttendance;

function Badge({ status }) {
  return (
    <button
      disabled
      className={`rounded 
         ${status === "present" ? " bg-green-200 text-green-700" : ""}
         ${status === "absent" ? " bg-red-200 text-red-700" : ""}
         ${status === "sick" ? " bg-yellow-200 text-yellow-700" : ""}
          poppins-medium  w-[71px] text-center px-2 py-1  `}
    >
      {status}
    </button>
  );
}
