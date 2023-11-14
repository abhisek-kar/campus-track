import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import StudentAttendance from "./pages/student-dashboard/StudentAttendance";
import StudentAcademy from "./pages/student-dashboard/StudentAcademy";
import StudentPerformance from "./pages/student-dashboard/StudentPerformance";
import StudentSchedule from "./pages/student-dashboard/StudentSchedule";
import StudentHome from "./pages/student-dashboard/StudentHome";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* private routes */}
        {/* student dashboard routes */}

        <Route path="/student" element={<StudentHome />} />
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/academy" element={<StudentAcademy />} />
        <Route path="/student/performance" element={<StudentPerformance />} />
        <Route path="/student/schedule" element={<StudentSchedule />} />

        {/* page not found  */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
