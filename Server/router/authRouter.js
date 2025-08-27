const express = require("express");
const authRouter = express.Router();
const {
  RegisterUser,
  LoginUser,
  LogoutUser,
  getProfile,
} = require("../controllers/authController");

authRouter.post("/register", RegisterUser);
authRouter.post("/login", LoginUser);
authRouter.post("/logout", LogoutUser);
authRouter.get("/profile", getProfile);

module.exports = authRouter;
