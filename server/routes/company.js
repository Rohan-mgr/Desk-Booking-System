const express = require("express");
const router = express.Router();
const companyController = require("../controller/company");
const isAuth = require("../middleware/isAuth");

router.get("/registercompany", isAuth, companyController.getCompanies);
router.post("/registercompany", companyController.postCompanyInfo);
router.post("/registercompany/:id", companyController.postCompanyFloorPlan);

module.exports = router;
