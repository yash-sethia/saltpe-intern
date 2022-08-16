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

router.route('/:id').get((req, res) => {
  User.find({_id : req.params.id})
    .then(users => {
      Article.find({articleID : {$regex : '^' + req.params.id}}).then(articles => {
        res.status(200).json( {userData : users, articleData: articles} )
      })
    }
    )
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;