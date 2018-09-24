const express = require('express');
const workbookController = require('../controller/workbook');
let router = express.Router();

// GET Find a workbook in current group
router.get('/api/workbook/:name', workbookController.get_workbook);

// POST Create workbook
router.post('/api/admin/workbook', workbookController.admin_create_workbook);

// GET Find a filled workbook in current group
router.get('/api/filled-workbook/:name', workbookController.get_filled_workbook);

// POST Create or Update filled workbook
router.post('/api/filled-workbook', workbookController.update_filled_workbook);

// DELETE Delete filled workbook
router.delete('/api/filled-workbook', workbookController.delete_filled_workbook);

// GET Find all unfilled workbooks in current group
router.get('/api/workbooks', workbookController.get_unfilled_workbooks);

// GET Find all filled workbooks in current group for a user
router.get('/api/filled-workbooks', workbookController.get_filled_workbooks);

// GET Find all filled workbooks in current group for a user
router.get('/api/admin/workbooks', workbookController.admin_get_workbooks);

// PUT Edit a workbook
router.put('/api/admin/workbook', workbookController.admin_edit_workbooks);

// DELETE Delete workbook
router.delete('/api/admin/workbook', workbookController.admin_delete_workbook);

// web pages
router.get('/create-workbook', (req, res, next) => {
    res.render('createWorkbookTemplate.ejs', {user: req.session.user});
});

router.get('/fill-workbook/:name', (req, res, next) => {
    res.render('fillWorkbook.ejs', {user: req.session.user, workbook: req.params.name, mode: 'fill'});
});

router.get('/edit-workbook/:name', (req, res, next) => {
    res.render('fillWorkbook.ejs', {user: req.session.user, workbook: req.params.name, mode: 'edit'});
});

// new
router.get('/new/create-workbook-template', (req, res, next) => {
    res.render('new/createWorkbookTemplate.ejs', {
        user: req.session.user, workbook: null, mode: 'create', title: 'Create Workbook Template'
    });
});

router.get('/new/edit-workbook-template/:name', (req, res, next) => {
    res.render('new/createWorkbookTemplate.ejs', {
        user: req.session.user, workbook: req.params.name, mode: 'edit',  title: 'Edit Workbook Template'
    });
});

router.get('/new/manage-workbook-templates', (req, res, next) => {
    res.render('new/manageWorkbookTemplate.ejs', {user: req.session.user});
});

router.get('/new/fill-workbook/:name', (req, res, next) => {
    res.render('new/fillWorkbook.ejs', {user: req.session.user, workbook: req.params.name, mode: 'fill'});
});

router.get('/new/edit-workbook/:name', (req, res, next) => {
    res.render('new/fillWorkbook.ejs', {user: req.session.user, workbook: req.params.name, mode: 'edit'});
});



module.exports = router;
