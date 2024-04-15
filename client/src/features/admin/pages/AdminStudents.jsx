import React, { useState } from "react";
import Table from "../../../components/Table";
import AdminDashBoard from "../../../components/dashboard/AdminDashBoard";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { RiEdit2Line } from "react-icons/ri";
import AdminAddStudentModal from "../../../components/modals/admin/AdminAddStudentModal";
import toast from "react-hot-toast";
import { useEffect } from "react";
import API from "../../../services/API";
import { Spinner } from "../../../components/Loader";
import { useAdmin } from "../../../context/adminContext";

const AdminStudents = () => {
  const navigate = useNavigate();
  const { currentStudent, setCurrentStudent } = useAdmin();
  const [showAddStudentsModal, setShowAddStudentsModal] = useState(false);
  const [showEditStudentsModal, setShowEditStudentsModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setShowSpinner(true);
      try {
        const { data } = await API.get("/student");
        setStudentDetails(data?.students);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setShowSpinner(false);
      }
    };

    fetchData();

    return () => {};
  }, [showAddStudentsModal, showEditStudentsModal]);

  const studentTableHeadData = [
    {
      accessorKey: "regno",
      header: "Regd. No",
      size: 30,
    },
    {
      accessorKey: "name",
      header: "Name",
      size: 100,
    },
    {
      accessorKey: "year",
      header: "Year",
      size: 50,
    },
    {
      accessorKey: "semester",
      header: "Semester",
      size: 50,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 150,
    },
    {
      accessorKey: "attendance",
      header: "Attendance",
      size: 200,
    },
    {
      accessorKey: "action",
      header: "Action",
      size: 150,
    },
  ];

  const studentTableData = studentDetails.map((item, idx) => {
    return {
      regno: 2001104065,
      name: item?.name,
      year: item?.year,
      semester: item?.semester,
      email: item?.email,
      attendance: (
        <Badge flag={(item?.attendance / item?.totalAttendance) * 100 >= 75} />
      ),
      action: (
        <Edit
          onClick={() => {
            setShowEditStudentsModal(true);
            setCurrentStudent(item);
          }}
        />
      ),
    };
  });
  return (
    <AdminDashBoard>
      <div className="w-full flex justify-end mb-5">
        <button
          onClick={() => setShowAddStudentsModal(true)}
          className="poppins-medium text-white bg-themeBlue p-2 tracking-wide rounded hover:bg-opacity-90"
        >
          <IoMdAdd className="inline text-xl mr-2 " />
          Add New Student
        </button>
      </div>
      {showSpinner ? (
        <div className="w-full justify-center items-center mt-20">
          <Spinner />
        </div>
      ) : (
        <Table
          tableData={studentTableData}
          tableHeadData={studentTableHeadData}
        />
      )}
      {/* Add students Modal */}
      {showAddStudentsModal && (
        <AdminAddStudentModal onClose={() => setShowAddStudentsModal(false)} />
      )}
      {/* Edit students Modal */}
      {showEditStudentsModal && (
        <AdminAddStudentModal
          onClose={() => setShowEditStudentsModal(false)}
          edit={true}
        />
      )}
    </AdminDashBoard>
  );
};

export default AdminStudents;

function Edit({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex  items-center gap-2 text-themeBlue poppins-bold underline cursor-pointer font-semibold"
    >
      <RiEdit2Line /> Edit
    </div>
  );
}

function Badge({ flag }) {
  return (
    <div className="flex ">
      <button
        disabled
        className={`rounded ${
          flag ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"
        } poppins-medium text-xs w-24 px-2 py-1 `}
      >
        {flag ? ">= 75%" : "< 75%"}
      </button>
      {!flag && (
        <button
          className="ml-2 poppins-medium-italic text-sm text-red-600  underline"
          onClick={() =>
            (window.location.href =
              "mailto:recipient@example.com?subject=Hello&body=Hi there,")
          }
        >
          send mail
        </button>
      )}
    </div>
  );
}
