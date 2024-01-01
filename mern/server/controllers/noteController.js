const Note = require("../models/note");
7;
const fetchNotes = async (req, res) => {
	try {
		// find the notes
		const notes = await Note.find({ user: req.user._id });

		// respond with notes list
		res.json({ notes });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const fetchNote = async (req, res) => {
	try {
		// get id off url
		const noteId = req.params.id;

		// find note with id
		const note = await Note.findOne({ _id: noteId, user: req.user._id });

		// respond with note
		res.json({ note });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const createNote = async (req, res) => {
	try {
		// get the sent-in data off req body
		const { title, body } = req.body;

		// create note with it
		const note = await Note.create({
			title,
			body,
			user: req.user._id,
		});

		// respond with the new note
		res.json({ note });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};
const updateNote = async (req, res) => {
	try {
		// get data off req
		const noteId = req.params.id;
		const { title, body } = req.body;

		// update note by id
		await Note.findOneAndUpdate(
			{ _id: noteId, user: req.user._id },
			{
				title,
				body,
			}
		);

		// find updated note
		const note = await Note.findById(noteId);

		// respond with update note
		res.json({ note });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const deleteNote = async (req, res) => {
	try {
		// get data off url
		const noteId = req.params.id;

		// find and delete note
		const note = await Note.deleteOne({ _id: noteId, user: req.user._id });

		// respond with deleted note
		res.json({ note });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

module.exports = {
	fetchNotes,
	fetchNote,
	createNote,
	updateNote,
	deleteNote,
};
