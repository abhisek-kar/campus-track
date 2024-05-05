import React, { useEffect, useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";
import API from "../../../services/API";
import toast from "react-hot-toast";
import { formatDate } from "./../../../services/util";
import { IoDocumentText } from "react-icons/io5";
import AssignmentViewModal from "../../../components/modals/faculty/AssignmentViewModal";
import { useAdmin } from "../../../context/adminContext";

const FacultyAssignments = () => {
  const { user } = useSelector((state) => state?.auth);
  const [selectedCourse, setSelectedCourse] = useState({
    courseId: "",
    departmentId: "",
    semester: "",
  });
  const { allCoursesAssigned } = useSelector((state) => state?.faculty);
  const [viewTable, setViewTable] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [doc, setDoc] = useState("");
  const [assignmentDetails, setAssignmentDetails] = useState([]);
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
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (new Date(date) < Date.now()) {
      return toast.error("submiison date should be more than current date");
    }
    setLoading(true);
    try {
      // Prepare the data to send to the API
      const formData = new FormData();
      formData.append("courseId", selectedCourse.courseId);
      formData.append("departmentId", selectedCourse.departmentId);
      formData.append("semester", selectedCourse.semester);
      formData.append("task", task);
      formData.append("doc", doc); // Assuming doc is a file object
      formData.append("facultyId", user?._id); // Assuming doc is a file object
      formData.append("submitBy", date);

      // Make an API call to submit the assignment
      const { data } = await API.post(
        "/assignment/create-assignment",
        formData
      );
      console.log(data);
      toast.success(data?.message);

      // Clear the form fields after successful submission
      setSelectedCourse({ courseId: "", departmentId: "", semester: "" });
      setTask("");
      setDoc(null);
      setDate("");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.error("Error submitting assignment:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(
          "/assignment/faculty-assignments/" + user?._id
        );
        setAssignmentDetails(data?.assignments);
        // console.log("XXXXXXXXXXXXXXXXXXXXXXX", data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, [loading]);

  const dispatch = useDispatch();

  const assignmentTableHeadData = [
    {
      accessorKey: "serial",
      header: "Serial",
      size: 30,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      size: 50,
    },
    {
      accessorKey: "semester",
      header: "Sem",
      size: 50,
    },
    {
      accessorKey: "courseName",
      header: "Course Name",
      size: 150,
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
      size: 50,
    },
    {
      accessorKey: "submitBy",
      header: "Submit By",
      size: 50,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
    },
    {
      accessorKey: "action",
      header: "Action",
      size: 100,
    },
  ];

  const aassignmentTableData = assignmentDetails.map((item, idx) => {
    return {
      serial: idx + 1,
      branch: item?.department?.code,
      semester: item?.semester,
      courseName: item?.course?.name,
      createdOn: formatDate(item?.createdOn),
      submitBy: formatDate(item?.submitBy),
      status: <Badge status={new Date(item?.submitBy) >= new Date()} />,
      action: <View onClick={() => setShowViewModal(true)} item={item} />,
    };
  });
  return (
    <FacultyDashBoard>
      {loading && <Loader />}
      {showViewModal && (
        <AssignmentViewModal onClose={() => setShowViewModal(false)} />
      )}
      <p className="poppins-medium text-gray-800 text-2xl ">
        Create Assignment
      </p>

      {/* dropdown */}
      <div className=" mt-5 mb-10">
        <select
          value={selectedCourse.courseId}
          onChange={handleCourseChange}
          className="p-2 poppins-bold-italic border-2 outline-none border-none border-gray-600  rounded"
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
      </div>

      {/* assignment */}
      <div className="mt-10">
        <div className="">
          <p className="poppins-medium text-gray-700">write task here ....</p>
          {/* textarea */}
          <textarea
            placeholder="Enter your task here..."
            className="w-full h-48 mt-1 border-none outline-none p-2 poppins-medium border-none outline-none"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          {/* attach file */}
          <div className="flex gap-3 items-center mt-3">
            <label className="poppins-medium block my-2 text-gray-700">
              Attach document
            </label>
            <input
              onChange={(e) => setDoc(e.target.files[0])}
              type="file"
              className="poppins-regular-italic p-2 text-sm text-themeBlue border-none outline-none"
            />
          </div>
          <div className="flex gap-3 items-center mt-3">
            <label className="poppins-medium block my-2 text-gray-700">
              Submit By
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="poppins-regular-italic text-sm text-themeBlue p-1 border-none outline-none"
            />
          </div>
          {/* submit */}
          <div className="w-full flex justify-end ">
            <button
              onClick={(e) => handleSubmit(e)}
              className=" px-2 py-1 bg-themeBlue rounded hover:opacity-90 poppins-medium text-white my-5 "
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* list of assignments  */}
      <div className=" mb-5">
        <p className="poppins-medium text-gray-800 text-2xl mb-2 ">
          {assignmentDetails?.length > 0
            ? "List of Assignments"
            : "No Assignment Found"}
        </p>
        {assignmentDetails?.length > 0 && (
          <Table
            tableData={aassignmentTableData}
            tableHeadData={assignmentTableHeadData}
          />
        )}
      </div>
    </FacultyDashBoard>
  );
};

export default FacultyAssignments;

function Badge({ status }) {
  return (
    <button
      disabled
      className={`rounded-md ${
        status ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
      } poppins-medium text-xs w-20 px-2 py-1 `}
    >
      {status ? "Active" : "Inactive"}
    </button>
  );
}
function View({ onClick, item }) {
  const { currentAssignment, setCurrentAssignment } = useAdmin();
  return (
    <div
      onClick={() => {
        onClick();
        console.log(item);
        setCurrentAssignment(item);
      }}
      className="flex  items-center  text-themeBlue gap-1 poppins-bold underline cursor-pointer font-semibold"
    >
      <IoDocumentText /> View
    </div>
  );
}
