// eslint-disable-next-line

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./features/auth/pages/Login";
import PageNotFound from "./pages/PageNotFound";
import UnAuthorizedPage from "./pages/UnAuthorizedPage";
import StudentDashBoard from "./components/dashboard/StudentDashBoard";
import FacultyDashBoard from "./components/dashboard/FacultyDashBoard";
import AdminDashBoard from "./components/dashboard/AdminDashBoard";
import { Toaster } from "react-hot-toast";
import AdminAddStudent from "./features/admin/pages/AdminAddStudent";
import AdminAddFaculty from "./features/admin/pages/AdminAddFaculty";
import AdminFaculties from "./features/admin/pages/AdminFaculties";
import AdminStudents from "./features/admin/pages/AdminStudents";
import AdminHome from "./features/admin/pages/AdminHome";

const App = () => {
  let [isAuthentcatedAsStudent, setIsAuthentcatedAsStudent] = useState(true);
  let [isAuthentcatedAsFaculty, setIsAuthentcatedAsFaculty] = useState(true);
  let [isAuthentcatedAsAdmin, setIsAuthentcatedAsAdmin] = useState(true);

  return (
    <>
      <Toaster />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* private routes */}

        {/* allow student routes if authenticated  */}
        <Route
          path="/student/:id/*"
          element={
            isAuthentcatedAsStudent ? (
              <StudentDashBoard />
            ) : (
              <UnAuthorizedPage />
            )
          }
        />
        {/* allow admin routes if authenticated  */}

        <Route path="/admin/:id" element={<AdminHome />} />
        <Route path="/admin/:id/add-student" element={<AdminAddStudent />} />
        <Route path="/admin/:id/add-faculty" element={<AdminAddFaculty />} />
        <Route path="/admin/:id/faculties" element={<AdminFaculties />} />
        <Route path="/admin/:id/students" element={<AdminStudents />} />

        {/* allow faculty routes if authenticated  */}
        <Route
          path="/faculty/:id/*"
          element={
            isAuthentcatedAsFaculty ? (
              <FacultyDashBoard />
            ) : (
              <UnAuthorizedPage />
            )
          }
        />

        {/* page not found  */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
