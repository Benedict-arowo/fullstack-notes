const { asyncWrapper } = require("../middlewears");
const Folders = require("../models/Folders");

const getFolders = asyncWrapper(async (req, res) => {
	const data = await Folders.find({});
	res.json(data);
});

const newFolder = asyncWrapper(async (req, res) => {
	res.send("Post Folder");
});

const getFolder = asyncWrapper(async (req, res) => {
	res.send("Get Folder");
});



module.exports = { getFolders, newFolder, getFolder };