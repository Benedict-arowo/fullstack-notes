const { StatusCodes } = require("http-status-codes");
const { notesModel } = require("../models");
const { asyncWrapper } = require("../middlewears");

const getNotes = asyncWrapper(async (req, res) => {
	// Get multiple notes
	const { id } = req.user;
	const userNotes = await notesModel.find({ owner: id });
	res.json({ count: userNotes.length, data: userNotes }).status(StatusCodes.OK);
});

const getNote = asyncWrapper(async (req, res) => {
	const {
		params: { id: noteId },
		user: { id: userId },
	} = req;
	const note = await notesModel.findOne({ ownerId: userId, _id: noteId });
	if (!note) {
		return res
			.json({ status: "Note note found." })
			.status(StatusCodes.NOT_FOUND);
	}
	res.json({ status: "success", data: note });
});

const editNote = (req, res) => {
	// Edits a note
	res.json({ page: "editNote" });
};

const deleteNote = (req, res) => {
	// Deletes a note
	res.json({ page: "deleteNote" });
};

const createNote = asyncWrapper(async (req, res) => {
	// Creates a note
	const newNote = await notesModel.create({ ...req.body, owner: req.user.id }); // Sets the note owner to the current user's id
	res.json({ status: "success", data: newNote }).status(StatusCodes.OK);
});

module.exports = { getNotes, getNote, editNote, deleteNote, createNote };
