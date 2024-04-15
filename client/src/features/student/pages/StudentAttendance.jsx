import React, { useState } from "react";
import StudentDashBoard from "../../../components/dashboard/StudentDashBoard";
import Table from "../../../components/Table";
import Dropdown from "react-dropdown";

const StudentAttendance = () => {
  const subjects = ["COA", "CN", "OS", "AON"];
  const [subject, setSubject] = useState("");

  const attendanceDetails = [
    {
      year: "4th",
      sem: "2nd",
      date: "2nd JAN, 2024",
      status: "present",
    },
    {
      year: "4th",
      sem: "2nd",
      date: "2nd JAN, 2024",
      status: "absent",
    },
    {
      year: "4th",
      sem: "2nd",
      date: "2nd JAN, 2024",
      status: "sick",
    },
  ];
  const attendanceTableHeadData = [
    {
      accessorKey: "serial",
      header: "Serial",
      size: 50,
    },
    {
      accessorKey: "year",
      header: "Year",
      size: 100,
    },
    {
      accessorKey: "sem",
      header: "Semester",
      size: 100,
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

  const attendanceTableData = attendanceDetails.map((item, idx) => {
    return {
      serial: idx + 1,
      year: item?.year,
      sem: item?.sem,
      date: item?.date,
      status: <Badge status={item?.status} />,
    };
  });
  return (
    <StudentDashBoard>
      {/* dropdown */}
      <div className="flex gap-5 mt-5">
        <Dropdown
          options={subjects}
          onChange={(e) => setSubject(e.value)}
          value={subject}
          placeholder="Select Subject"
          className="w-48 rounded "
        />

        <button className="ml-auto px-2 py-1 poppins-medium text-white bg-themeBlue rounded hover:opacity-90">
          Get Attendance
        </button>
      </div>
      {/* attendance table */}
      <div className="mt-10">
        <Table
          tableData={attendanceTableData}
          tableHeadData={attendanceTableHeadData}
        />
      </div>
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
