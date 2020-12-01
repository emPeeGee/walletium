const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();
const userController = require("./user.controller");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/data", auth, userController.defineDummyData);

module.exports = router;
