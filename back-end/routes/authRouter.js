const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/auth");
const asyncWrapper = require("../middlewears/asyncWrapper");

router.route("/login").post(asyncWrapper(login));
router.route("/register").post(asyncWrapper(register));

module.exports = router;
