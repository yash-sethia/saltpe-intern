const User = require('../../models/user.model');
const Otp = require('../../models/otp.model');
// const fetch = require('node-fetch');
var nodemailer = require('nodemailer');

const { validationResult } = require('express-validator');
const { errorHandler } = require('../helper/error');

const Sender = (email, otp) => {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yashsethia.5401@gmail.com',
        pass: 'orfplnqtkxwkqsjq'
    }
    });

    var mailOptions = {
        from: 'yashsethia.5401@gmail.com',
        to: email,
        subject: 'Forgot Password',
        text: 'Your OTP is : ' + otp + "."
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      // console.log(error);
    } else {
      // console.log('Email sent: ' + info.response);
    }
    });
}

exports.sendEmail = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // console.log(errors)
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

        Otp.findOne({email}).then(otp => {
        
            if(otp) {
                // Check if OTP has expired or not
                let date = new Date().getTime();
                let timeElapsed = Math.abs(otp.updated_at.getTime() - date);
                
                // Expiry time is 5 mins
                if(timeElapsed >= 300000) {
                    let ran = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                    otp.otp = ran;
                }
                otp.save();

                Sender(otp.email, otp.otp);
                return res.json({success: true});
               
            }
            else {
               
                let ran = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                let newOtp = new Otp({email: email, otp: ran});
               
                newOtp.save()
                .then(() => {
                    Sender(newOtp.email, newOtp,otp);
                  
                    return res.json({success: true});
                })
                .catch(err => {
                  
                    return res.status(400).json({
                    success: false,
                    errors: errorHandler(err)
                })
            });
            }
        })
        .catch(err => {
           
            return res.status(400).json({
            errors: errorHandler(err),
            success: false
          });
        })
        
      } else {
        return res.status(400).json({
            errors: 'Email is registered',
            success: false
          });
      }
    });
  }
};

exports.resetPassword = (req, res) => {
    const { email, password, otp } = req.body;
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      console.log(errors)
      const firstError = errors.array().map(error => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
        success: false
      });
    } else {
      // User is present
      Otp.findOne({
        otp
      }).exec((err, otp) => {
         
        if (otp) {
            // OTP is correct
            User.findOne({ email }).then(user => {
              if(user) {
                user.password = password;
                user.save();
              }
            })
            return res.json({success: true}); 
        } else {
            // OTP is incorrect
          return res.status(400).json({
              errors: 'OTP incorrect',
              success: false
            });
        }
      });
    }
  };
