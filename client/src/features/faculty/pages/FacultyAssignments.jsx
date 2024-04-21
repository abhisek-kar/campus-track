import React, { useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";
import Table, { Badge, Edit } from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader";

const assignmentDetails = [
  {
    semester: "1st",
    courseName: "Introduction to Computer Science",
    createdOn: "2023-05-15",
    status: "Active",
  },
  {
    semester: "2nd",
    courseName: "Data Structures and Algorithms",
    createdOn: "2023-06-20",
    status: "Inactive",
  },
  {
    semester: "3rd",
    courseName: "Database Management Systems",
    createdOn: "2023-07-10",
    status: "Active",
  },
  {
    semester: "4th",
    courseName: "Web Development",
    createdOn: "2023-08-05",
    status: "Inactive",
  },
  {
    semester: "5th",
    courseName: "Artificial Intelligence",
    createdOn: "2023-09-12",
    status: "Active",
  },
  {
    semester: "6th",
    courseName: "Machine Learning",
    createdOn: "2023-10-18",
    status: "Inactive",
  },
  {
    semester: "7th",
    courseName: "Cybersecurity",
    createdOn: "2023-11-25",
    status: "Active",
  },
  {
    semester: "8th",
    courseName: "Software Engineering",
    createdOn: "2024-01-05",
    status: "Inactive",
  },
  {
    semester: "9th",
    courseName: "Cloud Computing",
    createdOn: "2024-02-14",
    status: "Active",
  },
  {
    semester: "10th",
    courseName: "Network Security",
    createdOn: "2024-03-20",
    status: "Inactive",
  },
];

const assignmentTableHeadData = [
  {
    accessorKey: "serial",
    header: "Serial",
    size: 50,
  },
  {
    accessorKey: "branch",
    header: "Branch",
    size: 150,
  },
  {
    accessorKey: "semester",
    header: "Semester",
    size: 100,
  },
  {
    accessorKey: "courseName",
    header: "Course Name",
    size: 250,
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    size: 200,
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
    branch: item?.branch,
    semester: item?.semester,
    courseName: item?.courseName,
    createdOn: item?.createdOn,
    status: item?.status,
    status: <Badge status={item?.status} />,
    action: <Edit />,
  };
});

const FacultyAssignments = () => {
  const [selectedCourse, setSelectedCourse] = useState({
    courseId: "",
    departmentId: "",
    semester: "",
  });
  const { allCoursesAssigned } = useSelector((state) => state?.faculty);
  const [viewTable, setViewTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [doc, setDoc] = useState("");
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
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Prepare the data to send to the API
      const formData = new FormData();
      formData.append("courseId", selectedCourse.courseId);
      formData.append("departmentId", selectedCourse.departmentId);
      formData.append("semester", selectedCourse.semester);
      formData.append("task", task);
      formData.append("doc", doc); // Assuming doc is a file object
      formData.append("dueDate", date);
      console.log(formData);
      // Make an API call to submit the assignment
      // const response = await API.post("/assignments/create", formData);

      // Handle the response as needed
      // console.log(response.data); // Log the response or update state, etc.

      // Clear the form fields after successful submission
      setSelectedCourse({ courseId: "", departmentId: "", semester: "" });
      setTask("");
      setDoc(null);
      setDate("");
    } catch (error) {
      console.error("Error submitting assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FacultyDashBoard>
      {loading && <Loader />}
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
              onClick={handleSubmit}
              className=" px-2 py-1 bg-themeBlue rounded hover:opacity-90 poppins-medium text-white my-5 "
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* list of assignments  */}
      <div className="relative">
        <p className="poppins-medium text-gray-800 text-xl absolute z-10 ml-2">
          List of Assignments
        </p>
        <Table
          tableData={aassignmentTableData}
          tableHeadData={assignmentTableHeadData}
        />
      </div>
    </FacultyDashBoard>
  );
};

export default FacultyAssignments;
