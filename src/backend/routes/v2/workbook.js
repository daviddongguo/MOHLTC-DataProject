const express = require('express');
const router = express.Router();
const {workbookController} = require('../../controller/v2');
const {
	saveWorkbookAdmin,
	adminGetAllWorkbooks,
	adminDeleteWorkbook,
	adminGetWorkbook,
} = workbookController;

const {verifyToken} = require('../../controller/helpers');

router.get('/api/v2/admin/workbook/:name', adminGetWorkbook);

router.post('/api/v2/admin/workbook', saveWorkbookAdmin);

router.get('/api/v2/admin/workbooks', verifyToken, adminGetAllWorkbooks);

router.delete('/api/v2/admin/workbooks/:name', adminDeleteWorkbook);

module.exports = router;
