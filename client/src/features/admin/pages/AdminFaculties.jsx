import React, { useState } from "react";
import AdminDashBoard from "../../../components/dashboard/AdminDashBoard";
import { RiEdit2Line } from "react-icons/ri";
import Table from "../../../components/Table";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import AdminAddFacultyModal from "../../../components/modals/admin/AdminAddFacultyModal";
import { FaBookReader } from "react-icons/fa";
import AdminCourseDetails from "../../../components/modals/admin/AdminCourseDetailsModal";
import { useAdmin } from "../../../context/adminContext";
import { useEffect } from "react";
import API from "../../../services/API";
import { useDispatch } from "react-redux";
import { setCurrentFaculty } from "../adminSlice";

const AdminFaculties = () => {
  const [showAddFacultyModal, setShowAddFacultyModal] = useState(false);
  const [showEditFacultyModal, setShowEditFacultyModal] = useState(false);
  const [showCourseDetailsModal, setShowCourseDetailsModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [facultyDetails, setFacultyDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setShowSpinner(true);
      try {
        const { data } = await API.get("/faculty");
        setFacultyDetails(data?.faculty);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setShowSpinner(false);
      }
    };

    fetchData();

    return () => {};
  }, [showEditFacultyModal, showAddFacultyModal]);
  const facultyTableHeadData = [
    {
      accessorKey: "no",
      header: "No",
      size: 30,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 100,
    },

    {
      accessorKey: "email",
      header: "Email",
      size: 150,
    },
    {
      accessorKey: "mobile",
      header: "Mobile No",
      size: 100,
    },
    {
      accessorKey: "action",
      header: "Action",
      size: 150,
    },
  ];

  const facultyTableData = facultyDetails?.map((item, idx) => {
    return {
      no: idx + 1,
      name: item?.name,
      email: item?.email,
      mobile: item?.mobile,
      action: (
        <div className="flex gap-8">
          <Edit
            onClick={() => {
              setShowEditFacultyModal(true);
              dispatch(setCurrentFaculty(item));
            }}
          />
          <CourseDetails onClick={() => setShowCourseDetailsModal(true)} />
        </div>
      ),
    };
  });

  return (
    <AdminDashBoard>
      <div className="w-full flex justify-end mb-5">
        <button
          onClick={() => setShowAddFacultyModal(true)}
          className="poppins-medium text-white bg-themeBlue p-2 tracking-wide rounded hover:bg-opacity-90"
        >
          <IoMdAdd className="inline text-xl mr-2 " />
          Add New Faculty
        </button>
      </div>
      <Table
        tableData={facultyTableData}
        tableHeadData={facultyTableHeadData}
      />
      {showAddFacultyModal && (
        <AdminAddFacultyModal onClose={() => setShowAddFacultyModal(false)} />
      )}
      {/* Edit Faculty Modal */}
      {showEditFacultyModal && (
        <AdminAddFacultyModal
          onClose={() => setShowEditFacultyModal(false)}
          edit={true}
        />
      )}
      {/* Course Details Modal */}
      {showCourseDetailsModal && (
        <AdminCourseDetails
          onClose={() => setShowCourseDetailsModal(false)}
          edit={true}
        />
      )}
    </AdminDashBoard>
  );
};

export default AdminFaculties;

function Edit({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex  items-center gap-1 text-themeBlue poppins-bold underline cursor-pointer font-semibold"
    >
      <RiEdit2Line /> Edit
    </div>
  );
}
function CourseDetails({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex  items-center gap-1 text-themeBlue poppins-bold underline cursor-pointer font-semibold"
    >
      <FaBookReader /> Course Details
    </div>
  );
}
