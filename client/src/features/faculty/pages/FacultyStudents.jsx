import React, { useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Table from "../../../components/Table";

const FacultyStudents = () => {
  const options = ["1st yr", "2nd yr", "3rd yr", "4th yr"];
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [date, setDate] = useState("");
  //
  const attendanceDetails = [
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
    },
  ];
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
      header: "Total Present",
      size: 150,
    },
    {
      accessorKey: "totalAbsent",
      header: "Total Absent",
      size: 150,
    },
  ];

  const attendanceTableData = attendanceDetails.map((item, idx) => {
    return {
      serial: idx + 1,
      regdNo: item?.regdNo,
      name: item?.name,
      totalPresent: item?.totalPresent,
      totalAbsent: item?.totalAbsent,
    };
  });

  return (
    <FacultyDashBoard>
      <div className="poppins-medium text-gray-800 text-xl">Student List</div>
      <div className="poppins-regular text-gray-600 text-sm">
        20 students found
      </div>
      {/* dropdown */}
      {/* <div className="flex gap-5">
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

        <button className="ml-auto px-2 py-1 poppins-medium text-white bg-themeBlue rounded hover:opacity-90">
          Get Students
        </button>
      </div> */}
      {/* attendance section */}
      <div className="mt-5">
        <Table
          tableData={attendanceTableData}
          tableHeadData={attendanceTableHeadData}
        />
      </div>
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
