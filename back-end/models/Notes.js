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
		currentStatus: {
			type: String,
		},
		statusList: {
			type: Array,
		},
		owner: {
			type: mongoose.Types.ObjectId,
			ref: "ownerId",
			required: [true, "Owner id is required."],
		},
	},
	{ timestamps: true }
);

notesSchema.pre("save", function (next) {
	let lowerStatusList = this.statusList.map((status) => status.toLowerCase());
	// Makes sure the current status is in the user's status list. Case insensitvely
	if (
		this.currentStatus != "" &&
		!lowerStatusList.includes(this.currentStatus.toLowerCase())
	) {
		throw new Error("Invalid note status.");
	}
	next();
});

module.exports = mongoose.model("Notes", notesSchema);
