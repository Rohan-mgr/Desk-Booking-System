import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../services/company";
import { ROUTES } from "../../../helper/routes";
import { toast } from "react-toastify";

import nameInitials from "name-initials";
import Avatar from "../../../Components/UI/avatar/avatar";

function Company() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

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

  return (
    <div>
      <div className="content-header d-flex justify-content-between align-items-center">
        <h1 className="m-0">Workspace</h1>
        <Button
          variant="primary"
          className="my-3"
          onClick={() => navigate(ROUTES.CREATE_COMPANY)}
        >
          <i className="fa fa-plus"></i>
          {""} Create your own workspace
        </Button>
      </div>

      <table className="table">
        <thead>
          <th>Workspace Name</th>
          <th>Available Space</th>
          <th>Created by</th>
          <th>Address</th>
        </thead>
        <tbody>
          {companies?.map((company) => (
            <tr>
              <td>{company?.companyName || ""}</td>
              <td>0/5</td>
              <td>
                <Avatar
                  initial={nameInitials(
                    `${company?.companyOwner?.fname} ${company?.companyOwner?.lname}`
                  )}
                  name={`${company?.companyOwner?.fname} ${company?.companyOwner?.lname}`}
                />
              </td>
              <td>{`${company?.address?.street}, ${company?.address?.state}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Company;
