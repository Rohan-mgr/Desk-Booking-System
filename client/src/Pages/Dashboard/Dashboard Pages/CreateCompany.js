import React from "react";
import "./CreateCompany.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateCompany() {
  return (
    <div className="dashboard__create__company">
      <div className="dashboard__create__company__header">
        <h2>Register Your Company</h2>
        <p>
          Please provide the required details to register your company with us
        </p>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>
            Company Name<span>*</span>:{" "}
          </Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Company Owner<span>*</span>:
          </Form.Label>
          <Form.Control type="text" placeholder="First Name" />
          <Form.Control type="text" placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Contact Number<span>*</span>:
          </Form.Label>
          <Form.Control type="number" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Address<span>*</span>:
          </Form.Label>
          <Form.Control type="text" placeholder="Street Address" />
          <Form.Control type="text" placeholder="City" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label></Form.Label>
          <Form.Control type="text" placeholder="State/Province" />
          <Form.Select>
            <option>Select Country</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Work Email<span>*</span>:
          </Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </Form>
    </div>
  );
}

export default CreateCompany;
