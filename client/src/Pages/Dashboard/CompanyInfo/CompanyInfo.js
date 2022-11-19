import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import BookingModal from "../../../Components/UI/Modal/BookModal/BookModal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ROUTES } from "../../../helper/routes";
import { useParams } from "react-router-dom";
import {
  getCompanyFloors,
  getCompany,
  bookDesk,
  bookRoom,
  cancelDesk,
  cancelRoom,
} from "../../../services/company";
import { toast } from "react-toastify";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { isEmptyArray } from "formik";
import { MdKeyboardBackspace } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { _getSecureLs } from "../../../helper/storage";
import ReactTooltip from "react-tooltip";

function CompanyInfo() {
  const navigate = useNavigate();
  const userMode = _getSecureLs("auth")?.mode;
  const [showModal, setShowModal] = useState(false);
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
  console.log(userMode);
  const [currentFloor, setCurrentFloor] = useState({});

  const closeModal = () => {
    setShowModal(false);
  };

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

  const handleDeskBooking = async (dId, rId, fId, cid) => {
    setShowModal(true);
    try {
      const response = await bookDesk(dId, rId, fId, cid);
      if (!response) {
        const error = new Error("failed to book the desk");
        throw error;
      }
      console.log(response);
      window.location.href = `/${ROUTES.COMPANY}/${ROUTES.COMPANY_INFO}/${cid}`;
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    }
  };
  const handleRoomBooking = async (rId, fId, cid) => {
    try {
      const response = await bookRoom(rId, fId, cid);
      if (!response) {
        const error = new Error("failed to book the room");
        throw error;
      }
      console.log(response);
      window.location.href = `/${ROUTES.COMPANY}/${ROUTES.COMPANY_INFO}/${cid}`;
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    }
  };

  const handleDeskBookCancel = async (dId, rId, fId, userMode) => {
    console.log("cancel");
    try {
      const response = await cancelDesk(dId, rId, fId, userMode);
      if (!response) {
        const error = new Error("failed to cancel the booking");
        throw error;
      }
      console.log(response);
      window.location.href = `/${ROUTES.COMPANY}/${ROUTES.COMPANY_INFO}/${cid}`;
    } catch (e) {
      toast.error(e);
      throw new Error(e);
    }
  };
  const handleRoomBookCancel = async (rId, fId, userMode) => {
    console.log("cancel");
    try {
      const response = await cancelRoom(rId, fId, userMode);
      if (!response) {
        const error = new Error("failed to cancel the booking");
        throw error;
      }
      console.log(response);
      window.location.href = `/${ROUTES.COMPANY}/${ROUTES.COMPANY_INFO}/${cid}`;
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
                      <Spinner animation="border" />
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
                        console.log(room.bookStatus, "stat");
                        return (
                          <div
                            className="room-container"
                            style={{
                              backgroundColor:
                                room?.bookStatus ||
                                (room.desks.filter((d) => d.bookStatus === true)
                                  .length > 0 &&
                                  room.desks.filter(
                                    (d) => d.bookStatus === false
                                  ).length === 0)
                                  ? "#e56161"
                                  : "#d7e3ed",
                            }}
                          >
                            <div className="mb-2 d-flex align-items-center justify-content-between">
                              <p>Room : {room?.roomNo}</p>
                              <p
                                data-background-color={
                                  !room?.bookStatus ? "#273053" : "red"
                                }
                                data-tip={
                                  userMode === "user"
                                    ? !room?.bookStatus
                                      ? `click to book room ${room.roomNo}`
                                      : "click to cancel booking"
                                    : null
                                }
                              >
                                <>
                                  <SlCalender
                                    onClick={() =>
                                      !room?.bookStatus
                                        ? handleRoomBooking(
                                            room?._id,
                                            currentFloor?._id,
                                            cid
                                          )
                                        : handleRoomBookCancel(
                                            room?._id,
                                            currentFloor?._id,
                                            userMode
                                          )
                                    }
                                    style={{
                                      color: "green",
                                      cursor: "pointer",
                                    }}
                                  />
                                  <ReactTooltip />
                                </>
                              </p>
                            </div>
                            <div className="desk-container">
                              {room?.desks?.map((desk) => {
                                return (
                                  <div
                                    key={desk._id}
                                    data-background-color={
                                      !desk?.bookStatus ? "#273053" : "red"
                                    }
                                    data-tip={
                                      userMode === "user"
                                        ? !desk?.bookStatus
                                          ? `click to book desk ${desk.deskNo}`
                                          : "click to cancel booking"
                                        : null
                                    }
                                    onClick={() =>
                                      !desk?.bookStatus
                                        ? handleDeskBooking(
                                            desk?._id,
                                            room?._id,
                                            currentFloor?._id,
                                            cid
                                          )
                                        : handleDeskBookCancel(
                                            desk?._id,
                                            room?._id,
                                            currentFloor?._id,
                                            userMode
                                          )
                                    }
                                    className={classNames("desk", {
                                      "desk-active": !desk?.bookStatus,
                                      "desk-inactive": desk?.bookStatus,
                                    })}
                                  >
                                    <ReactTooltip />
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
        {/* <BookingModal Show={showModal} handleClose={closeModal} /> */}
      </Container>
    );
  };

  /**
   * Todo:: Remove this once properly tested
   * This is not in use anymore
   * @returns
   */

  return renderCompanyDetails();
}

export default CompanyInfo;
