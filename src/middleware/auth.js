const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const bearerToken = req.headers.authorization;

    if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "failed",
        message: "Token is missing or invalid",
        isSuccess: false,
        data: null,
      });
    }

    // Ambil token setelah "Bearer "
    const token = bearerToken.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload; // Menyimpan data dari token ke req.user untuk digunakan di rute berikutnya
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "failed",
        message: "Token has expired",
        isSuccess: false,
        data: null,
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "failed",
        message: "Token is invalid",
        isSuccess: false,
        data: null,
      });
    }
    return res.status(500).json({
      status: "failed",
      message: "Internal server error",
      isSuccess: false,
      data: null,
    });
  }
};
