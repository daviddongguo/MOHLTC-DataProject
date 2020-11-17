const express = require('express');
let router = express.Router();
var bodyParser = require('body-parser');

const user_controller = require('../controller/user');
const {verifyToken} = require('../controller/helpers');
const {groupController} = require('../controller/v2');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/api/signup/local', user_controller.user_sign_up_local);
router.post('/api/login/local', user_controller.user_log_in);
router.get('/api/profile', verifyToken, user_controller.get_profile);

router.get('/api/users', user_controller.get_user_all);
router.get('/api/users/current', user_controller.get_current_logged_in_user);
// router.get('/api/logout', user_controller.user_log_out);
router.get('/api/isloggedin', user_controller.verifyToken, function (req, res) {
	const userId = req.userId;
	console.log('inside isloggedin: ' + userId);
	if (userId) {
		return res.status(200).json({isLoggedIn: true});
	}
	return res.status(404).json({isLoggedIn: false});
});

router.get('/api/users/:username', user_controller.get_user);
router.get('/api/check/email/:email', user_controller.check_email);
router.get('/api/check/username/:username', user_controller.check_username);

// registrations related
router.get('/api/v2/groups', groupController.getGroups);
router.post('/api/v2/groups', groupController.createGroup);
router.get('/api/v2/groups/:number', groupController.getOrganizationsInGroup);

// Query the current user logged in.
//router.get('/api/getuserbyusername/:username', user_controller.get_user);

router.get('/api/organization_details', user_controller.getOrganizationDetails);

router.post('/api/reset-password', user_controller.user_reset_password);

// router.post('/api/send-reset-email', user_controller.user_send_reset_email);

// router.get('/reset/:token', user_controller.password_reset_validate);

router.post('/api/reset-password-link', user_controller.reset_password_link);

// validate account from email link
router.get('/validate/:token', user_controller.user_validate);

// check authentication middleware
// router.use((req, res, next) => {
// 	if (!req.isAuthenticated()) {
// 		return res.status(403).json({
// 			loginRequired: true,
// 			success: false,
// 			message: "Inside User Routes: Sorry, you don't have the permission.",
// 		});
// 	} else {
// 		next();
// 	}
// });

// Update a user's status. Used to disable or enable an account.
router.get('/api/users/:username/active', user_controller.check_user_active);
// Update a user's status. Used to disable or enable an account.
router.put('/api/users/:username/active', user_controller.edit_user_active);
router.put('/api/users/active/:username', user_controller.edit_user_active);

router.put(
	'/api/users/validated/:username',
	verifyToken,
	user_controller.edit_validated
);

// GET send account verification email
// router.get(
// 	'/api/send-validation-email',
// 	user_controller.user_send_validation_email
// );

// update profile
router.post('/api/update-profile', user_controller.update_user_info);

// change password
router.post('/api/change-password', user_controller.change_password);

module.exports = router;
