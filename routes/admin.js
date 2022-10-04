const router = require('express').Router();

const {
    adminHomeDetails,
    adminUserDetails,
    adminTransaction,
    adminCreateUser
} = require('./Controllers/admin.controller');

const {
    adminTransactionValidator,
    adminCreateUserValidator
} = require('./helper/valid');


router.get('/home-details', adminHomeDetails);

router.get('/user-details', adminUserDetails);

router.post('/admin-transaction', adminTransactionValidator, adminTransaction);

router.post('/admin-create-user', adminCreateUserValidator, adminCreateUser);


module.exports = router;