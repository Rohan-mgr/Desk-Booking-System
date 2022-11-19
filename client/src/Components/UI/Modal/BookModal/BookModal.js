import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";

function BookingModal(props) {
  const navigate = useNavigate();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  return (
    <>
      <Modal show={props.Show} onHide={props.handleClose} className="addModal">
        <Modal.Body>
          <h5 className="text-center m-3">Book Your Space</h5>
          <div>
            <p>Check in - Check out</p>
            <span>
              {new Date(date.startDate).toLocaleDateString("en-US")} to
              {new Date(date.endDate).toLocaleDateString("en-US")}
            </span>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => setDate([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={date}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default BookingModal;
