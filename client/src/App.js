// eslint-disable-next-line

import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./features/auth/pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import AdminFaculties from "./features/admin/pages/AdminFaculties";
import AdminStudents from "./features/admin/pages/AdminStudents";
import AdminHome from "./features/admin/pages/AdminHome";
import StudentHome from "./features/student/pages/StudentHome";
import FacultyHome from "./features/faculty/pages/FacultyHome";
import FacultyAttendance from "./features/faculty/pages/FacultyAttendance";
import FacultyStudents from "./features/faculty/pages/FacultyStudents";
import FacultyAssignments from "./features/faculty/pages/FacultyAssignments";
import { Tooltip } from "react-tooltip";
import FacultySubmission from "./features/faculty/pages/FacultySubmission";
import StudentAssignment from "./features/student/pages/StudentAssignment";
import StudentAttendance from "./features/student/pages/StudentAttendance";
import { ModalProvider } from "./context/modalContext";
import StudentTimeTable from "./features/student/pages/StudentTimeTable";
import AdminNotification from "./features/admin/pages/AdminNotification";
import { useSelector } from "react-redux";
import { AdminProvider } from "./context/adminContext";

const App = () => {
  const { user, userRole } = useSelector((state) => state?.auth);
  return (
    <AdminProvider>
      <ModalProvider>
        <Toaster />
        {/* <Tooltip /> */}
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          {/* admin routes */}

          {user && userRole && userRole === "admin" && (
            <>
              <Route path="/admin" element={<AdminHome />} />
              {/* {/* <Route path="/admin/add-student" element={<AdminAddStudent />} /> */}
              <Route
                path="/admin/create-notification"
                element={<AdminNotification />}
              />{" "}
              <Route path="/admin/faculties" element={<AdminFaculties />} />
              <Route path="/admin/students" element={<AdminStudents />} />
            </>
          )}

          {user && userRole && userRole === "student" && (
            <>
              {/* student routes */}
              <Route path="/student" element={<StudentHome />} />
              <Route
                path="/student/assignments"
                element={<StudentAssignment />}
              />
              <Route
                path="/student/attendance"
                element={<StudentAttendance />}
              />
              <Route
                path="/student/time-table"
                element={<StudentTimeTable />}
              />
              {/* <Route path="/student/performance" element={<StudentPerformance />} />
        <Route path="/student/schedule" element={<StudentSchedule />} /> */}
            </>
          )}

          {user && userRole && userRole === "faculty" && (
            <>
              {/* faculty routes */}
              <Route path="/faculty" element={<FacultyHome />} />
              <Route
                path="/faculty/attendance"
                element={<FacultyAttendance />}
              />
              <Route path="/faculty/students" element={<FacultyStudents />} />
              <Route
                path="/faculty/assignments"
                element={<FacultyAssignments />}
              />
              <Route
                path="/faculty/submissions"
                element={<FacultySubmission />}
              />
            </>
          )}
          {/* page not found  */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ModalProvider>
    </AdminProvider>
  );
};

export default App;
