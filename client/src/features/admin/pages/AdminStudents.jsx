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
import Loader, { Spinner } from "../../../components/Loader";
import { useAdmin } from "../../../context/adminContext";
import { FaBookReader } from "react-icons/fa";
import AdminStudentCourseDetails from "../../../components/modals/admin/AdminStudentCourseDetails";

const AdminStudents = () => {
  const navigate = useNavigate();
  const { currentStudent, setCurrentStudent } = useAdmin();
  const { mailLoader, setMailLoader } = useAdmin();

  const [showAddStudentsModal, setShowAddStudentsModal] = useState(false);
  const [showEditStudentsModal, setShowEditStudentsModal] = useState(false);
  const [studentDetails, setStudentDetails] = useState([]);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCourseDetailsModal, setShowCourseDetailsModal] = useState(false);

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
      size: 150,
    },
    {
      accessorKey: "year",
      header: "Year",
      size: 30,
    },
    {
      accessorKey: "sem",
      header: "Sem",
      size: 30,
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
      size: 350,
    },
  ];

  const studentTableData = studentDetails.map((item, idx) => {
    return {
      regno: 2001104065,
      name: item?.name,
      year: item?.year,
      sem: item?.semester,
      email: item?.email,
      attendance: <Badge currentStudent={item} />,
      action: (
        <div className="flex gap-5">
          <Edit
            onClick={() => {
              setShowEditStudentsModal(true);
              setCurrentStudent(item);
            }}
          />
          <CourseDetails
            onClick={() => {
              setShowCourseDetailsModal(true);
              setCurrentStudent(item);
            }}
          />
        </div>
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
      {/* Course Details Modal */}
      {showCourseDetailsModal && (
        <AdminStudentCourseDetails
          onClose={() => setShowCourseDetailsModal(false)}
          edit={true}
        />
      )}
      {mailLoader && <Loader />}
    </AdminDashBoard>
  );
};

export default AdminStudents;

function Edit({ onClick }) {
  return (
    <div
      onClick={onClick}
      className=" text-themeBlue poppins-semibold text-xs underline cursor-pointer"
    >
      Edit
    </div>
  );
}

function Badge({ currentStudent }) {
  const { mailLoader, setMailLoader } = useAdmin();
  const [attendanceData, setAttendanceData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(
          `/attendance/stats/${currentStudent?._id}`
        );
        setAttendanceData(data?.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  let flag =
    (attendanceData?.totalPresent +
      attendanceData?.totalSick / attendanceData?.totalAttendances) *
      100 >=
    75;

  return (
    <div className="flex ">
      <button
        disabled
        className={`rounded ${
          flag ? "bg-green-300 text-green-800" : "bg-red-300 text-red-800"
        } poppins-medium text-xs w-20 px-2 py-1 `}
      >
        {flag ? ">= 75%" : "< 75%"}
      </button>
      {!flag && (
        <button
          className="ml-2 poppins-medium-italic text-sm text-red-600  underline"
          onClick={async () => {
            setMailLoader(true);
            try {
              console.log({
                to: currentStudent?.email,
                studentName: currentStudent?.name,
              });
              const res = await API.post("/mail/send-mail", {
                to: currentStudent?.email,
                studentName: currentStudent?.name,
              });
              toast.success("mail sent successfully");
            } catch (error) {
              toast.error("error while sending mail");
            } finally {
              setMailLoader(false);
            }
          }}
        >
          send mail
        </button>
      )}
    </div>
  );
}
function CourseDetails({ onClick }) {
  return (
    <div
      onClick={onClick}
      className=" text-themeBlue poppins-semibold text-xs underline cursor-pointer"
    >
      {" "}
      Course Details
    </div>
  );
}
