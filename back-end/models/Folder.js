const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	items: {
		type: Array,
	},
	ownerId: {
		type: mongoose.Types.ObjectId,
		required: true
	},
	color: {
		type: String,
	}
});

module.exports = mongoose.model("Folders", FolderSchema);
