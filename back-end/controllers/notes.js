const { StatusCodes } = require("http-status-codes");
const { notesModel } = require("../models");
const { asyncWrapper } = require("../middlewears");

const getNotes = asyncWrapper(async (req, res) => {
	// Get multiple notes
	const { user: { id: userId }, query: { sort: sort } } = req;
	let userNotes = notesModel.find({ owner: userId });

	if (sort) {
		let sorting = sort.split(",");
		userNotes.sort(sorting.join(" "));
		console.log(sorting.join(" "));
	}
	userNotes = await userNotes;
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
	res.json({ status: "success", data: note }).status(StatusCodes.OK);
});

const editNote = asyncWrapper(async (req, res) => {
	const {
		params: { id: noteId },
		user: { id: userId },
	} = req;
	// Gets the note, and updates it. Makes sure that it's valid, and returns the updated note.
	const note = await notesModel.findOneAndUpdate([{ ownerId: userId, _id: noteId }], req.body, {
		new: true,
		runValidators: true
	});

	if (!note) {
		return res
			.json({ status: "Note note found." })
			.status(StatusCodes.NOT_FOUND);
	}

	res.json({ status: "success", data: note }).status(StatusCodes.OK);
});

const deleteNote = asyncWrapper(async (req, res) => {
	const { params: { id: noteId }, user: { id: userId } } = req;
	const note = await notesModel.findOneAndDelete({ _id: noteId, ownerId: userId });
	if (!note) {
		return res
			.json({ status: "Note note found." })
			.status(StatusCodes.NOT_FOUND);
	}
	// Deletes a note 
	res.json({ status: "success" }).status(StatusCodes.OK);
});

const createNote = asyncWrapper(async (req, res) => {
	// Creates a note
	const newNote = await notesModel.create({ ...req.body, owner: req.user.id }); // Sets the note owner to the current user's id
	res.json({ status: "success", data: newNote }).status(StatusCodes.CREATED);
});

module.exports = { getNotes, getNote, editNote, deleteNote, createNote };
