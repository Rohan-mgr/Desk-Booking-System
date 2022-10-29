const express = require("express");
const router = express.Router();
const companyController = require("../controller/company");

router.get("/registercompany", companyController.getCompanies);
router.post("/registercompany", companyController.postCompanyInfo);
router.post("/registercompany/:id", companyController.postCompanyFloorPlan);

module.exports = router;
