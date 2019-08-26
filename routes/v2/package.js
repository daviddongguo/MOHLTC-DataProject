const express = require('express');
const router = express.Router();
const {packageController} = require('../../controller/v2');
const {
    userGetWorkbook, userGetPackage, adminGetPackage, adminCreatePackage, adminGetAllPackages, userGetAllPackages,
    adminDeletePackage, userSaveWorkbook
} = packageController;


router.get('/api/v2/admin/packages', adminGetAllPackages);
router.post('/api/v2/admin/packages', adminCreatePackage);
// FIXME: need organization name to pass
router.get('/api/v2/admin/packages/:name', adminGetPackage);
router.delete('/api/v2/admin/packages/:name', adminDeletePackage);

router.get('/api/v2/packages', userGetAllPackages);
router.get('/api/v2/packages/:name', userGetPackage);
router.get('/api/v2/packages/:packageName/:name', userGetWorkbook);
router.put('/api/v2/packages/:packageName/:name', userSaveWorkbook);


module.exports = router;
