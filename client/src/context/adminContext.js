import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const [mailLoader, setMailLoader] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        currentStudent,
        setCurrentStudent,
        setCurrentFaculty,
        currentFaculty,
        mailLoader,
        setMailLoader,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
