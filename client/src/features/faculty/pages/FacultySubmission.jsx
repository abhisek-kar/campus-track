import React, { useState } from "react";
import FacultyDashBoard from "../../../components/dashboard/FacultyDashBoard";
import Dropdown from "react-dropdown";
import Table from "./../../../components/Table";
import { HiOutlineDocumentArrowDown } from "react-icons/hi2";

const FacultySubmission = () => {
  const [assignment, setAssignment] = useState("");
  const options = ["1st yr", "2nd yr", "3rd yr", "4th yr"];

  const submissionDetails = [
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
      submissionDate: "20th JAN, 2024",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
      submissionDate: "20th JAN, 2024",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
      submissionDate: "20th JAN, 2024",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
      submissionDate: "20th JAN, 2024",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
      submissionDate: "20th JAN, 2024",
    },
    {
      regdNo: "2001104065",
      name: "Abhisek Kar",
      submissionDate: "20th JAN, 2024",
    },
  ];
  const submissionTableHeadData = [
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
      accessorKey: "submissionDate",
      header: "Submission Date",
      size: 200,
    },
    {
      accessorKey: "document",
      header: "Document",
      size: 100,
    },
  ];

  const submissionTableData = submissionDetails.map((item, idx) => {
    return {
      serial: idx + 1,
      regdNo: item?.regdNo,
      name: item?.name,
      submissionDate: item?.submissionDate,
      documents: (
        <div>
          <HiOutlineDocumentArrowDown />
        </div>
      ),
    };
  });
  return (
    <FacultyDashBoard>
      {/* dropdown */}
      <div className="flex gap-5 mb-10">
        <Dropdown
          options={options}
          onChange={(e) => setAssignment(e.value)}
          value={assignment}
          placeholder="Select Assignment "
          className="w-72 rounded "
        />

        <button className="ml-auto px-2 py-1 poppins-medium text-white bg-themeBlue rounded hover:opacity-90">
          Get Submission Details
        </button>
      </div>

      {/*  */}

      <div className="poppins-medium text-gray-800 text-xl">
        Assignment Details
      </div>
      <div className="poppins-regular text-gray-600 text-sm">
        20 students submitted
      </div>
      {/* submission table */}
      <Table
        tableData={submissionTableData}
        tableHeadData={submissionTableHeadData}
      />
    </FacultyDashBoard>
  );
};

export default FacultySubmission;
