// load env vars
if (process.env.NODE_ENV != "production") require("dotenv").config();

// import dependencies
const express = require("express");
const dbConnection = require("./config/dbconnection");
const Note = require("./models/note");

// create express app
const app = express();

// configure express app
app.use(express.json());

// connect to db
dbConnection();

// routing
app.get("/", (req, res) => {
	res.json({ hello: "world" });
});

app.get("/notes", async (req, res) => {
	// find the notes
	const notes = await Note.find();

	// respond with notes list
	res.json({ notes: notes });
});

app.get("/notes/:id", async (req, res) => {
	// get id off url
	const noteId = req.params.id;

	// find note with id
	const note = await Note.findById(noteId);

	// respond with note
	res.json({ note: note });
});

app.post("/notes", async (req, res) => {
	// get the sent-in data off req body
	const title = req.body.title;
	const body = req.body.body;

	// create note with it
	const note = await Note.create({
		title: title,
		body: body,
	});

	// respond with the new note
	res.json({ note: note });
});

app.put("/notes/:id", async (req, res) => {
	// get data off req
	const noteId = req.params.id;
	const title = req.body.title;
	const body = req.body.body;
	
	// update note by id
	const note = await Note.findByIdAndUpdate(noteId, {
		title: title,
		body: body
	});

	// respond with update note
	res.json({ note: note });
});

// start server
app.listen(process.env.PORT);
