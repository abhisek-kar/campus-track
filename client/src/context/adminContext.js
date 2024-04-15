import React, { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [currentFaculty, setCurrentFaculty] = useState(null);

  return (
    <AdminContext.Provider
      value={{
        currentStudent,
        setCurrentStudent,
        setCurrentFaculty,
        currentFaculty,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
