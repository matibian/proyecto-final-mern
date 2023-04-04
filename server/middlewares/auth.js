const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/mongoModels/usersModel");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("users", UserModel);

const auth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).send("Error");
    }
    if (!token) {
      res.status(401).send("Error");
    }
  }
};

module.exports = { auth };
