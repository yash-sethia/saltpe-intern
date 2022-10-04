const User = require('../../models/user.model');
const Transaction = require('../../models/transactions.model');

// const fetch = require('node-fetch');

const { validationResult } = require('express-validator');
const { errorHandler } = require('../helper/error');

exports.adminHomeDetails = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    console.log("cp2");
    const firstError = errors.array().map(error => error.msg)[0];
    console.log("Um : ", firstError);
    return res.json({
      errors: firstError,
      success: false
    });
  } else {
    User.find({}).exec((err, users) => {
        if(users) {

            let total_deposit = 0
            let total_users = users.length

            users.map(item => total_deposit += item.balance);

            return res.status(200).json({
                success: true,
                deposit: total_deposit,
                users: total_users
            });

        } else {
            return res.json({
                errors: "Could not fetch User list!",
                success: false
              });
        }
    });
  }

};

exports.adminUserDetails = (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      console.log(errors.array());
      console.log("cp2");
      const firstError = errors.array().map(error => error.msg)[0];
      console.log("Um : ", firstError);
      return res.json({
        errors: firstError,
        success: false
      });
    } else {
      User.find({}).exec((err, users) => {
          if(users) {  
              return res.status(200).json({
                success: true,
                users: users
              });
  
          } else {
              return res.json({
                  errors: "Could not fetch User list!",
                  success: false
                });
          }
      });
    }
  
  };

  exports.adminTransaction = (req, res) => {
    const { type, amount, accountNo } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        const firstError = errors.array().map(error => error.msg)[0];
        
        return res.json({
          errors: firstError,
          success: false
        });
      } else {
        if(type) {
            // Cash Deposit
            const newTransaction = new Transaction({sender: "Self (Cash Deposit)", receiver: accountNo, amount: amount});
            console.log(newTransaction);
            newTransaction.save().then(() => {
                User.findOne({
                    accountNo: accountNo
                }).exec((err_user, user) => {
                    if(user) {

                        user.balance += amount;
                        user.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                transaction: newTransaction
                            });
                        })
                        .catch(err_user_save => {
                            console.log("Can't save user");
                            return res.json({
                                success: false,
                                errors: errorHandler(err_user_save)
                            })
                        })

                    } else {
                        return res.status(200).json({
                            errors: "Account Number not found",
                            success: false
                        });
                    }
                })
            })
                .catch(err_transaction_save => {
                    console.log("Can't save transaction");
                    return res.json({
                        success: false,
                        errors: errorHandler(err_transaction_save)
                    })
                });
        } else {
            // Cash Withdrawl
            const newTransaction = new Transaction({sender: accountNo, receiver: "Self (Cash Withdrawl)", amount: amount});
            console.log(newTransaction);
            newTransaction.save().then(() => {
                User.findOne({
                    accountNo: accountNo
                }).exec((err_user, user) => {
                    if(user) {

                        user.balance -= amount;
                        user.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                transaction: newTransaction
                            });
                        })
                        .catch(err_user_save => {
                            return res.json({
                                success: false,
                                errors: errorHandler(err_user_save)
                            })
                        })

                    } else {
                        return res.status(200).json({
                            errors: "Account Number not found",
                            success: false
                        });
                    }
                })
            })
                .catch(err_transaction_save => {
                    return res.json({
                        success: false,
                        errors: errorHandler(err_transaction_save)
                    })
                });
        }
      }

  };

  exports.adminCreateUser = (req, res) => {
    const { name, balance, accountNo, email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        const firstError = errors.array().map(error => error.msg)[0];
        
        return res.json({
          errors: firstError,
          success: false
        });
      } else {

        User.findOne({accountNo: accountNo}).exec((err_user, user) => {
            if(user) {
                console.log(user);
                return res.status(200).json({
                    errors: "Account Number already present",
                    success: false
                });
            } else {
                const newUser = new User({name, balance, accountNo, email});
                newUser.save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        user: newUser
                    })
                })
                .catch(err => {
                    console.log("here here: ", err);
                    return res.json({
                        success: false,
                        errors: errorHandler(err)
                    })
                })
            }
        })
      }
  };