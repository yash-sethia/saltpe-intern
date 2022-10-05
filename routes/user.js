const router = require('express').Router();
let User = require('../models/user.model');

const {
    registerController,
    signinController,
    userTransactionHistory,
    userData
} = require('./Controllers/auth.controller')


const {
    validSign,
    validLogin,
    validTransactionHistory,
    validUserData
} = require('./helper/valid');

router.post('/register', validSign, registerController);

router.post('/login', validLogin, signinController)

router.get('/:accountNo', validTransactionHistory, userTransactionHistory);

router.post('/user-data', validUserData, userData);
module.exports = router;