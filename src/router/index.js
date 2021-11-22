const express = require("express");
const route = express.Router();
const {
  user,
  update,
  createdAccount,
  accountVerified,
  signInUser,
} = require("../controller");
const { signupValidator, getUser } = require("../middleware");

route.post("/api/user", signupValidator, user);
route.post("/api/sigin", getUser, signInUser);
route.put("/verify", update);
route.post("/created-ccount", createdAccount);
route.put("/verify-account", accountVerified);

module.exports = route;
