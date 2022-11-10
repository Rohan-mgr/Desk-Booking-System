import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Avatar from "../../../Components/UI/avatar/avatar";
import { getAllCompanies } from "../../../services/company";
import { _getSecureLs } from "../../../helper/storage";
import { toast } from "react-toastify";

import nameInitials from "name-initials";

export default function DashboardHome() {
  const [currentUser] = useOutletContext();
  const [userMode, setUserMode] = useState("");
  const [totalWorkspace, setTotalWorkspace] = useState(0);
  const [totalFloors, setTotalFloors] = useState(0);

  const fetchCompanies = async () => {
    try {
      const response = await getAllCompanies();
      console.log(response);
      setTotalWorkspace(response?.result.length);
      const total = response?.result
        .map((f) => f.floors.length)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        );
      setTotalFloors(total);
    } catch (e) {
      toast.error(e);
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCompanies();
    const userType = _getSecureLs("auth")?.mode;
    setUserMode(userType);
  }, []);

  return (
    <div>
      <div>
        <div>
          <div>
            Welcome,{" "}
            <div className="d-flex align-items-center">
              <Avatar
                initial={nameInitials(
                  `${currentUser?.fname} ${currentUser?.lname}`
                )}
              />
              <h4 className="ml-2">
                {currentUser?.fname} {currentUser?.lname}!
              </h4>
            </div>
          </div>
          <div className="dashboard-wrapper">
            <div className="info-box">
              <span className="info-box-icon bg-info">
                <i class="fas fa-bookmark"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Total Floors</span>
                <span className="info-box-number">{totalFloors}</span>
              </div>
            </div>
            <div className="info-box ">
              <span className="info-box-icon bg-warning">
                <i class="fas fa-building"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Your workspace</span>
                <span className="info-box-number">{totalWorkspace}</span>
              </div>
            </div>
            <div className="info-box ">
              <span className="info-box-icon bg-success">
                <i className="far fa-envelope"></i>
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Messages</span>
                <span className="info-box-number">1,410</span>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="card">
          <div className="card-header">Notification history</div>
          <div className="card-body">
            <div className="timeline">
              <div className="time-label">
                <span className="bg-green">23 Aug. 2019</span>
              </div>
              <div>
                <i className="fas fa-envelope bg-blue"></i>
                <div className="timeline-item">
                  <span className="time">
                    <i className="fas fa-clock"></i> 12:05
                  </span>
                  <h3 className="timeline-header">
                    <a href="#">Support Team</a> sent you an email
                  </h3>
                  <div className="timeline-body">
                    Etsy doostang zoodles disqus groupon greplin oooj voxy
                    zoodles, weebly ning heekya handango imeem plugg dopplr
                    jibjab, movity
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
