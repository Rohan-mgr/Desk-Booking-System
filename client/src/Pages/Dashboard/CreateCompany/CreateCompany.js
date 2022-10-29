import React, { useState, useEffect } from "react";
import "./CreateCompany.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { handleCreateCompany } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../helper/routes";
import { _setSecureLs } from "../../../helper/storage";
import { toast } from "react-toastify";

function CreateCompany() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (res.status !== 200) {
          const err = new Error("Cannot fetch the country");
          throw err;
        }
        return res.json();
      })
      .then((resData) => {
        const countryNames = resData?.map((n) => n.name.common).sort();
        setCountries(countryNames);
      })
      .catch((err) => {
        throw new Error(err);
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      companyName: "",
      ownerFirstName: "",
      ownerLastName: "",
      contactNumber: "",
      street: "",
      city: "",
      state: "",
      country: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const data = await handleCreateCompany(values);
        if (!data) {
          return;
        }
        console.log(data);
        _setSecureLs("Registration", {
          registerId: data.registerId,
        });
        navigate(
          `${ROUTES.DASHBOARD}/${ROUTES.CREATE_COMPANY}/${data?.registerId}`
        );
      } catch (e) {
        // toast.error(e);
        console.log("error", e);
      }
    },
  });

  return (
    <div className="dashboard__create__company">
      <div className="dashboard__create__company__header">
        <h2>Register Your Company</h2>
        <p>
          Please provide the required details to register your company with us
        </p>
      </div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            Company Name<span>*</span>:{" "}
          </Form.Label>
          <Form.Control
            type="text"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Company Owner<span>*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            name="ownerFirstName"
            value={formik.values.ownerFirstName}
            onChange={formik.handleChange}
            placeholder="First Name"
          />
          <Form.Control
            type="text"
            name="ownerLastName"
            value={formik.values.ownerLastName}
            onChange={formik.handleChange}
            placeholder="Last Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Contact Number<span>*</span>:
          </Form.Label>
          <Form.Control
            type="number"
            name="contactNumber"
            value={formik.values.contactNumber}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Address<span>*</span>:
          </Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange}
            placeholder="Street Address"
          />
          <Form.Control
            type="text"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            placeholder="City"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label></Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange}
            placeholder="State/Province"
          />
          <Form.Select
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
          >
            <option>Select Country</option>
            {countries?.map((name) => {
              return (
                <option key={name} value={name}>
                  {name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Work Email<span>*</span>:
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Continue Registration
        </Button>
      </Form>
    </div>
  );
}

export default CreateCompany;
