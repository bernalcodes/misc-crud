// load env vars
if (process.env.NODE_ENV != "production") require("dotenv").config();

// import dependencies
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/dbconnection");
const noteController = require("./controllers/noteController");

// create express app
const app = express();

// configure express app
app.use(express.json());
app.use(cors());

// connect to db
dbConnection();

// routing
app.get("/notes", noteController.fetchNotes);

app.get("/notes/:id", noteController.fetchNote);

app.post("/notes", noteController.createNote);

app.put("/notes/:id", noteController.updateNote);

app.delete("/notes/:id", noteController.deleteNote);

// start server
app.listen(process.env.PORT);
