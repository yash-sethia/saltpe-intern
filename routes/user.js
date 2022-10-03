const router = require('express').Router();
let User = require('../models/user.model');

const {
    registerController,
    signinController,
    userTransactionHistory
} = require('./Controllers/auth.controller')


const {
    validSign,
    validLogin,
    validTransactionHistory
} = require('./helper/valid');

router.post('/register', validSign, registerController);

router.post('/login', validLogin, signinController)

router.get('/:accountNo', validTransactionHistory, userTransactionHistory);
module.exports = router;