const express = require('express');
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const config = require('../config/config');
const user_controller = require('../controller/user');
const registration_local_controller = require('../controller/registration/local');
const registration_ldap_controller = require('../controller/registration/ldap');
const {groupController} = require('../controller/v2');
let router = express.Router();

passport.use(new LdapStrategy(config.OPTS));

// used in register page
router.get('/api/v2/groups', groupController.getGroups);
// router.get('/api/v2/organizations', groupController.getOrganizations);


const Organization = require('../models/organization/organization');
router.get('/api/v2/organizations', async (req, res, next) => {
    try {
        const organizations = await Organization.find();
        if (organizations[0]) {
            return res.status(200).json({organizations});
        }
        return res.status(204).json();
    } catch (e) {
        next(e);
    }
});
router.get('/api/check/email/:email', user_controller.check_email);
router.get('/api/check/username/:username', user_controller.check_username);

// POST request for user sign up locally
router.post('/api/signup/local', registration_local_controller.user_sign_up_local);


router.post('/api/v2/groups', groupController.createGroup);


// Query the current user logged in.
router.get('/api/users/current', user_controller.get_current_logged_in_user);

router.get('/api/isloggedin', function (req, res) {
    if (req.isAuthenticated()) {
        return res.json({isLoggedIn: true})
    }
    return res.json({isLoggedIn: false})
});

router.get('/api/organization_details', user_controller.getOrganizationDetails);

// POST request for user sign up from ldap server
router.post('/api/signup', registration_ldap_controller.user_ldap_signup);


// POST request for user sign in
router.post('/api/login/local', user_controller.user_log_in);

router.post('/api/login/ldap', registration_ldap_controller.user_auth_login);

router.post('/api/reset-password', user_controller.user_reset_password);

router.post('/api/send-reset-email', user_controller.user_send_reset_email);

router.get('/reset/:token', user_controller.password_reset_validate);

router.post('/api/reset-password-link', user_controller.reset_password_link);

// validate account from email link
router.get('/validate/:token', user_controller.user_validate);

// check authentication middleware
router.use((req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(403).json({
            loginRequired: true,
            success: false,
            message: "Sorry, you don't have the permission."
        })
    } else {
        next();
    }
});

// Update a user's status. Used to disable or enable an account.
router.get('/api/users/:username/active', user_controller.check_user_active);
// Update a user's status. Used to disable or enable an account.
router.put('/api/users/:username/active', user_controller.edit_user_active);

router.put('/api/users/active/:username', user_controller.edit_user_active);
router.put('/api/users/validated/:username', user_controller.edit_user_validated);
router.put('/api/users/organization/:username', user_controller.edit_user_organization);

// GET log out current account
router.get('/api/logout', user_controller.user_log_out);

// GET send account verification email
router.get('/api/send-validation-email', user_controller.user_send_validation_email);

router.get('/api/profile', user_controller.get_profile);

// update profile
router.post('/api/update-profile', user_controller.update_user_info);

// change password
router.post('/api/change-password', user_controller.change_password);


module.exports = router;
