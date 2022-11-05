import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function BookModal(props) {
  return (
    <>
      <Modal show={props.Show} onHide={props.handleClose}>
        <Modal.Body>
          <h3>Floor:</h3>
          {/* {props.Companies?.map((c) => c.floorPlan.floors[0].floorName)} */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default BookModal;
