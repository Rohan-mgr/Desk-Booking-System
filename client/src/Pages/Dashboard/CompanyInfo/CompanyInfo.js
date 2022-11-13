import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getCompanyFloors, getFloorRooms } from "../../../services/company";
import { toast } from "react-toastify";

function CompanyInfo(props) {
  const [floorsInfo, setFloorsInfo] = useState({
    floors: [],
    rooms: [],
    desks: 0,
    floorId: null,
  });
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  console.log(props.selectedCompany);

  const fetchCompanyFloors = async () => {
    try {
      const response = await getCompanyFloors(props.selectedCompany?._id);
      setFloors(response?.results);
      setFloorsInfo((prevState) => {
        return {
          ...prevState,
          floors: response?.results,
        };
      });
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    }
  };
  useEffect(() => {
    fetchCompanyFloors();
  }, []);
  console.log(floors);

  const handleChange = async (e) => {
    setFloorsInfo((prevState) => {
      return {
        ...prevState,
        floorId: e.target.value,
      };
    });
    try {
      const response = await getFloorRooms(e.target.value);
      //   setRooms(response?.results);
      setFloorsInfo((prevState) => {
        return {
          ...prevState,
          rooms: response?.results,
        };
      });
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    }
  };
  console.log(floorsInfo.floorId);

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
            <Form.Select
              className="w-75"
              //   value={floorsInfo.floorId}
              onChange={(e) => handleChange(e)}
            >
              <option>All Floors</option>
              {floorsInfo.floors?.map((f) => {
                return (
                  <option key={f?._id} value={f._id}>
                    Floor {f.floorNumber}
                  </option>
                );
              })}
            </Form.Select>
          </p>
          <p>
            Rooms:{" "}
            <Form.Select className="w-75">
              <option>All Rooms</option>
              {floorsInfo.rooms?.map((r) => {
                return (
                  <option key={r?._id} value={r._id}>
                    Room {r.roomNo}
                  </option>
                );
              })}
            </Form.Select>
          </p>
          <p>
            Desks:{" "}
            <Form.Select className="w-75">
              <option>All Desks</option>
              {floorsInfo.rooms[0]?.desks.map((d) => {
                return (
                  <option key={d?._id} value={d._id}>
                    Desk {d.deskNo}
                  </option>
                );
              })}
            </Form.Select>
          </p>
        </Col>
        <Col className="my-3 col-12 d-flex justify-content-between flex-column flex-lg-row flex-md-row">
          <p>Total Floor: {floorsInfo.floors.length}</p>
          <p>
            Total Rooms:{" "}
            {floorsInfo.floors
              .map((f) => f.rooms.length)
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
              )}
          </p>
          <p>
            Total Desks:{" "}
            {floorsInfo.floors
              .map((f) =>
                f.rooms
                  .map((d) => d.desks.length)
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue,
                    0
                  )
              )
              .reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
              )}
          </p>
        </Col>
        {/* <Col className="col-12 text-center">
          <Button variant="primary">Manage</Button>
        </Col> */}
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
