const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { body } = require("express-validator");

router.post(
  "/signup",
  // [
  //   body("fname")
  //     .trim()
  //     .not()
  //     .isEmpty()
  //     .matches(/^(?![\s.]+$)[a-zA-Z\s.]{2,}$/, "g"),
  //   body("lname")
  //     .trim()
  //     .not()
  //     .isEmpty()
  //     .matches(/^(?![\s.]+$)[a-zA-Z\s.]{2,}$/, "g"),
  //   body("email")
  //     .trim()
  //     .not()
  //     .isEmpty()
  //     .isEmail()
  //     .withMessage("Please Enter a valid email."),
  //   body("password")
  //     .trim()
  //     .not()
  //     .isEmpty()
  //     .matches(
  //       /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-_=?])[a-zA-Z0-9!@#$%^&*-_=?]{8,}/,
  //       "g"
  //     )
  //     .isLength({ min: 8 }),
  // ],
  userController.createUser
);
router.post("/login", userController.postLogin);

module.exports = router;
