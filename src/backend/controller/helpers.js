const config = require('../config/config');
const error = require('../config/error');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

module.exports = {
	Permission: config.permissions,
	error,

	checkPermission: (req, permission) => {
		//FIXME: use token
		//return req.session.user.permissions.includes(permission);
		if (req.permissions) {
			if (req.permissions.includes(permission)) {
				return true;
			}
		}
		return false;
	},

	isEmail: (email) => {
		const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return emailReg.test(email);
	},

	removeNil: (obj) => {
		const res = {};
		for (let key in obj) {
			if (obj[key] != null) res[key] = obj[key];
		}
		return res;
	},

	generateToken: (user, expireTime) => {
		let payload = {
			id: user._id,
			username: user.username,
			groupNumber: user.groupNumber,
			permissions: user.permissions,
		};
		return jwt.sign(payload, config.superSecret, {
			expiresIn: expireTime * 60,
		});
	},

	verifyToken: (req, res, next) => {
		var token = req.headers['x-access-token'];
		if (!token) {
			return res.status(403).send({auth: false, message: 'No token provided'});
		}
		jwt.verify(token, config.superSecret, (err, decoded) => {
			if (err) {
				return res
					.status(500)
					.send({auth: false, message: 'Failed to authenticate token.'});
			}
			// if everything good, save to request for use in other routes
			req.userId = decoded.id;
			req.username = decoded.username;
			req.permissions = decoded.permissions;
			req.groupNumber = decoded.groupNumber;
			next();
		});
	},
};
