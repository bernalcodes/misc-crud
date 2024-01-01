const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
	try {
		// get email and password off req body
		const { email, password } = req.body;

		// hash pwd
		const hashedPwd = bcrypt.hashSync(password, 8);

		// create user with data
		const newUser = await User.create({ email, password: hashedPwd });

		// respond
		res.json({
			code: 200,
			user: newUser,
		});
	} catch (error) {
		console.log(error);
		res.json({ code: 500, error });
	}
}

async function login(req, res) {
	try {
		// get email and pwd off rq body
		const { email, password } = req.body;

		// find user
		const user = await User.findOne({ email });
		if (!user) return res.sendStatus(404);

		// compare sent pwd with hashed pwd
		if (!bcrypt.compareSync(password, user.password))
			return res.sendStatus(401);

		// create jwt
		const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
		const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

		// set cookie
		res.cookie("Authorization", token, {
			expires: new Date(exp),
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
		});

		// respond
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

function logout(req, res) {
	res.clearCookie("Authorization");
	res.sendStatus(200);
}

function checkAuth(req, res) {
	console.log(req.user);
	res.sendStatus(200);
}

module.exports = {
	signup: signup,
	login: login,
	logout: logout,
	checkAuth: checkAuth,
};
