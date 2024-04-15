import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showStudentDeatilsModal, setShowStudentDeatilsModal] = useState(false);
  const [showAdminDeatilsModal, setShowAdminDeatilsModal] = useState(false);
  const [showFacultyDeatilsModal, setShowFacultyDeatilsModal] = useState(false);
  const [showStudentAttendanceModal, setStudentAttendanceModal] =
    useState(false);

  const openStudentDeatilsModal = () =>
    setShowStudentDeatilsModal((prev) => true);
  const closeStudentDeatilsModal = () =>
    setShowStudentDeatilsModal((prev) => false);
  const openAdminDeatilsModal = () => setShowAdminDeatilsModal((prev) => true);
  const closeAdminDeatilsModal = () =>
    setShowAdminDeatilsModal((prev) => false);
  const openFacultyDeatilsModal = () =>
    setShowFacultyDeatilsModal((prev) => true);
  const closeFacultyDeatilsModal = () =>
    setShowFacultyDeatilsModal((prev) => false);

  const openStudentAttendanceModal = () =>
    setStudentAttendanceModal((prev) => true);
  const closeStudentAttendanceModal = () =>
    setStudentAttendanceModal((prev) => false);

  return (
    <ModalContext.Provider
      value={{
        showAdminDeatilsModal,
        openStudentAttendanceModal,
        closeStudentAttendanceModal,
        showStudentAttendanceModal,
        openStudentDeatilsModal,
        closeStudentDeatilsModal,
        openAdminDeatilsModal,
        closeAdminDeatilsModal,
        openFacultyDeatilsModal,
        closeFacultyDeatilsModal,
        showStudentDeatilsModal,
        showFacultyDeatilsModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
