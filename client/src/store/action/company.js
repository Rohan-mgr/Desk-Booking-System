import * as actionTypes from "./actionTypes";

export const editCompany = () => {
  return {
    type: actionTypes.INIT_EDIT_COMPANY,
  };
};
export const selectCompany = (company) => {
  return {
    type: actionTypes.INIT_SELECT_COMPANY,
    selectedCompany: company,
  };
};
