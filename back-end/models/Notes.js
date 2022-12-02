const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Note title is required."],
			maxLength: [32, "Title can't be longer than 32 characters."],
		},
		note: {
			type: String,
		},
		folder: {
			type: mongoose.Types.ObjectId,
			ref: "folderId",
		},
		folderName: {
			type: String,
		},
		tags: {
			type: Array
		},
		mode: {
			type: String,
			enum: ["plain", "markdown"],
			required: [true, "Mode is required."],
			default: "plain"
		},
		owner: {
			type: mongoose.Types.ObjectId,
			ref: "ownerId",
			required: [true, "Owner id is required."],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Notes", notesSchema);
