import React, { useState } from "react";
import AdminDashBoard from "../../../components/dashboard/AdminDashBoard";

const AdminFaculties = () => {
  const [filterOption, setFilterOption] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [pageNo, setPageNo] = useState(1);
  // const [filterCriteria, setFilterCriteria] = useState("");
  const [showAllFacultiesModal, setShowAllFacultiesModal] = useState(false);
  const [showPagination, setShowPagination] = useState(false);

  const filters = ["Course", "Faculty Name"];
  const filterData = {
    Course: ["Course 1", "Course 2", "course 3", "course 4"],
    Semester: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"],
  };
  return <AdminDashBoard className="w-full px-2"></AdminDashBoard>;
};

export default AdminFaculties;
