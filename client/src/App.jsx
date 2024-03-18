// eslint-disable-next-line

import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./features/auth/pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { Toaster } from "react-hot-toast";
import AdminAddStudent from "./features/admin/pages/AdminAddStudent";
import AdminAddFaculty from "./features/admin/pages/AdminAddFaculty";
import AdminFaculties from "./features/admin/pages/AdminFaculties";
import AdminStudents from "./features/admin/pages/AdminStudents";
import AdminHome from "./features/admin/pages/AdminHome";
import StudentHome from "./features/student/pages/StudentHome";
import StudentAttendance from "./features/student/pages/StudentAttendance";
import StudentAcademy from "./features/student/pages/StudentAcademy";
import StudentPerformance from "./features/student/pages/StudentPerformance";
import StudentSchedule from "./features/student/pages/StudentSchedule";
import FacultyHome from "./features/faculty/pages/FacultyHome";
import FacultyAttendance from "./features/faculty/pages/FacultyAttendance";
import FacultyStudents from "./features/faculty/pages/FacultyStudents";
import FacultyAssignments from "./features/faculty/pages/FacultyAssignments";
import FacultySchedule from "./features/faculty/pages/FacultySchedule";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* admin routes */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/add-student" element={<AdminAddStudent />} />
        <Route path="/admin/add-faculty" element={<AdminAddFaculty />} />
        <Route path="/admin/faculties" element={<AdminFaculties />} />
        <Route path="/admin/students" element={<AdminStudents />} />

        {/* student routes */}
        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/academy" element={<StudentAcademy />} />
        <Route path="/student/performance" element={<StudentPerformance />} />
        <Route path="/student/schedule" element={<StudentSchedule />} />

        {/* faculty routes */}
        <Route path="/faculty" element={<FacultyHome />} />
        <Route path="/faculty/attendance" element={<FacultyAttendance />} />
        <Route path="/faculty/students" element={<FacultyStudents />} />
        <Route path="/faculty/assignments" element={<FacultyAssignments />} />
        <Route path="/faculty/schedule" element={<FacultySchedule />} />

        {/* page not found  */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
