import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../services/company";
import { ROUTES } from "../../../helper/routes";
import { toast } from "react-toastify";
import Modal from "../../../Components/UI/Modal/Modal";

import nameInitials from "name-initials";
import Avatar from "../../../Components/UI/avatar/avatar";
import { _getSecureLs } from "../../../helper/storage";

function Company() {
  const navigate = useNavigate();
  const [userMode, setUserMode] = useState("");
  const [companies, setCompanies] = useState([]);
  const [show, setShow] = useState(false);

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
    const userType = _getSecureLs("auth")?.mode;
    setUserMode(userType);
  }, []);

  const closeModal = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="content-header d-flex justify-content-between align-items-center">
        <h1 className="m-0">Workspace</h1>
        {userMode === "company" && (
          <Button
            variant="primary"
            className="my-3"
            onClick={() => navigate(ROUTES.CREATE_COMPANY)}
          >
            <i className="fa fa-plus"></i>
            {""} Create your own workspace
          </Button>
        )}
      </div>

      <table className="table">
        <thead>
          <th>Workspace Name</th>
          {/* <th>Available Space</th> */}
          <th>Created by</th>
          <th>Created on</th>
          <th>Address</th>
          {/* {userMode === "company" && <th>Actions</th>} */}
        </thead>
        <tbody>
          {companies?.map((company) => (
            <tr>
              <td onClick={() => setShow(true)}>
                {company?.companyName || ""}
              </td>
              {/* <td>0/5</td> */}
              <td>
                <Avatar
                  initial={nameInitials(
                    `${company?.companyOwner?.fname} ${company?.companyOwner?.lname}`
                  )}
                  name={`${company?.companyOwner?.fname} ${company?.companyOwner?.lname}`}
                />
              </td>
              <td>
                {new Date(company?.createdAt).toLocaleDateString("en-US")}
              </td>
              <td>{`${company?.address?.street}, ${company?.address?.state}`}</td>
              {/* {userMode === "company" && (
                <>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handledeleteCompany(company?._id)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                  </td>
                </>
              )} */}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal Show={show} handleClose={closeModal} Companies={companies} />
    </div>
  );
}

export default Company;
