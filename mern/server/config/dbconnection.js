// load env vars
if (process.env.NODE_ENV != "production") require("dotenv").config();

const mongoose = require("mongoose");

async function dbConnection() {
	try {
		console.log("attempting db connection");
		await mongoose.connect(process.env.DB_URL);
		console.log("connected to db");
	} catch (error) {
		console.log(`ERROR: ${error}`);
	}
}

module.exports = dbConnection;
