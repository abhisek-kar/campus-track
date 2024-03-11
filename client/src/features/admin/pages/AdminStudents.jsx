import React, { useState } from "react";
import Table from "../../../components/Table";
import AdminDashBoard from "../../../components/dashboard/AdminDashBoard";
import { useNavigate } from "react-router-dom";

const AdminStudents = () => {
  const navigate = useNavigate();
  const [filterOption, setFilterOption] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [pageNo, setPageNo] = useState(1);
  // const [filterCriteria, setFilterCriteria] = useState("");
  const [showAllStudentsModal, setShowStudentsModal] = useState(false);

  const filters = ["Year", "Semester", "Attendance", "Registration Number"];
  const filterData = {
    Year: ["1st", "2nd", "3rd", "4th"],
    Semester: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
    Attendance: [">= 75%", "< 75%"],
  };

  const adminDetails = [
    {
      firstName: "Abhisek",
      lastName: "Kar",
      email: "x@gmail.com",
      status: "active",
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      status: "active",
    },
    {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      status: "inactive",
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      status: "active",
    },
    {
      firstName: "Emma",
      lastName: "Brown",
      email: "emma.brown@example.com",
      status: "inactive",
    },
    {
      firstName: "Ryan",
      lastName: "Garcia",
      email: "ryan.garcia@example.com",
      status: "active",
    },
    {
      firstName: "Sophia",
      lastName: "Lee",
      email: "sophia.lee@example.com",
      status: "inactive",
    },
    {
      firstName: "David",
      lastName: "Miller",
      email: "david.miller@example.com",
      status: "active",
    },
    {
      firstName: "Ella",
      lastName: "Jones",
      email: "ella.jones@example.com",
      status: "inactive",
    },
    {
      firstName: "Michael",
      lastName: "Wang",
      email: "michael.wang@example.com",
      status: "active",
    },
  ];
  const adminTableHeadData = [
    {
      accessorKey: "no",
      header: "No",
      size: 150,
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      size: 150,
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      size: 150,
    },
    {
      accessorKey: "email",
      header: "Eamil",
      size: 250,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
    },
    {
      accessorKey: "action",
      header: "Action",
      size: 150,
    },
  ];

  const adminTableData = adminDetails.map((item, idx) => {
    return {
      no: idx < 9 ? "0" + (idx + 1) : idx + 1,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      // status: <Badge status={item.status} />,
      // action: <Edit />,
    };
  });
  return (
    <AdminDashBoard>
      <div className="w-full flex justify-end mb-2">
        <button
          onClick={() => navigate("/admin/:id/add-student")}
          className="poppins-medium text-white bg-themeBlue p-2 tracking-wide rounded hover:bg-opacity-90"
        >
          Add New Student
        </button>
      </div>
      <Table tableData={adminTableData} tableHeadData={adminTableHeadData} />
    </AdminDashBoard>
  );
};

export default AdminStudents;
