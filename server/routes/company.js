const express = require("express");
const router = express.Router();
const companyController = require("../controller/company");
const isAuth = require("../middleware/isAuth");

router.get("/manage/addroom/:cId", isAuth, companyController.getCompanyFloors);
router.get("/manage/adddesk/:fId", isAuth, companyController.getFloorRooms);
router.get("/registercompany/:mode", isAuth, companyController.getCompanies);
router.get("/company/companyinfo/:cid", isAuth, companyController.getCompany);

router.post("/manage/addroom/:cId", isAuth, companyController.postCompanyRooms);
router.post("/registercompany", isAuth, companyController.postCompanyInfo);
router.post("/manage/addfloor/:cid", isAuth, companyController.postAddFloor);
router.post("/manage/adddesk/:cId", isAuth, companyController.postAddDesk);
router.post("/bookdesk", isAuth, companyController.postDeskBooking);
router.post("/bookroom", isAuth, companyController.postRoomBooking);
router.post("/canceldesk", isAuth, companyController.postDeskBookingCancel);
router.post("/cancelroom", isAuth, companyController.postRoomBookingCancel);

router.put("/edit/:cid", isAuth, companyController.updateCompany);
// router.post("/registercompany/:id", companyController.postCompanyFloorPlan);
router.delete("/deletecompany/:cid", isAuth, companyController.deleteCompany);

module.exports = router;
