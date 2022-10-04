const {
    check,
    param
} = require('express-validator');


exports.validSign = [
    check('name', 'Name is required').notEmpty()
    .isLength({
        min: 4,
        max: 32
    }).withMessage('Name must be between 3 to 32 characters'),

    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

    check('password', 'Password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('Password must contain a number')
]



exports.validLogin = [
    check('email')
    .isEmail()
    .withMessage('Must be a valid email address'),

    check('password', 'Password is required').notEmpty(),
    check('password').isLength({
        min: 6
    }).withMessage('Password must contain at least 6 characters').matches(/\d/).withMessage('password must contain a number')
]


exports.forgotPasswordValidator = [
    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
];

exports.resetPasswordValidator = [
    check('password')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Password must be at least  6 characters long')
        .matches(/\d/).withMessage('password must contain a number')
];

exports.userSendMoneyValidator = [
    check('to')
        .not()
        .isEmpty()
        .isLength({ min: 16, max: 16})
        .withMessage("Receiver's account No. must be 16 digits long"),

        check('from')
            .not()
            .isEmpty()
            .isLength({ min: 16, max: 16})
            .withMessage("Sender's account No. must be 16 digits long"),

        check('amount')
            .isFloat({min: 0})
            .withMessage("Amount must be a positive value")

];

exports.validTransactionHistory = [
    param('accountNo')
        .not()
        .isEmpty()
        .isLength({ min: 16, max: 16})
        .withMessage("Account No. must be 16 digits long")

];

exports.adminTransactionValidator = [
    check("type")
        .isBoolean()
        .withMessage("Invalid type of transaction requested"),
    
    check("accountNo")
        .not()
        .isEmpty()
        .isLength({ min: 16, max: 16})
        .withMessage("Account No. must be 16 digits long"),

    check("amount")
        .isFloat({min: 0})
        .withMessage("Amount must be a positive value")

];

exports.adminCreateUserValidator = [
    check("name")
        .not()
        .isEmpty()
        .isLength({min: 3, max: 32})
        .withMessage("User name must be between 3 to 32 characters long"),

    check("balance")
        .not()
        .isEmpty()
        .isFloat({min: 0})
        .withMessage("Balance must be greater or equal to 0"),

    check("accountNo")
        .not()
        .isEmpty()
        .isLength({ min: 16, max: 16})
        .withMessage("Account No. must be 16 digits long"),

    check('email')
        .not()
        .isEmpty()
        .isEmail()
        .withMessage('Must be a valid email address')
        
];