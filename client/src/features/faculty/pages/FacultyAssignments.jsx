import React, { useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";
import Table, { Badge, Edit } from "../../../components/Table";

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
    semester: item?.semester,
    courseName: item?.courseName,
    createdOn: item?.createdOn,
    status: item?.status,
    status: <Badge status={item?.status} />,
    action: <Edit />,
  };
});

const FacultyAssignments = () => {
  const options = ["1st yr", "2nd yr", "3rd yr", "4th yr"];
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");

  return (
    <FacultyDashBoard>
      {/* dropdown */}
      <div className="flex gap-5">
        <Dropdown
          options={options}
          onChange={(e) => setBranch(e.value)}
          value={branch}
          placeholder="Select Branch"
          className="w-48 rounded "
        />
        <Dropdown
          options={options}
          onChange={(e) => setYear(e.value)}
          value={year}
          placeholder="Select Year"
          className="w-48 rounded "
        />
        <Dropdown
          options={options}
          onChange={(e) => setSemester(e.value)}
          value={semester}
          placeholder="Select Semester"
          className="w-48 rounded "
        />
        <Dropdown
          options={options}
          onChange={(e) => setCourse(e.value)}
          value={course}
          placeholder="Select Course"
          className="w-48 rounded "
        />
      </div>

      {/* assignment */}
      <div className="mt-10">
        <p className="poppins-medium text-gray-800 text-xl">
          Create Assignment
        </p>
        <div className="">
          {/* textarea */}
          <textarea className="w-full h-48 mt-5" />
          {/* attach file */}
          <div>
            <label className="poppins-medium block my-2">Attach document</label>
            <input
              type="file"
              className="poppins-regular-italic text-sm text-themeBlue"
            />
          </div>
          {/* submit */}
          <div className="w-full flex justify-end ">
            <button className=" px-2 py-1 bg-themeBlue rounded hover:opacity-90 poppins-medium text-white my-5 ">
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
