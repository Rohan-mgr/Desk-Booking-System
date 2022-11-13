import React, { useState } from "react";
import "./AddModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { handleAddFloor } from "../../../../services/company";
import { connect } from "react-redux";
import { ROUTES } from "../../../../helper/routes";
import { useNavigate } from "react-router-dom";

function BookModal(props) {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      floorNo: "",
      roomCapacity: 0,
      deskCapacity: 0,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await handleAddFloor(props.selectedCompany?._id, values);
        if (!data) {
          throw new Error("Failed to add the floor");
        }
        props.handleClose();
        resetForm({ values: "" });
        // console.log(data);
        toast("Floor added successfully");
        navigate(
          `/${ROUTES.COMPANY}/${ROUTES.COMPANY_INFO}/${props.selectedCompany?._id}`
        );
      } catch (e) {
        toast.error(e);
        console.log("error", e);
      }
    },
  });
  return (
    <>
      <Modal show={props.Show} onHide={props.handleClose} className="addModal">
        <Modal.Body>
          <h5 className="text-center m-3">Add Floor</h5>
          <Form onSubmit={formik.handleSubmit} className="text-right">
            <Form.Group className="mb-3 text-left">
              <Form.Label>
                Floor Number<span>*</span>:{" "}
              </Form.Label>
              <Form.Control
                type="text"
                name="floorNo"
                value={formik.values.floorNo}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 text-left">
              <Form.Label>
                Total Rooms Per Floor<span>*</span>:{" "}
              </Form.Label>
              <Form.Control
                type="number"
                name="roomCapacity"
                value={formik.values.roomCapacity}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 text-left">
              <Form.Label>
                Total Desks Per Room<span>*</span>:{" "}
              </Form.Label>
              <Form.Control
                type="number"
                name="deskCapacity"
                value={formik.values.deskCapacity}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="text-right">
              Add Now
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedCompany: state.selectedCompany,
  };
};

export default connect(mapStateToProps)(BookModal);
