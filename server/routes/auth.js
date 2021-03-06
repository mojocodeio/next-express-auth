const express = require('express');
const jwt = require('jsonwebtoken');
const users = require('../db/users');

const router = express.Router();

router.post('/login', (req, res) => {
	const { email } = req.body;
	const matchedUser = users.find((user) => user.email === email);

	if (!matchedUser) {
		res.status(500).send({
			message: 'Incorrect Email or Password. Please Try Again.',
		});
	} else {
		const accessToken = jwt.sign({ email: matchedUser.email }, process.env.ACCESS_TOKEN_SECRET);
		res.cookie('accessToken', accessToken, {
			httpOnly: false,
			secure: process.env.NODE_ENV === 'production',
		});
		res.send({ user: matchedUser });
	}
});

module.exports = router;
