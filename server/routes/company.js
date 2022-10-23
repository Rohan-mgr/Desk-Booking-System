const express = require("express");
const router = express.Router();
const companyController = require("../controller/company");

router.post("/registercompany", companyController.postCompanyInfo);

module.exports = router;
