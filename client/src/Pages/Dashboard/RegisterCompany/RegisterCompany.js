import React, { useEffect, useState } from "react";
import "./RegisterCompany.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { _getSecureLs } from "../../../helper/storage";
import { ROUTES } from "../../../helper/routes";
import { useFormik } from "formik";
import { handleRegisterCompany } from "../../../services/auth";
import { toast } from "react-toastify";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

function RegisterCompany() {
  const navigate = useNavigate();
  // const [fields, setFields] = useState([]);
  const queryRegisterId = useParams().registerId;
  const { registerId } = _getSecureLs("Registration");

  useEffect(() => {
    if (queryRegisterId !== registerId) {
      navigate(`${ROUTES.COMPANY}/${ROUTES.CREATE_COMPANY}`);
    }
  }, [queryRegisterId, registerId, navigate]);

  const formik = useFormik({
    initialValues: {
      floorName: "",
      bookStatus: "false",
    },
    onSubmit: async (values) => {
      try {
        const data = await handleRegisterCompany(values, registerId);
        if (!data) {
          return;
        }
        console.log(data);
        toast("Company registered successfully");
        navigate(`/${ROUTES.COMPANY}`);
      } catch (e) {
        toast.error(e);
        console.log("error", e);
      }
    },
  });
  // console.log(fields);

  // const handleAddFieldClick = () => {
  //   const ifiedls = [...fields];
  //   ifiedls.push(
  //     <Form.Control
  //       type="text"
  //       name="floorName"
  //       value={formik.values.floorName}
  //       onChange={formik.handleChange}
  //     />
  //   );
  //   setFields(ifiedls);
  // };
  // const handleSubFieldClick = () => {
  //   const ifiedls = [...fields];
  //   ifiedls.pop();
  //   setFields(ifiedls);
  // };

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
            Floor Name<span>*</span>:{" "}
          </Form.Label>
          <Form.Control
            type="text"
            name="floorName"
            value={formik.values.floorName}
            onChange={formik.handleChange}
          />

          {/* <AiFillPlusCircle onClick={handleAddFieldClick} /> */}
        </Form.Group>
        {/* {fields.length > 0 &&
          fields.map((i, index) => {
            console.log(i, index);
            return (
              <Form.Group className="mb-3 addfield">
                <Form.Control
                  type="text"
                  name={index}
                  value={formik.values.index}
                  onChange={formik.handleChange}
                />
                <AiFillMinusCircle onClick={handleSubFieldClick} />
              </Form.Group>
            );
          })} */}

        {/* <Form.Group className="mb-3">
          <Form.Label>
            Number Of Employees<span>*</span>:
          </Form.Label>
          <Form.Control
            type="number"
            name="totalEmployees"
            value={formik.values.totalEmployees}
            onChange={formik.handleChange}
          />
        </Form.Group> */}
        <Form.Group className="mb-3">
          <Form.Label>Book Status: </Form.Label>
          <Form.Select
            name="bookStatus"
            value={formik.values.bookStatus}
            onChange={formik.handleChange}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </Form.Select>
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Label>
            Number Of Rooms<span>*</span>:
          </Form.Label>
          <Form.Control
            type="number"
            name="totalRooms"
            value={formik.values.totalRooms}
            onChange={formik.handleChange}
          />
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Register Now
        </Button>
      </Form>
    </div>
  );
}

export default RegisterCompany;
