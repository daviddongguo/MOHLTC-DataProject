const express = require('express');
const user_management_controller = require('../controller/userManagement');
let router = express.Router();
const {verifyToken} = require('../controller/helpers');

const User = require('../models/user');

router.post(
	'/api/user/permission',
	verifyToken,
	user_management_controller.admin_update_user_permission
);

router.get(
	'/api/user/details',
	verifyToken,
	user_management_controller.admin_get_all_users_with_details
);

router.get(
	'/api/user/registerInfo',
	user_management_controller.user_register_details
);

router.get(
	'/api/permissions',
	verifyToken,
	user_management_controller.admin_get_all_permissions
);

router.post(
	'/api/user/register_management',
	user_management_controller.register_management
);

module.exports = router;
