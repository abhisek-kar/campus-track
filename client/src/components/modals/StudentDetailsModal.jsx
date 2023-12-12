import React from "react";
import Modal from "./Modal";

const StudentDetailsModal = () => {
  return (
    <div>
      <Modal onClose={onClose}>
        <div>Student Details</div>
      </Modal>
    </div>
  );
};

export default StudentDetailsModal;
