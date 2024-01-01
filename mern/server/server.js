// load env vars
if (process.env.NODE_ENV != "production") require("dotenv").config();

// import dependencies
const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");
const dbConnection = require("./config/dbconnection");
const noteController = require("./controllers/noteController");
const userController = require("./controllers/userController");
const requireAuth = require("./middleware/requireAuth");

// create express app
const app = express();

// configure express app
app.use(express.json());
app.use(cookie_parser());
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

// connect to db
dbConnection();

// routing

// auth
app.get("/check-auth", requireAuth, userController.checkAuth);

// users
app.post("/signup", userController.signup);
app.post("/login", userController.login);
app.get("/logout", userController.logout);

// notes
app.get("/notes", requireAuth, noteController.fetchNotes);
app.get("/notes/:id", requireAuth, noteController.fetchNote);
app.post("/notes", requireAuth, noteController.createNote);
app.put("/notes/:id", requireAuth, noteController.updateNote);
app.delete("/notes/:id", requireAuth, noteController.deleteNote);

// start server
app.listen(process.env.PORT);
