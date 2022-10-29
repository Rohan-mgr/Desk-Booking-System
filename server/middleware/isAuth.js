require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let decodedToken;
  try {
    const authHeader = req.get("Authorization");
    // console.log(authHeader);
    if (!authHeader) {
      const error = new Error("Not Authenticated!");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    console.log(token);
    decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    console.log(decodedToken, "decoded");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
  if (!decodedToken) {
    const error = new Error("Not Authenticated!");
    error.statusCode = 401;
    throw error;
  }
  // console.log(decodedToken.userId);
  req.userId = decodedToken?.userId;
  next();
};
