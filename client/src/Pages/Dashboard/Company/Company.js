import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Company() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3080/registercompany")
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
        setCompanies(resData?.result);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  return (
    <div>
      <h1>List of Companies: </h1>
      {companies?.length > 0 ? (
        <ListGroup as="ol" numbered>
          {companies.map((c) => {
            return (
              <ListGroup.Item
                key={c._id}
                action
                variant="primary"
                className="my-1"
              >
                {c.companyName}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <h5>No any companies is created yet. Create one now !</h5>
      )}
      <Button
        variant="primary"
        className="my-3"
        onClick={() => navigate("/dashboard/registercompany")}
      >
        Create Company
      </Button>
    </div>
  );
}

export default Company;
