import React, { useState, useEffect } from "react";

import { MdDelete, MdMoreVert } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { getAllCompanies } from "../../../services/company";
import { ROUTES } from "../../../helper/routes";
import { toast } from "react-toastify";

import nameInitials from "name-initials";
import Avatar from "../../../Components/UI/avatar/avatar";
import { _getSecureLs } from "../../../helper/storage";
import * as actions from "../../../store/action/index";
import { connect } from "react-redux";
import {
  CustomMenu,
  CustomToggle,
} from "../../../Components/UI/Dropdown/DropdownMenu";

function Company(props) {
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

  console.log(companies);

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
          <th>S.N</th>
          <th>Workspace</th>
          {/* <th>Available Space</th> */}
          <th>Created by</th>
          <th>Created on</th>
          <th>Address</th>
          {/* {userMode === "company" && <th>Actions</th>} */}
        </thead>
        <tbody>
          {companies?.map((company, _idx) => (
            <tr key={company._id}>
              <td>{_idx + 1}</td>
              <td>{company?.companyName || ""}</td>
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

              <td>
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    <MdMoreVert />
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item
                      as="button"
                      eventKey="1"
                      onClick={() => {
                        props.onSelectCompany(company);
                        navigate(`${ROUTES.COMPANY_INFO}`);
                      }}
                    >
                      View Details
                    </Dropdown.Item>
                    <Dropdown.Item as="button" eventKey="2">
                      Manage Floor
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="button" eventKey="3">
                      <div className="d-flex align-items-center">
                        <MdDelete className="mr-2" /> Delete
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectCompany: (company) => dispatch(actions.selectCompany(company)),
  };
};

export default connect(null, mapDispatchToProps)(Company);
