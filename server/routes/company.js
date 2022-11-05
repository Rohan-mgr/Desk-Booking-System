const express = require("express");
const router = express.Router();
const companyController = require("../controller/company");
const isAuth = require("../middleware/isAuth");

router.get("/registercompany/:mode", isAuth, companyController.getCompanies);
router.post("/registercompany", isAuth, companyController.postCompanyInfo);
router.put("/edit/:cid", isAuth, companyController.updateCompany);
// router.post("/registercompany/:id", companyController.postCompanyFloorPlan);
router.delete("/deletecompany/:cid", isAuth, companyController.deleteCompany);

module.exports = router;
