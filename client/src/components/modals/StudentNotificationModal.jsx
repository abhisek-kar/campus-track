import React, { useState } from "react";
import Modal from "./Modal";
import { BsFileEarmarkArrowDownFill } from "react-icons/bs";
import { studentNotificationData } from "../../services/notification/studentNotificationData";

const StudentNotificationModal = ({ showModal, onClose }) => {
  const [showFullContent, setShowFullContent] = useState(
    Array(studentNotificationData.length).fill(false)
  );

  const toggleShowContent = (index) => {
    const newShowFullContent = [...showFullContent];
    newShowFullContent[index] = !showFullContent[index];
    setShowFullContent(newShowFullContent);
  };
  return (
    <>
      {/* showing setting modal */}
      {showModal ? (
        <Modal showModal={showModal} onClose={onClose}>
          {studentNotificationData.map((item, idx) => {
            return (
              <div
                key={idx}
                className="my-2 p-1  shadow-sm-light shadow-gray-500 rounded-md"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <button onClick={() => {}}>
                    <BsFileEarmarkArrowDownFill className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-gray-600 font-sans font-medium">
                  {showFullContent[idx]
                    ? item.description
                    : item.description.slice(0, 90)}
                </span>
                <span
                  className="text-themeBlue cursor-pointer"
                  onClick={() => toggleShowContent(idx)}
                >
                  {showFullContent[idx] ? " Read less" : "...Read more"}
                </span>
              </div>
            );
          })}
        </Modal>
      ) : null}
    </>
  );
};

export default StudentNotificationModal;
