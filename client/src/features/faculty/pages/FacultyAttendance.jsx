import React, { useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Table from "../../../components/Table";

const FacultyAttendance = () => {
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
  ];
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

  const attendanceTableData = attendanceDetails.map((item, idx) => {
    return {
      serial: idx < 9 ? "0" + (idx + 1) : idx + 1,
      regdNo: item.regdNo,
      name: item.name,

      status: <Badge />,
    };
  });

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
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-[182px] p-2 border-0 outline-none"
        />
        <button className="ml-auto px-2 py-1 poppins-medium text-white bg-themeBlue rounded hover:opacity-90">
          Get Students
        </button>
      </div>
      {/* attendance section */}
      <div className="mt-10">
        <Table
          tableData={attendanceTableData}
          tableHeadData={attendanceTableHeadData}
        />
      </div>
    </FacultyDashBoard>
  );
};

export default FacultyAttendance;

function Badge() {
  const [isPresentClicked, setIsPresentClicked] = useState(false);
  const [isAbsentClicked, setIsAbsentClicked] = useState(false);
  return (
    <div className="flex gap-3">
      <button
        onClick={() => {
          setIsPresentClicked(!isPresentClicked);
          setIsAbsentClicked(false);
        }}
        className={`rounded 
          bg-green-200 text-green-700 hover:bg-green-400 hover:text-green-900 
          poppins-medium  w-[71px] text-center px-2 py-1 cursor-pointer  ${
            isPresentClicked ? "text-green-900 bg-green-400 " : ""
          }`}
      >
        Present
      </button>
      <button
        onClick={() => {
          setIsAbsentClicked(!isAbsentClicked);
          setIsPresentClicked(false);
        }}
        className={`rounded bg-red-200 text-red-700 hover:bg-red-400 hover:text-red-900  poppins-medium  w-[71px] text-center px-2 py-1 cursor-pointer ${
          isAbsentClicked ? "text-red-900 bg-red-400" : ""
        }`}
      >
        Absent
      </button>
    </div>
  );
}
