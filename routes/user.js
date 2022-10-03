const router = require('express').Router();
let User = require('../models/user.model');

const {
    registerController,
    signinController
} = require('./Controllers/auth.controller')


const {
    validSign,
    validLogin
} = require('./helper/valid');

router.post('/register', validSign, registerController);

router.post('/login', validLogin, signinController)

module.exports = router;