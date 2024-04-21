import React, { useEffect, useRef, useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Table from "../../../components/Table";
import API from "../../../services/API";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "./../../../components/Loader";
import {
  clearStoreAttendanceDetails,
  setStoreAttendanceDetails,
} from "../facultySlice";

const FacultyAttendance = () => {
  const { storeAttendanceDetails } = useSelector((state) => state?.faculty);
  const [selectedCourse, setSelectedCourse] = useState({
    courseId: "",
    departmentId: "",
    semester: "",
  });
  const [viewTable, setViewTable] = useState(false);
  const { allCoursesAssigned } = useSelector((state) => state?.faculty);
  const [semester, setSemester] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [attendanceDetails, setAttendanceDetails] = useState([]);
  const [takingAttendanceFor, setTakingAttendanceFor] = useState("");
  const [courseID, setCourseID] = useState("");
  const dispatch = useDispatch();

  const handleCourseChange = (e) => {
    setViewTable(false);
    const { value } = e.target;
    const selectedOption = allCoursesAssigned
      ?.slice(1)
      ?.find((course) => course.course._id === value);
    setSelectedCourse({
      courseId: selectedOption.course._id,
      departmentId: selectedOption.department._id,
      semester: selectedOption.semester,
    });
    setCourseID(selectedOption?.course?._id);
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
        "/student/get-students-by-course",
        selectedCourse
      );
      setAttendanceDetails(data?.students);
      toast.success(data?.message);
      console.log(data);
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
  const handleAttendanceSubmit = async () => {
    // if (storeAttendanceDetails?.length - 1 !== attendanceDetails?.length) {
    //   return toast.error("select attendance for all students");
    // }
    if (!date) {
      return toast.error("please select a date");
    }
    if (!window.confirm("Are you sure you want to proceed?")) {
      return; // User clicked Cancel, so exit the function
    }
    setLoading(true);
    const attendnaceData = {
      courseId: courseID,
      date: date,
      attendance: storeAttendanceDetails,
    };
    console.log(attendnaceData);
    try {
      const { data } = await API.patch(
        "/attendance/add-bulk-student-attendence",
        attendnaceData
      );
      setAttendanceDetails(data?.students);
      toast.success(data?.message);
      setDate("");
      dispatch(clearStoreAttendanceDetails());
      setViewTable(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  const attendanceTableHeadData = [
    {
      accessorKey: "serial",
      header: "Serial",
      size: 150,
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
      accessorKey: "status",
      header: "Status",
      size: 300,
    },
  ];

  const attendanceTableData = attendanceDetails?.map((item, idx) => {
    return {
      serial: idx + 1,
      regdNo: item?.regdNo,
      name: item?.name,
      status: <Badge student={item} />,
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
          className="p-2 poppins-bold-italic border-2 outline-none border-none border-gray-600  rounded"
        >
          <option value="" className="poppins-medium">
            Select a course
          </option>
          {allCoursesAssigned?.slice(1)?.map((course) => {
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
          Get Students
        </button>
      </div>

      {viewTable && (
        <>
          {/* attendance section */}

          <div className="mt-10 relative ">
            <div className=" mb-5 flex items-center justify-between ">
              <div className="">
                <div className=" poppins-bold  mb-1  text-gray-700">
                  {takingAttendanceFor}
                </div>
                <div className=" poppins-medium    text-gray-500">
                  {attendanceDetails?.length} student{"(s)"} available
                </div>
              </div>

              <div className="">
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  placeholder="choose date"
                  className=" p-3 poppins-medium outline-none text-lg rounded ml-5"
                />
              </div>
            </div>

            <Table
              tableData={attendanceTableData}
              tableHeadData={attendanceTableHeadData}
            />
          </div>
          {/* submit attendance */}
          <div className="w-full mt-8 mb-10 flex flex-row-reverse">
            <button
              onClick={handleAttendanceSubmit}
              className=" px-3 py-2 tracking-wide poppins-bold text-white bg-themeBlue rounded hover:opacity-90"
            >
              Submit Attendance
            </button>
          </div>
        </>
      )}
    </FacultyDashBoard>
  );
};

export default FacultyAttendance;

function Badge({ student }) {
  const isPresentRef = useRef(false);
  const isAbsentRef = useRef(false);
  const isSickRef = useRef(false);
  const [presentStyle, setPresentStyle] = useState(false);
  const [absentStyle, setAbsentStyle] = useState(false);
  const [sickStyle, setSickStyle] = useState(false);

  const getStatus = () => {
    if (isPresentRef.current) {
      return "present";
    }
    if (isAbsentRef.current) {
      return "absent";
    }
    if (isSickRef.current) {
      return "sick";
    }
    return "";
  };

  const dispatch = useDispatch();
  const handleAddAttendance = () => {
    // if (
    //   getStatus() !== "present" &&
    //   getStatus() !== "absent" &&
    //   getStatus() !== "sick"
    // ) {
    //   return;
    // }
    try {
      const attendanceData = {
        student: student?._id,
        status: getStatus(),
      };
      dispatch(setStoreAttendanceDetails(attendanceData));
    } catch (error) {}
  };
  return (
    <div className="flex gap-3">
      <button
        onClick={() => {
          isPresentRef.current = !isPresentRef.current;
          isAbsentRef.current = false;
          isSickRef.current = false;
          setPresentStyle(!presentStyle);
          setAbsentStyle(false);
          setSickStyle(false);
          handleAddAttendance();
        }}
        className={`rounded 
           hover:bg-green-400 hover:text-green-900 
          poppins-medium  w-[71px] text-center px-2 py-1 cursor-pointer  ${
            presentStyle
              ? "text-green-900 bg-green-500 "
              : "bg-green-200 text-green-700"
          }`}
      >
        Present
      </button>
      <button
        onClick={() => {
          isAbsentRef.current = !isAbsentRef.current;
          isPresentRef.current = false;
          isSickRef.current = false;
          setAbsentStyle(!absentStyle);
          setPresentStyle(false);
          setSickStyle(false);
          handleAddAttendance();
        }}
        className={`rounded  hover:bg-red-400 hover:text-red-900  poppins-medium  w-[71px] text-center px-2 py-1 cursor-pointer ${
          absentStyle ? "text-red-900 bg-red-500" : "bg-red-200 text-red-700"
        }`}
      >
        Absent
      </button>
      <button
        onClick={() => {
          isSickRef.current = !isSickRef.current;
          isPresentRef.current = false;
          isAbsentRef.current = false;
          setSickStyle(!sickStyle);
          setAbsentStyle(false);
          setPresentStyle(false);
          handleAddAttendance();
        }}
        className={`rounded  hover:bg-yellow-400 hover:text-yellow-900  poppins-medium  w-[71px] text-center px-2 py-1 cursor-pointer ${
          sickStyle
            ? "text-yellow-900 bg-yellow-500"
            : "bg-yellow-200 text-yellow-700"
        }`}
      >
        Sick
      </button>
    </div>
  );
}
