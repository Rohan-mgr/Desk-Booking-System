import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../services/company";
import { ROUTES } from "../../../helper/routes";

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
      <h3>Workspaces </h3>
      <table className="table">
        <thead>
          <th>Name</th>
        </thead>
        <tbody>
          {companies?.map((company) => (
            <tr>
              <td>{company?.companyName || ""}</td>
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
