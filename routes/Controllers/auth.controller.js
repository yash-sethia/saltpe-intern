const User = require('../../models/user.model');

// const fetch = require('node-fetch');

const { validationResult } = require('express-validator');
const { errorHandler } = require('../helper/error');


exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  console.log("Cp1")
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.json({
      errors: firstError,
      success: false
    });
  } else {
    // User is present
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        console.log("Cp2")
        return res.status(200).json({
          errors: 'Email is taken',
          success: false
        });
      } else {
        // Create a new user
        console.log("Cp3");
        const accountNo = (Math.random() + ' ').substring(2,10)+(Math.random() + ' ').substring(2,10);
        User.findOne({accountNo}).exec
        const newUser = new User({name, email, password, accountNo});
        newUser.save()
        .then(() => res.status(200).json({
            userData: newUser, 
            success: true
        }))
        .catch(err => {
          return res.json({
            success: false,
            errors: errorHandler(err)
        });
      });
      }
    });
  }
};


exports.signinController = (req, res) => {
  const { email, password } = req.body;

  console.log("cp1");
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
    console.log("cp3");
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        console.log("cp3.1");
        return res.json({
          errors: 'User with that email does not exist. Please signup',
          success: false
        });
      }
      // authenticate
      if (password !== user.password) {
        console.log("cp4");
        return res.json({
          errors: 'Email and password do not match',
          success: false
        });
      }
      console.log("cp5");
      return res.json({
        user: user,
        errors: "",
        success: true
      });
    });
  }
};