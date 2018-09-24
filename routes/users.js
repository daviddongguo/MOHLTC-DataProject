const express = require('express');
const passport = require('passport');
const user_controller = require('../controller/user');
const jwt = require("jsonwebtoken");
let router = express.Router();


// =====================================
// LOGIN =============================
// =====================================
router.get('/login', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    res.render('login.ejs');
});

router.get('/signup', function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/profile');
    }
    res.render('signup.ejs');
});


// POST request for user sign up
router.post('/api/signup', user_controller.user_sign_up);

router.post('/api/login', user_controller.user_log_in);

// validate account
router.get('/validate/:token', user_controller.user_validate);

// check authentication middleware
router.use((req, res, next) => {

    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    else {
        console.log('Authenticated');
        next();
    }
});


router.get('/send-validation-email', user_controller.user_send_validation_email);

router.get('/validate-now', function (req, res) {
    if (req.session.user.validated) {
        return res.redirect('/login');
    }
    res.render('tobevalidated.ejs', {user: req.session.user});
});

// check account validation middleware
router.use((req, res, next) => {

    if (!req.session.user.validated) {
        return res.redirect('/validate-now');
    }
    next();
});

router.get('/api/logout', user_controller.user_log_out);

router.get('/add-att-cat', (req, res, next) => {
    res.render('addAttCat.ejs', {user: req.session.user});
});

router.get('/delete-att-cat', (req, res, next) => {
    res.render('deleteAttCat.ejs', {user: req.session.user});
});


// add attribute ang category
router.post('/api/add-att', user_controller.user_add_att);

router.post('/api/add-cat', user_controller.user_add_cat);

router.delete('/api/delete-cat', user_controller.user_delete_cat);

router.delete('/api/delete-att', user_controller.user_delete_att);

router.get('/api/attributes', user_controller.get_attributes);

router.get('/api/categories', user_controller.get_categories);


router.get('/profile', function (req, res) {
    res.render('profile.ejs', {user: req.session.user});
});


module.exports = router;
