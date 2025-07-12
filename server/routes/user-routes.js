const express = require("express");
const {
  handleRegister,
  handleLogin,
  handleLogOut,
} = require("../controllers/user-controller");
const { userAuthVerification } = require("../middlewares/auth-middleware");
const UserRouter = express.Router();

UserRouter.post("/register", handleRegister);
UserRouter.post("/login", handleLogin);
UserRouter.post("/auth", userAuthVerification);
UserRouter.post("/logout", handleLogOut);

module.exports = UserRouter;
