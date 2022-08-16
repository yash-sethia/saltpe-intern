const router = require('express').Router();
let User = require('../models/user.model');
let Otp = require('../models/otp.model');
const {
    sendEmail,
    resetPassword
} = require('./Controllers/otp.controller')


const {
    forgotPasswordValidator,
    resetPasswordValidator
} = require('./helper/valid');

router.post('/send-mail', forgotPasswordValidator, sendEmail);

router.post('/resetPassword', resetPasswordValidator, resetPassword)

module.exports = router;