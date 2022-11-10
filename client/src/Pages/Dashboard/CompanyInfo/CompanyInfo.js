import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCompanyFloors, getFloorRooms } from "../../../services/company";
import { toast } from "react-toastify";

function CompanyInfo(props) {
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  console.log(props.selectedCompany);

  const fetchCompanyFloors = async () => {
    try {
      const response = await getCompanyFloors(props.selectedCompany?._id);
      setFloors(response?.results);
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    }
  };
  useEffect(() => {
    fetchCompanyFloors();
  }, []);
  console.log(floors);

  return (
    <Container fluid>
      <Row>
        <Col className="text-center col-12 my-3">
          <h4>{props.selectedCompany?.companyName}</h4>
          <p>
            <span style={{ marginRight: ".3rem" }}>Created on:</span>
            {new Date(props.selectedCompany?.createdAt).toLocaleDateString(
              "en-US"
            )}
          </p>
        </Col>
        <Col className="col-lg-6 col-md-6 col-12">
          <p>
            Owner: {props.selectedCompany?.companyOwner?.fname}{" "}
            {props.selectedCompany?.companyOwner?.lname}
          </p>
          <p>
            Contant Number:{" "}
            <strong>{props.selectedCompany?.contactNumber}</strong>
          </p>
          <p>
            Address: {props.selectedCompany?.address?.street},{" "}
            {props.selectedCompany?.address?.state}
          </p>
          <p>State: {props.selectedCompany?.address?.state}</p>
          <p>Country: {props.selectedCompany?.address?.country}</p>
        </Col>
        <Col className="col-lg-6 col-md-6 col-12">
          <p>
            E-mail:{" "}
            <a href={`mailto:${props.selectedCompany?.workEmail}`}>
              {props.selectedCompany?.workEmail}
            </a>
          </p>
          <p>
            Floors:{" "}
            <Form.Select className="w-75 ">
              <option>All Floors</option>
              {floors?.map((f) => {
                return <option key={f?._id}>Floor {f.floorName}</option>;
              })}
            </Form.Select>
          </p>
          <p>
            Rooms:{" "}
            <Form.Select className="w-75">
              <option>Room 1</option>
              <option>Room 2</option>
              <option>Room 3</option>
              <option>Room 4</option>
            </Form.Select>
          </p>
          <p>
            Desks:{" "}
            <Form.Select className="w-75">
              <option>Desk 1</option>
              <option>Desk 2</option>
              <option>Desk 3</option>
              <option>Desk 4</option>
            </Form.Select>
          </p>
        </Col>
        <Col className="my-3 col-12 d-flex justify-content-between flex-column flex-lg-row flex-md-row">
          <p>Total Floor: 10</p>
          <p>Total Rooms: 10</p>
          <p>Total Desks: 10</p>
        </Col>
        <Col className="col-12 text-center">
          <Button variant="primary">Manage</Button>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedCompany: state.selectedCompany,
  };
};

export default connect(mapStateToProps)(CompanyInfo);
