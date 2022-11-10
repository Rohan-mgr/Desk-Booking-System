import React, { useEffect, useState } from "react";
import "./Manage.css";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { _getSecureLs, _setSecureLs } from "../../../helper/storage";
import { ROUTES } from "../../../helper/routes";
// import { useFormik } from "formik";
// import { handleRegisterCompany } from "../../../services/auth";
import { toast } from "react-toastify";
import { getAllCompanies } from "../../../services/company";
import ListGroup from "react-bootstrap/ListGroup";
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineMail, AiOutlineUser, AiOutlinePhone } from "react-icons/ai";
import { MdOutlineLocationOn, MdMeetingRoom } from "react-icons/md";
import { GiDesk } from "react-icons/gi";
import { deleteCompany } from "../../../services/company";
import { connect } from "react-redux";
import * as actions from "../../../store/action/index";
import Modal from "../../../Components/UI/Modal/AddFloor/AddModal";
import RoomModal from "../../../Components/UI/Modal/AddRoom/AddRoom";
import DeskModal from "../../../Components/UI/Modal/AddDesk/AddDesk";

function Manage(props) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [modal, setModal] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompanies();
        setCompanies(response?.result);
      } catch (e) {
        toast.error(e);
        console.log(e);
      }
    };
    fetchCompanies();
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

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

  // const formik = useFormik({
  //   initialValues: {
  //     floorName: "",
  //     bookStatus: "false",
  //   },
  //   onSubmit: async (values) => {
  //     try {
  //       const data = await handleRegisterCompany(values, registerId);
  //       if (!data) {
  //         return;
  //       }
  //       console.log(data);
  //       toast("Company registered successfully");
  //       navigate(`/${ROUTES.COMPANY}`);
  //     } catch (e) {
  //       toast.error(e);
  //       console.log("error", e);
  //     }
  //   },
  // });

  const handleEditCompany = (cid, company) => {
    props.onInitEditing();
    props.onEditing(company);
    navigate(`/${ROUTES.COMPANY}/${ROUTES.CREATE_COMPANY}`);
  };
  const handleAddFloor = (company) => {
    props.onEditing(company);
    setModal("floorModal");
    setShowModal(true);
  };
  const handleAddRoom = (company) => {
    props.onEditing(company);
    setModal("roomModal");
    setShowModal(true);
  };
  const handleAddDesk = (company) => {
    props.onEditing(company);
    setModal("deskModal");
    setShowModal(true);
  };

  return (
    <div className="dashboard__manage__company">
      {companies?.length > 0
        ? companies?.map((c) => {
            return (
              <Container key={c?._id} fluid className="manage__hotel">
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
                  <div>
                    <Button variant="success" onClick={() => handleAddFloor(c)}>
                      <SiGoogleclassroom /> Add Floor
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        handleAddRoom(c);
                      }}
                    >
                      <MdMeetingRoom /> Add Room
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        handleAddDesk(c);
                      }}
                    >
                      <GiDesk /> Add Desk
                    </Button>
                  </div>
                  <div>
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
                </div>
                {modal === "floorModal" ? (
                  <Modal
                    Show={showModal}
                    handleClose={closeModal}
                    companyId={c?._id}
                  />
                ) : modal === "roomModal" ? (
                  <RoomModal
                    Show={showModal}
                    handleClose={closeModal}
                    companyId={c?._id}
                  />
                ) : (
                  <DeskModal
                    Show={showModal}
                    handleClose={closeModal}
                    companyId={c?._id}
                  />
                )}
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
