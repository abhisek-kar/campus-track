import React from "react";
import StudentDashBoard from "../../../components/dashboard/StudentDashBoard";
import Table from "../../../components/Table";
import { RiEdit2Line } from "react-icons/ri";
import { useModal } from "../../../context/modalContext";
import StudentAssignmentModal from "../../../components/modals/StudentAssignmentModal";

const StudentAssignment = () => {
  const {
    openStudentAttendanceModal,
    closeStudentAttendanceModal,
    showStudentAttendanceModal,
  } = useModal();
  const assignmentDetails = [
    {
      subject: "Mathematics",
      faculty: "John Doe",
      createdOn: "2024-04-10",
      deadline: "2024-05-10",
      submissionDate: "2024-05-08",
      SubmissionStatus: "submitted",
      status: "active",
    },
    {
      subject: "Mathematics",
      faculty: "John Doe",
      createdOn: "2024-04-10",
      deadline: "2024-05-10",
      submissionDate: "2024-05-08",
      SubmissionStatus: "pending",
      status: "inactive",
    },
    {
      subject: "Mathematics",
      faculty: "John Doe",
      createdOn: "2024-04-10",
      deadline: "2024-05-10",
      submissionDate: "2024-05-08",
      SubmissionStatus: "submitted",
      status: "active",
    },
  ];
  const assignmentTableHeadData = [
    {
      accessorKey: "subject",
      header: "Subject",
      size: 150,
    },
    {
      accessorKey: "faculty",
      header: "Faculty Name",
      size: 150,
    },
    {
      accessorKey: "createdOn",
      header: "Created On",
      size: 100,
    },
    {
      accessorKey: "deadline",
      header: "Submit By",
      size: 100,
    },
    {
      accessorKey: "submissionDate",
      header: "Submitted On",
      size: 100,
    },
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

  const assignmentTableData = assignmentDetails.map((item, idx) => {
    return {
      subject: item?.subject,
      faculty: item?.faculty,
      createdOn: item?.createdOn,
      deadline: item?.deadline,
      submissionDate: item?.submissionDate,
      SubmissionStatus: <SubmissionStatus status={item?.SubmissionStatus} />,
      status: <Badge status={item?.status} />,
      action: <Edit />,
    };
  });
  return (
    <StudentDashBoard>
      {" "}
      {/* assignment */}
      <div className="mt-5">
        <p className="poppins-medium text-gray-800 text-xl">
          List Of Assignments
        </p>
      </div>
      <div className="mt-5">
        <Table
          tableData={assignmentTableData}
          tableHeadData={assignmentTableHeadData}
        />
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
         ${status === "active" ? " bg-green-200 text-green-700" : ""}
         ${status === "inactive" ? " bg-red-200 text-red-700" : ""}
          poppins-medium  w-24  text-center px-2 py-1  `}
    >
      {status}
    </button>
  );
}
function SubmissionStatus({ status }) {
  return (
    <button
      disabled
      className={`rounded 
         ${status === "submitted" ? " bg-green-200 text-green-700" : ""}
         ${status === "pending" ? " bg-red-200 text-red-700" : ""}
          poppins-medium  w-24  text-center px-2 py-1  `}
    >
      {status}
    </button>
  );
}

function Edit() {
  const {
    openStudentAttendanceModal,
    closeStudentAttendanceModal,
    showStudentAttendanceModal,
  } = useModal();
  return (
    <div
      onClick={openStudentAttendanceModal}
      className="flex  items-center gap-2 text-themeBlue poppins-bold underline cursor-pointer font-semibold"
    >
      <RiEdit2Line /> View
    </div>
  );
}
