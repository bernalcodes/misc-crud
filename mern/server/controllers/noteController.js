const Note = require("../models/note");
7;
const fetchNotes = async (req, res) => {
	// find the notes
	const notes = await Note.find();

	// respond with notes list
	res.json({ notes });
};

const fetchNote = async (req, res) => {
	// get id off url
	const noteId = req.params.id;

	// find note with id
	const note = await Note.findById(noteId);

	// respond with note
	res.json({ note });
};

const createNote = async (req, res) => {
	// get the sent-in data off req body
	const { title, body } = req.body;

	// create note with it
	const note = await Note.create({
		title,
		body,
	});

	// respond with the new note
	res.json({ note });
};
const updateNote = async (req, res) => {
	// get data off req
	const noteId = req.params.id;
	const { title, body } = req.body;

	// update note by id
	await Note.findByIdAndUpdate(noteId, {
		title,
		body,
	});

	// find updated note
	const note = await Note.findById(noteId);

	// respond with update note
	res.json({ note });
};

const deleteNote = async (req, res) => {
	// get data off url
	const noteId = req.params.id;

	// find and delete note
	const note = await Note.findByIdAndDelete(noteId);

	// respond with deleted note
	res.json({ note });
};

module.exports = {
	fetchNotes,
	fetchNote,
	createNote,
	updateNote,
	deleteNote
};
