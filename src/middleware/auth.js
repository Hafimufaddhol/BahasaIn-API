const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { errorResponse } = require('../utils/responseConsistency'); // Import errorResponse utility

module.exports = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return errorResponse(res, "Token is missing or invalid", "Unauthorized", 401);
    }

    // Ambil token setelah "Bearer "
    const token = bearerToken.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload; // Menyimpan data dari token ke req.user untuk digunakan di rute berikutnya
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, "Token has expired", "Unauthorized", 401);
    } else if (error.name === "JsonWebTokenError") {
      return errorResponse(res, "Token is invalid", "Unauthorized", 401);
    }
    return errorResponse(res, "Internal server error", "Error", 500);
  }
};
