import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../services/company";
import { ROUTES } from "../../../helper/routes";

import nameInitials from "name-initials";

function Company() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const response = await getAllCompanies();
      setCompanies(response?.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div>
      <div className="content-header">
        <h1 className="m-0">Workspace</h1>
      </div>

      <table className="table">
        <thead>
          <th>Workspace Name</th>
          <th>Created by</th>
        </thead>
        <tbody>
          {companies?.map((company) => (
            <tr>
              <td>{company?.companyName || ""}</td>
              <td>
                {nameInitials(
                  `${company?.companyOwner?.fname} ${company?.companyOwner?.lname}`
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        variant="primary"
        className="my-3"
        onClick={() => navigate(ROUTES.CREATE_COMPANY)}
      >
        <i className="fa fa-plus"></i>
        {""} Create your own workspace
      </Button>
    </div>
  );
}

export default Company;
