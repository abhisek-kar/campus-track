import React, { useEffect, useState } from "react";
import StudentDashBoard from "../../../components/dashboard/StudentDashBoard";
import Table from "../../../components/Table";
import { RiEdit2Line } from "react-icons/ri";
import { useModal } from "../../../context/modalContext";
import StudentAssignmentModal from "../../../components/modals/StudentAssignmentModal";
import { FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";
import API from "../../../services/API";
import { formatDate } from "./../../../services/util";
import { IoDocumentText } from "react-icons/io5";
import { useAdmin } from "../../../context/adminContext";
import AssignmentViewModal from "../../../components/modals/faculty/AssignmentViewModal";
import AssignmentUploadModal from "../../../components/modals/faculty/AssignmentUploadModal";
import { Spinner } from "../../../components/Loader";

const StudentAssignment = () => {
  const { user } = useSelector((state) => state?.auth);
  const [assignment, setAssignment] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSpin, setShowSpin] = useState(false);
  const {
    openStudentAttendanceModal,
    closeStudentAttendanceModal,
    showStudentAttendanceModal,
  } = useModal();
  const assignmentDetails = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowSpin(true);
        const studentData = {
          semester: user?.semester,
          departmentId: user?.department?._id,
        };
        const { data } = await API.post(
          "/assignment/student-assignments",
          studentData
        );
        console.log("xxxxxxxxxxxxxxxxx", data);
        setAssignment(data?.assignments);
      } catch (error) {
        console.log(error);
      } finally {
        setShowSpin(false);
      }
    };

    fetchData();

    return () => {};
  }, [showUploadModal]);
  const assignmentTableHeadData = [
    {
      accessorKey: "course",
      header: "Course",
      size: 200,
    },
    {
      accessorKey: "faculty",
      header: "Faculty",
      size: 150,
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
      size: 100,
    },
    {
      accessorKey: "submitBy",
      header: "Submit By",
      size: 100,
    },
    // {
    //   accessorKey: "submissionDate",
    //   header: "Submitted On",
    //   size: 100,
    // },
    {
      accessorKey: "SubmissionStatus",
      header: "Submission",
      size: 100,
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

  const assignmentTableData = assignment?.map((item, idx) => {
    let expired = new Date(item?.submitBy) >= new Date();
    return {
      course: item?.course?.name,
      faculty: item?.faculty?.name,
      createdOn: formatDate(item?.createdOn),
      submitBy: formatDate(item?.submitBy),
      // submissionDate: item?.submissionDate,
      SubmissionStatus: (
        <SubmissionStatus studentId={user?._id} assignmentId={item?._id} />
      ),
      status: <Badge status={expired} />,
      action: (
        <div className="flex gap-3">
          <View onClick={() => setShowViewModal(true)} item={item} />
          {/* {!expired && ( */}
          <Upload onClick={() => setShowUploadModal(true)} item={item} />
          {/* // )}{" "} */}
        </div>
      ),
    };
  });
  return (
    <StudentDashBoard>
      {" "}
      {showViewModal && (
        <AssignmentViewModal onClose={() => setShowViewModal(false)} />
      )}
      {showUploadModal && (
        <AssignmentUploadModal onClose={() => setShowUploadModal(false)} />
      )}
      {/* assignment */}
      <div className="mt-5">
        <p className="poppins-medium text-gray-800 text-xl">
          List Of Assignments
        </p>
      </div>
      <div className="mt-5">
        {showSpin ? (
          <div className="absolute top-1/2 left-[40%]">
            <Spinner />
          </div>
        ) : (
          <Table
            tableData={assignmentTableData}
            tableHeadData={assignmentTableHeadData}
          />
        )}
      </div>
      {showStudentAttendanceModal && (
        <StudentAssignmentModal onClose={closeStudentAttendanceModal} />
      )}
    </StudentDashBoard>
  );
};

export default StudentAssignment;

function Badge({ status }) {
  return (
    <button
      disabled
      className={`rounded 
         ${status ? " bg-green-200 text-green-700" : ""}
         ${!status ? " bg-red-200 text-red-700" : ""}
          poppins-medium  w-24  text-center px-2 py-1  `}
    >
      {status ? "Active" : "Inactive"}
    </button>
  );
}
function SubmissionStatus({ studentId, assignmentId }) {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get(
          "/assignment/submitted-or-not/" + assignmentId + "/" + studentId
        );

        //  console.log("xxxxxxxxxxxxxxxxx", data);
        setStatus(data?.success);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {};
  }, []);
  return (
    <button
      disabled
      className={`rounded 
         ${status ? " bg-green-200 text-green-700" : ""}
         ${!status ? " bg-red-200 text-red-700" : ""}
          poppins-medium  w-24  text-center px-2 py-1  `}
    >
      {status ? "Submitted" : "Pending"}
    </button>
  );
}

function View({ onClick, item }) {
  const { currentAssignment, setCurrentAssignment } = useAdmin();
  return (
    <div
      onClick={() => {
        onClick();
        setCurrentAssignment(item);
      }}
      className="flex  items-center gap-[2x] text-themeBlue poppins-medium underline cursor-pointer font-semibold"
    >
      <IoDocumentText /> View
    </div>
  );
}
function Upload({ onClick, item }) {
  const { currentAssignment, setCurrentAssignment } = useAdmin();
  return (
    <div
      onClick={() => {
        onClick();
        setCurrentAssignment(item);
      }}
      className="flex  items-center gap-[2x] text-themeBlue poppins-medium underline cursor-pointer font-semibold"
    >
      <FaUpload /> Upload
    </div>
  );
}
