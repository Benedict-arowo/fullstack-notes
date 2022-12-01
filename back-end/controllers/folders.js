const { asyncWrapper } = require("../middlewears");
const Folders = require("../models/Folders");
const { StatusCodes } = require("http-status-codes");

const getFolders = asyncWrapper(async (req, res) => {
	const { query: {query}, user: {id: ownerId} } = req;
	const data = Folders.find({ownerId});

	if (query) {
		const pattern = new RegExp(`.*${query}.*`, "i");
		data.find({ name: pattern });
	}

	const result = await data;
	res.json(result).status(StatusCodes.OK);
});

const newFolder = asyncWrapper(async (req, res) => {
	const { user: {id: ownerId}, body: {name, color} } = req;
	console.log(ownerId, color, name);
	
	if (!name || !color) {
		throw new Error("Invalid request");
	}

	const newFolder = await Folders.create({name, color, ownerId});

	res.json({msg: "success", data: newFolder}).status(StatusCodes.OK);
});

const getFolder = asyncWrapper(async (req, res) => {
	res.send("Get Folder");
});



module.exports = { getFolders, newFolder, getFolder };