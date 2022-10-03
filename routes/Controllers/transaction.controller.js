const User = require('../../models/user.model');
const Transaction = require('../../models/transactions.model');

// const fetch = require('node-fetch');

const { validationResult } = require('express-validator');
const { errorHandler } = require('../helper/error');


exports.userSendMoney = (req, res) => {
  const { to, from, amount } = req.body;
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.json({
      errors: firstError,
      success: false
    });
  } else {

    

    const newTransaction = new Transaction({sender: to, receiver: from, amount: amount});
    newTransaction.save().then(() => {
        // User is present
        User.findOne({
            accountNo: from
        }).exec((err_send, sender) => {
            if (sender) {
                // Sender exists
                if(sender.balance >= amount) {
        
                User.findOne({accountNo: to}).exec((err_receive, receiver) => {
                    if(receiver) {
                        // Both sender and receiver exist
                        receiver.balance += amount;
                        receiver.save()
                        .then(() => {
                            sender.balance -= amount;

                            sender.save()
                            .then(() => res.status(200).json({
                                success: true,
                                transaction: newTransaction
                            }))
                            .catch((errOnSaveingSender) => res.json({
                                success: false,
                                errors: errorHandler(errOnSaveingSender)
                            }))

                        })
                        .catch(errOnSavingReceiver => res.json({
                            success: false,
                            errors: errorHandler(errOnSavingReceiver)
                        }));
                    } else {
                        return res.status(200).json({
                            errors: "Receiver's Account Number not found",
                            success: false
                        });
                    }
                });
                } else {
                    return res.status(200).json({
                        errors: 'Insufficient Balance',
                        success: false
                    })
                }
            }
            else {
                return res.status(200).json({
                    errors: "Sender's Account Number not found",
                    success: false
                });
            }
        })})
        .catch((err) => res.json({
            success: false,
            errors: errorHandler(err)
        }));

    }
};