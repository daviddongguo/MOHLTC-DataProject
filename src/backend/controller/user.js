const User = require('../models/user');
const Organization = require('../models/organization');
const RegisterRequest = require('../models/registerRequest');
const passport = require('passport');
const config = require('../config/config'); // get our config file
const sendMail = require('./sendmail');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const passwordValidator = require('password-validator');

var schema = new passwordValidator();
const {generateToken} = require('./helpers');

schema
	.is()
	.min(8) // Minimum length 8
	.is()
	.max(100) // Maximum length 100
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.digits() // Must have digits
	.has()
	.not()
	.spaces() // Should not have spaces
	.is()
	.not()
	.oneOf(['Passw0rd', 'Password123']);

// helper functions
function isEmail(email) {
	const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	return emailReg.test(email);
}

const getUser = (username, cb) => {
	User.findOne({username: username}, (err, user) => {
		if (err) {
			return cb(err);
		}
		return cb(err, user);
	});
};

const getUserById = async (userId) => {
	return await User.findById(userId, {password: 0});
};

module.exports = {
	get_user: (req, res) => {
		const username = req.params.username;
		getUser(username, (err, user) => {
			if (user) {
				return res.status(200).json({success: true, user});
			}
			return res.status(404).json();
		});
	},
	get_user_all: async (req, res) => {
		try {
			usersList = await User.find();
			return res.status(200).json({success: true, data: usersList});
		} catch (error) {
			return res.status(404).json();
		}
	},

	user_sign_up_local: (req, res, next) => {
		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				return res.status(500).json({success: false, message: err});
			}
			if (user) {
				return res
					.status(404)
					.json({success: false, message: 'Username taken.'});
			}
			User.findOne({email: req.body.email}, (err, user) => {
				if (err) {
					console.log(err);
					return res.status(500).json({success: false, message: err});
				}
				if (user) {
					return res
						.status(404)
						.json({success: false, message: 'Email taken.'});
				}
				if (!isEmail(req.body.email)) {
					return res
						.status(404)
						.json({success: false, message: 'Email format error.'});
				}
				// all good
				let newUser = new User({
					username: req.body.username,
					firstName: req.body.firstName || '',
					lastName: req.body.lastName || '',
					groupNumber: req.body.groupNumber || 1,
					phoneNumber: req.body.phoneNumber || '',
					organization: req.body.organization || '',
					validated: req.body.validated || false,
					type: 2, // system admin=0, form manager=1, user=2
					email: req.body.email,
				});
				User.register(newUser, req.body.password, (err, user) => {
					if (err) {
						console.log(err);
						return res.status(500).json({success: false, message: err});
					}
					console.log('success sign up');
					// sign in right after
					passport.authenticate('local')(req, res, () => {

						return res.status(201).json({
							success: true,
							user: user,
							accessToken: generateToken(user, 24 * 60),
							redirect: '/profile',
						});
					});
				});
			});
		});
	},

	check_email: (req, res) => {
		const email = req.params.email;
		User.findOne({email: email}, (err, user) => {
			if (user) {
				return res.json({message: email + ' already in use.'});
			}
			return res.json();
		});
	},

	check_username: (req, res) => {
		const username = req.params.username;
		getUser(username, (err, user) => {
			if (user) {
				return res.json({message: username + ' already in use.'});
			}
			return res.json();
		});
	},

	get_profile: async (req, res) => {
		console.log('inside: get_profile method');
		console.log(req.userId);
		try {
			const user = await getUserById(req.userId);
			if (user) {
				return res.status(200).json({success: true, profile: user});
			}
			return res.status(404).json({success: false, message: 'no user found.'});
		} catch (error) {
			return res.status(500).json({success: false, message: 'no user login.'});
		}
	},
	// Query the current user logged in.
	get_current_logged_in_user: (req, res) => {
		if (!req.session.user) {
			return res.json({success: true, user: null});
		}
		const username = req.session.user.username;
		getUser(username, (err, user) => {
			if (err) {
				return res.status(500).json({success: false, user: null, message: err});
			}
			if (user) {
				return res.json({success: true, user: user});
			} else {
				return res.json({success: true, user: null});
			}
		});
	},

	check_user_active: (req, res) => {
		if (
			!req.session.user.permissions.includes(config.permissions.USER_MANAGEMENT)
		) {
			return res
				.status(403)
				.json({success: false, message: error.api.NO_PERMISSION});
		}

		const checkingUsername = req.params.username;
		User.findOne({username: checkingUsername}, (err, dbUser) => {
			if (err) {
				console.log(err);
				return res.status(500).json({success: false, message: err});
			}

			if (dbUser) {
				const messageStr = dbUser.username + ' now is ' + dbUser.active;
				return res.json({
					success: true,
					message: messageStr,
				});
			} else {
				return res.status(400).json({
					success: false,
					message: checkingUsername + ' does not exist.',
				});
			}
		});
	},

	edit_user_active: (req, res) => {
		if (
			!req.session.user.permissions.includes(config.permissions.USER_MANAGEMENT)
		) {
			return res
				.status(403)
				.json({success: false, message: error.api.NO_PERMISSION});
		}
		if (req.params.username === req.session.user.username) {
			return res.status(400).json({
				success: false,
				message: 'Can not set the active value by yourself',
			});
		}
		const updatingUsername = req.params.username;
		const updatingActive = req.body.active;
		User.findOne({username: updatingUsername}, (err, dbUser) => {
			if (err) {
				console.log(err);
				return res.status(500).json({success: false, message: err});
			}

			if (dbUser) {
				dbUser.active = updatingActive;
				dbUser.save((err, updatedUser) => {
					if (err) {
						return res.status(500).json({success: false, message: err});
					}
					return res.json({
						success: true,
						message: updatedUser.username + ' now is ' + updatedUser.active,
					});
				});
			} else {
				return res.status(400).json({
					success: false,
					message: updatingUsername + ' does not exist.',
				});
			}
		});
	},

	edit_validated: async (req, res, next) => {
		if (!req.permissions.includes(config.permissions.USER_MANAGEMENT)) {
			return res
				.status(403)
				.json({success: false, message: error.api.NO_PERMISSION});
		}
		if (!req.params.username && req.body.validated) {
			return res.status(400).json({
				success: false,
				message: 'user name and validated value can not be empty!',
			});
		}
		if (req.params.username === req.session.user.username) {
			return res.status(400).json({
				success: false,
				message: 'Can not set the active value by yourself',
			});
		}
		try {
			const filter = {
				username: req.params.username,
				groupNumber: req.session.user.groupNumber,
			};
			const update = {validated: req.body.validated};
			const result = await User.findOneAndUpdate(filter, update, {
				new: true,
			});
			return res
				.status(200)
				.json({success: true, message: 'updated!', user: result});
		} catch (e) {
			next(e);
		}
	},

	change_password: (req, res, next) => {
		var oldPassword = req.body.oldPassword;
		var newPassword = req.body.newPassword;
		var confirmPassword = req.body.confirmPassword;
		var username = req.session.user.username;
		if (confirmPassword !== newPassword) {
			return res
				.status(400)
				.json({success: false, message: 'New Password does not match!'});
		}
		User.findOne({username: username}, (err, user) => {
			if (err) {
				return res.status(400).json({success: false, message: err});
			}
			user.changePassword(oldPassword, newPassword, (err) => {
				if (err) {
					return res
						.status(400)
						.json({success: false, message: 'Wrong Old Password!'});
				}
				req.logIn(user, function (err) {
					if (err) {
						return next(err);
					}
					// set user info in the session
					req.session.user = user;
				});
				return res.json({
					success: true,
					message: 'The password has been changed',
				});
			});
		});
	},

	update_user_info: (req, res, next) => {
		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				console.log(err);
				return res.json({success: false, message: err});
			}
			if (user) {
				if (user._id === req.session.user._id) {
					user.username = req.body.username;
					user.firstName = req.body.firstName;
					user.lastName = req.body.lastName;
					user.email = req.body.email;
					user.phoneNumber = req.body.phoneNumber;
					user.save((err, user2) => {
						if (err) {
							console.log(err);
							return res.status(400).json({success: false, message: err});
						}
						req.login(user2, function (err) {
							if (err) {
								console.log(err);
								return res.json({success: false, message: err});
							}
							req.session.user = user2;
						});
						return res.json({success: true, message: 'Profile is updated!'});
					});
				} else {
					return res.json({success: false, message: 'Username has existed!'});
				}
			} else {
				User.findOne({_id: req.session.user._id}, (err, user) => {
					if (err) {
						console.log(err);
						return res.json({success: false, message: err});
					}
					user.username = req.body.username;
					user.firstName = req.body.firstName;
					user.lastName = req.body.lastName;
					user.email = req.body.email;
					user.phoneNumber = req.body.phoneNumber;
					user.save((err, user2) => {
						if (err) {
							console.log(err);
							return res.status(400).json({success: false, message: err});
						}
						req.login(user2, function (err) {
							if (err) {
								console.log(err);
								return res.json({success: false, message: err});
							}
							req.session.user = user2;
						});
						return res.json({success: true, message: 'Profile is updated!'});
					});
				});
			}
		});
	},

	logout: (req) => {
		req.logout();
		// clear user info in the session
		req.session.user = {};
	},

	getOrganizationDetails: (req, res, next) => {
		Organization.find({}, (err, organizations) => {
			if (err) {
				console.log(err);
				return res.json({success: false, message: err});
			}
			return res.json({success: true, organizations: organizations});
		});
	},

	//TODO: delete
	user_sign_up: (req, res, next) => {
		// check if email is taken (passport will check other errors, i.e. username taken)
		User.findOne({username: req.body.username}, (err, user) => {
			if (err) {
				console.log(err);
				return res.json({success: false, message: err});
			}
			if (user) {
				return res
					.status(400)
					.json({success: false, message: 'Username taken.'});
			}
			User.findOne({email: req.body.email}, (err, user) => {
				if (err) {
					console.log(err);
					return res.json({success: false, message: err});
				}

				if (user) {
					return res
						.status(400)
						.json({success: false, message: 'Email taken.'});
				}
				if (!isEmail(req.body.email)) {
					return res
						.status(400)
						.json({success: false, message: 'Email format error.'});
				}
				if (!schema.validate(req.body.password)) {
					return res
						.status(400)
						.json({success: false, message: 'Password is not valid.'});
				}
				console.log(req.body.phoneNumber);
				let groupNumber = config.organizations[req.body.organization];
				let newRequest = new RegisterRequest({
					username: req.body.username,
					password: req.body.password,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					groupNumber: groupNumber || 1,
					phoneNumber: req.body.phoneNumber,
					organization: req.body.organization,
					email: req.body.email,
					role: req.body.role,
				});
				newRequest.save((err, user) => {
					if (err) {
						console.log(err);
						return res.json({success: false, message: err});
					}
					console.log('success submit request');
					sendMail.sendRegisterSubmitEmail(
						req.body.email,
						req.body.username,
						(info) => {
							return res.json({
								success: true,
								redirect: '/register-success-submit',
							});
						}
					);
				});
			});
		});
	},

	user_log_in: (req, res, next) => {
		console.log('log in');
		passport.authenticate('local', function (err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.status(401).json({success: false, message: info.message});
			}

			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}

				// req.session.user = user;
				// console.log(user);
				let redirectUrl = '/profile';
				return res.status(200).json({
					success: true,
					user: user,
					accessToken: generateToken(user, 24 * 60),
					redirect: redirectUrl,
				});
			});
		})(req, res, next);

		//res.json({success: true, username: req.username})
	},

	user_log_out: (req, res) => {
		console.log('logout');
		req.logout();
		// clear user info in the session
		// req.session.user = {};
		// Delete token
		return res.json({success: true});
	},

	user_reset_password: (req, res, next) => {
		var username = req.body.username;
		var email = req.body.email;
		User.findOne({username: username}, (err, user) => {
			if (err) {
				return res.status(400).json({success: false, message: err});
			} else if (user) {
				if (user.email == email) {
					return res.json({
						success: true,
						message:
							'An email has been sent to your email, please reset your password in email!',
					});
				} else {
					return res.json({
						success: false,
						message: 'Email address does not match!',
					});
				}
			} else {
				return res.json({success: false, message: 'Username does not exist!'});
			}
		});
	},

	// user_send_reset_email: (req, res, next) => {
	// 	console.log(req.body);
	// 	const token = generateToken(req.body.username, 60);
	// 	sendMail.sendResetEmail(req.body.email, token, (info) => {
	// 		return res.json({success: true, message: info});
	// 	});
	// },

	// user_send_validation_email: (req, res, next) => {
	// 	// create token and sent by email
	// 	const token = generateToken(req.session.user.username, 60);
	// 	sendMail.sendValidationEmail(req.session.user.email, token, (info) => {
	// 		return res.json({success: true, message: info});
	// 	});
	// },

	reset_password_link: (req, res, next) => {
		var newPassword = req.body.newPassword;
		var confirmPassword = req.body.confirmPassword;
		var username = req.session.user.username;
		if (confirmPassword !== newPassword) {
			return res
				.status(400)
				.json({success: false, message: 'New Password does not match!'});
		}
		User.findOne({username: username}, (err, user) => {
			if (err) {
				return res.status(400).json({success: false, message: err});
			}
			user.setPassword(newPassword, (err) => {
				if (err) {
					console.log(err);
					return res.status(400).json({success: false, message: err});
				}
				user.save(function (err) {
					if (err) {
						return res.status(400).json({success: false, message: err});
					}
					req.session.user = user;
				});

				console.log(req.session);
				return res.json({
					success: true,
					message: 'The password has been changed',
				});
			});
		});
	},

	password_reset_validate: (req, res, next) => {
		jwt.verify(req.params.token, config.superSecret, function (err, decoded) {
			if (err) {
				return res.json({
					success: false,
					message: 'Failed to authenticate token.',
				});
			} else {
				User.findOne({username: decoded.username}, (err, user) => {
					console.log(user);
					if (err) {
						console.log(err);
						return next(err);
					} else {
						req.session.user = user;
						return res.redirect('/reset-password-link');
					}
				});
			}
		});
	},

	user_validate: (req, res, next) => {
		jwt.verify(req.params.token, config.superSecret, function (err, decoded) {
			if (err) {
				return res.json({
					success: false,
					message: 'Failed to authenticate token.',
				});
			} else {
				User.findOne({username: decoded.username}, (err, user) => {
					if (err) {
						console.log(err);
						return next(err);
					} else {
						user.validated = true;
						user.save((err, updatedUser) => {
							if (err) {
								console.log(err);
								return next(err);
							}
							// good
							return res.redirect('/login');
						});
					}
				});
			}
		});
	},
};
