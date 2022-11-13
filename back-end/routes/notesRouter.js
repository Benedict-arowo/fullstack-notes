const express = require("express");
const router = express.Router();
const {
	getNotes,
	getNote,
	editNote,
	deleteNote,
	createNote,
} = require("../controllers/notes");

router.route("/notes/").get(getNotes).post(createNote);
router.route("/note/:id").get(getNote).post(editNote).delete(deleteNote);

module.exports = router;
