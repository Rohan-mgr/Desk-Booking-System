import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { handleAddFloor } from "../../../../services/company";

function DeskModal(props) {
  //   const formik = useFormik({
  //     initialValues: {
  //       floorName: "",
  //       roomCapacity: 0,
  //     },
  //     onSubmit: async (values, { resetForm }) => {
  //       try {
  //         const data = await handleAddFloor(props.companyId, values);
  //         if (!data) {
  //           throw new Error("Failed to add the floor");
  //         }
  //         props.handleClose();
  //         resetForm({ values: "" });
  //         // console.log(data);
  //         toast("Floor added successfully");
  //         // navigate(`/${ROUTES.COMPANY}`);
  //       } catch (e) {
  //         toast.error(e);
  //         console.log("error", e);
  //       }
  //     },
  //   });
  return (
    <>
      <Modal
        fluid
        show={props.Show}
        onHide={props.handleClose}
        className="addModal"
      >
        <Modal.Body>
          <h5 className="text-center">Add Desk</h5>
          {/* <Form onSubmit={formik.handleSubmit} className="text-right">
            <Form.Group className="mb-3 text-left">
              <Form.Label>
                Floor Name<span>*</span>:{" "}
              </Form.Label>
              <Form.Control
                type="text"
                name="floorName"
                value={formik.values.floorName}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 text-left">
              <Form.Label>
                Total Rooms Capacity<span>*</span>:{" "}
              </Form.Label>
              <Form.Control
                type="number"
                name="roomCapacity"
                value={formik.values.roomCapacity}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="text-right">
              Add Now
            </Button>
          </Form> */}
        </Modal.Body>
      </Modal>
    </>
  );
}
export default DeskModal;
