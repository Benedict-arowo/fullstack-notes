const getNotes = (req, res) => {
	// Get multiple notes
	res.json({ page: "getNotes" });
};

const getNote = (req, res) => {
	// Get a single note
	res.json({ page: "getNote" });
};

const editNote = (req, res) => {
	// Edits a note
	res.json({ page: "editNote" });
};

const deleteNote = (req, res) => {
	// Deletes a note
	res.json({ page: "delteNote" });
};

const createNote = (req, res) => {
	// Creates a note
	res.json({ page: "createNote" });
};

module.exports = { getNotes, getNote, editNote, deleteNote, createNote };
