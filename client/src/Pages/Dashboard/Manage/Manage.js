import React, { useEffect, useState } from "react";
import "./Manage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { _getSecureLs, _setSecureLs } from "../../../helper/storage";
import { ROUTES } from "../../../helper/routes";
import { useFormik } from "formik";
import { handleRegisterCompany } from "../../../services/auth";
import { toast } from "react-toastify";
import { getAllCompanies } from "../../../services/company";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineEdit,
} from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { deleteCompany } from "../../../services/company";
import { connect } from "react-redux";
import * as actions from "../../../store/action/index";

function Manage(props) {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const { registerId } = _getSecureLs("Registration");

  const fetchCompanies = async () => {
    try {
      const response = await getAllCompanies();
      setCompanies(response?.result);
    } catch (e) {
      toast.error(e);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  console.log(companies);

  const handledeleteCompany = async (cid) => {
    try {
      const data = await deleteCompany(cid);
      if (!data) {
        const error = new Error("failed to delete company");
        throw error;
      }
      const updatedCompanies = companies?.filter(
        (c) => c._id.toString() !== cid.toString()
      );
      setCompanies(updatedCompanies);
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    }
  };

  // useEffect(() => {
  //   if (queryRegisterId !== registerId) {
  //     navigate(`${ROUTES.COMPANY}/${ROUTES.CREATE_COMPANY}`);
  //   }
  // }, [queryRegisterId, registerId, navigate]);

  const formik = useFormik({
    initialValues: {
      floorName: "",
      bookStatus: "false",
    },
    onSubmit: async (values) => {
      try {
        const data = await handleRegisterCompany(values, registerId);
        if (!data) {
          return;
        }
        console.log(data);
        toast("Company registered successfully");
        navigate(`/${ROUTES.COMPANY}`);
      } catch (e) {
        toast.error(e);
        console.log("error", e);
      }
    },
  });

  const handleEditCompany = (cid, company) => {
    console.log(cid, "edit");
    props.onInitEditing();
    props.onEditing(company);
    navigate(`/${ROUTES.COMPANY}/${ROUTES.CREATE_COMPANY}`);
  };
  console.log(props.isEditing, "redux");

  return (
    <div className="dashboard__manage__company">
      {companies?.length > 0
        ? companies?.map((c) => {
            return (
              <Container fluid className="manage__hotel">
                <Row>
                  <Col>
                    <h6 className="text-center">{c.companyName}</h6>
                    <ListGroup>
                      <ListGroup.Item action variant="light">
                        <AiOutlineUser /> Owner: {c.companyOwner.fname}{" "}
                        {c.companyOwner.lname}
                      </ListGroup.Item>
                      <ListGroup.Item action variant="light">
                        <AiOutlinePhone /> Contact: {c.contactNumber}
                      </ListGroup.Item>
                      <ListGroup.Item action variant="light">
                        <AiOutlineMail /> Email:{" "}
                        <a href={`mailto:${c.workEmail}`}>{c.workEmail}</a>
                      </ListGroup.Item>
                      <ListGroup.Item action variant="light">
                        <MdOutlineLocationOn /> Address: {c.address.street},{" "}
                        {c.address.state}
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                </Row>
                <div className="manage__actions__buttons">
                  <Button
                    variant="danger"
                    onClick={() => handledeleteCompany(c?._id)}
                  >
                    <BsFillTrashFill /> Delete
                  </Button>
                  <Button
                    variant="info"
                    onClick={() => handleEditCompany(c?._id, c)}
                  >
                    <BsPencilSquare /> Edit
                  </Button>
                </div>
              </Container>
            );
          })
        : navigate(`/${ROUTES.COMPANY}`)}

      {/* <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
          <Form.Label>Book Status: </Form.Label>
          <Form.Select
            name="bookStatus"
            value={formik.values.bookStatus}
            onChange={formik.handleChange}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register Now
        </Button>
      </Form> */}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInitEditing: () => dispatch(actions.editCompany()),
    onEditing: (company) => dispatch(actions.selectCompany(company)),
  };
};

export default connect(null, mapDispatchToProps)(Manage);
