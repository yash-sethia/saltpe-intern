const router = require('express').Router();
let Transaction = require('../models/transactions.model');

const {
    userSendMoney,
} = require('./Controllers/transaction.controller')


const {
    userSendMoneyValidator
} = require('./helper/valid');

router.post('/userSendMoney', userSendMoney, userSendMoney);


module.exports = router;