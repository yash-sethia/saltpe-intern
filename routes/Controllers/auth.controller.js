const User = require('../../models/user.model');

// const fetch = require('node-fetch');

const { validationResult } = require('express-validator');
const { errorHandler } = require('../helper/error');


exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
      success: false
    });
  } else {
    // User is present
    User.findOne({
      email
    }).exec((err, user) => {
      if (user) {
        return res.status(400).json({
          errors: 'Email is taken',
          success: false
        });
      } else {
        // Create a new user
        const newUser = new User({name, email, password});
        newUser.save()
        .then(() => res.status(200).json({
            userData: newUser, 
            success: true
        }))
        .catch(err => res.status(400).json({
            success: false,
            errors: errorHandler(err)
        }));
      }
    });
  }
};


exports.signinController = (req, res) => {
  const { email, password } = req.body;

  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
      success: false
    });
  } else {
    
    // check if user exist
    User.findOne({
      email
    }).exec((err, user) => {
      if (err || !user) {
        return res.json({
          errors: 'User with that email does not exist. Please signup',
          success: false
        });
      }
      // authenticate
      if (password !== user.password) {
        return res.json({
          errors: 'Email and password do not match',
          success: false
        });
      }

      return res.json({
        user: user,
        errors: "",
        success: true
      });
    });
  }
};