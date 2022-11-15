import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import {
  getCompanyFloors,
  getFloorRooms,
  getCompany,
} from "../../../services/company";
import { toast } from "react-toastify";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { isEmptyArray } from "formik";
import { MdKeyboardBackspace } from "react-icons/md";
import Loader from "../../../Components/UI/Loader/Loader";

function CompanyInfo() {
  const navigate = useNavigate();
  const [isFetchingCompanyInfo, setIsFetchingCompanyInfo] = useState(true);
  const [isFetchingFloors, setIsFetchingFloors] = useState(true);
  const { cid } = useParams();
  const [workspace, setWorkspace] = useState({
    company: null,
    floors: [],
    rooms: [],
    desks: 0,
    floorId: null,
  });
  const [currentFloor, setCurrentFloor] = useState({});

  const fetchCompany = async () => {
    setIsFetchingCompanyInfo(true);
    try {
      const response = await getCompany(cid);
      setWorkspace((prevState) => {
        return {
          ...prevState,
          company: response?.result,
        };
      });
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    } finally {
      setIsFetchingCompanyInfo(false);
    }
  };

  const fetchCompanyFloors = async () => {
    setIsFetchingFloors(true);
    try {
      const response = await getCompanyFloors(cid);
      setWorkspace((prevState) => {
        return {
          ...prevState,
          floors: response?.results,
        };
      });
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    } finally {
      setIsFetchingFloors(false);
    }
  };
  useEffect(() => {
    fetchCompany();
    fetchCompanyFloors();
  }, []);

  const handleChange = async (e) => {
    setWorkspace((prevState) => {
      return {
        ...prevState,
        floorId: e.target.value,
      };
    });
    try {
      const response = await getFloorRooms(e.target.value);
      setWorkspace((prevState) => {
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

  /**
   * Render the details of the company
   * P.S, it is the place where booking is placed
   * @returns
   */
  const renderCompanyDetails = () => {
    return (
      <Container fluid>
        <Row className="mb-3">
          <Col>
            <div
              className="company-info-title"
              onClick={() => navigate("/company")}
            >
              <MdKeyboardBackspace />
              <span>{workspace?.company?.companyName || "-"}</span>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <Row>
              <Col md={3}>
                <div className="mb-2">Floors </div>
                <div className="info-sidebar-wrapper">
                  {!isFetchingFloors &&
                    workspace?.floors?.map((item) => {
                      return (
                        <div
                          className={classNames("floor-sidebar", {
                            "floor-sidebar--active":
                              item?._id === currentFloor?._id,
                          })}
                          role={"button"}
                          onClick={() => {
                            setCurrentFloor(item);
                          }}
                        >
                          Floor {item.floorNumber}
                        </div>
                      );
                    })}
                  {!isFetchingFloors && isEmptyArray(workspace?.floors) && (
                    <div className="d-flex justify-content-center mt-3">
                      No floors available
                    </div>
                  )}

                  {isFetchingFloors && (
                    <div className="d-flex justify-content-center mt-3">
                      <Spinner animation="border" />;
                    </div>
                  )}
                </div>
              </Col>
              {console.log("current floor info>>", currentFloor)}

              <Col>
                <div className="contain-wrapper">
                  {currentFloor?._id ? (
                    <div className="floor-viewer-container">
                      {currentFloor?.rooms?.map((room) => {
                        return (
                          <div className="room-container">
                            <div className="mb-2">Room : {room?.roomNo}</div>
                            <div className="desk-container">
                              {room?.desks?.map((desk) => {
                                return (
                                  <div
                                    className={classNames("desk", {
                                      "desk-active": desk?.deskNo,
                                      "desk-inactive": !desk?.deskNo,
                                    })}
                                  >
                                    {desk?.deskNo}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="empty-wrapper">
                      Click any floor to view the rooms
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };

  /**
   * Todo:: Remove this once properly tested
   * This is not in use anymore
   * @returns
   */
  const renderOlderView = () => {
    return (
      <Container fluid>
        <Row>
          <Col className="text-center col-12 my-3">
            <div className="text-left d-flex justify-content-between">
              <p
                style={{ width: "fit-content", cursor: "pointer" }}
                onClick={() => navigate("/company")}
              >
                <BsArrowLeft /> Back
              </p>
              <Button variant="primary">Book Now</Button>
            </div>
            <h4>{workspace.company?.companyName}</h4>
            <p>
              <span style={{ marginRight: ".3rem" }}>Created on:</span>
              {new Date(workspace.company?.createdAt).toLocaleDateString(
                "en-US"
              )}
            </p>
          </Col>
          <Col className="col-lg-6 col-md-6 col-12">
            <p>
              Owner: {workspace.company?.companyOwner?.fname}{" "}
              {workspace.company?.companyOwner?.lname}
            </p>
            <p>
              Contant Number:{" "}
              <strong>{workspace.company?.contactNumber}</strong>
            </p>
            <p>
              Address: {workspace.company?.address?.street},{" "}
              {workspace.company?.address?.state}
            </p>
            <p>State: {workspace.company?.address?.state}</p>
            <p>Country: {workspace.company?.address?.country}</p>
          </Col>
          <Col className="col-lg-6 col-md-6 col-12">
            <p>
              E-mail:{" "}
              <a href={`mailto:${workspace.company?.workEmail}`}>
                {workspace.company?.workEmail}
              </a>
            </p>
            <p>
              Floors:{" "}
              <Form.Select
                className="w-75"
                //   value={workspace.floorId}
                onChange={(e) => handleChange(e)}
              >
                <option>All Floors</option>
                {workspace.floors?.map((f) => {
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
                {workspace.rooms?.map((r) => {
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
                {workspace.rooms[0]?.desks.map((d) => {
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
            <p>Total Floor: {workspace.floors.length}</p>
            <p>
              Total Rooms:{" "}
              {workspace.floors
                .map((f) => f.rooms.length)
                .reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                )}
            </p>
            <p>
              Total Desks:{" "}
              {workspace.floors
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
  };

  return renderCompanyDetails();
}

export default CompanyInfo;
