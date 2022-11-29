const express = require("express");
const { getFolders, newFolder } = require("../controllers/folders");
const router = express.Router();

router.route("/").get(getFolders).post(newFolder);


module.exports = router;