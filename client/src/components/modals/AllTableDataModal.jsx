import React from "react";
import Modal from "./Modal";
import Table from "../tables/Table";

const AllTableDataModal = ({ showModal, onClose, headingData, rowData }) => {
  return (
    <Modal showModal={showModal} onClose={onClose} widthNheight={"h-3/4 w-3/4"}>
      <Table headingData={headingData} rowData={rowData} />
    </Modal>
  );
};

export default AllTableDataModal;
