var express = require('express');
var router = express.Router();

// importation des models
var userModel = require('../models/users');
var weddingModel = require ('../models/weddings');

//Bcrypt config
  // const bcrypt = require('bcrypt');
  // const saltRounds = 10;
// Crypto js 
var SHA256 = require("crypto-js/sha256");
var encBase64 = require("crypto-js/enc-base64");
var uid2 = require("uid2");



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// route pour l'inscription d'un nouveau utilisateur

router.post('/sign-up', async function(req, res, next) {
  let result = false;
  let message= "";
  let tokenUser;
  let userAlreadyExist = await userModel.findOne({email: req.body.email}) 
  if(userAlreadyExist==null) {

  // HASH MOT DE PASSSE AVEC CRYPT JS
    var salt = uid2(32);
    var newUser = new userModel({
      userfirstname: req.body.userfirstname,
      userlastname: req.body.userlastname,
      email: req.body.email,
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      phone: req.body.phone,
      avatar: req.body.avatar,

      password: SHA256(req.body.password + salt).toString(encBase64),
      salt:salt,
      token:uid2(32),
      
    }
  )
  var userSaved = await newUser.save();

  
    result = true;
    message = "inscription réussie"
    tokenUser = userSaved.token
    console.log('inscription réussi',result)
  }
  else {
    message = 'username ou mot de passe déjà pris'
  }
  console.log(req.body)
  res.send({result,message,tokenUser});
});


// route pour la connection d'un utilisateur


router.post('/sign-in', async function (req,res,next) {
  var result = false;
  var message="";
  var tokeUser="";
  var checkUser = await userModel.findOne(
    {email: req.body.email}
  )
    if (checkUser !=null) {
      // COMPARE MOT DE PASSSE AVEC CRYPT JS
      var hash= SHA256(req.body.password + checkUser.salt).toString(encBase64);
      if(hash == checkUser.password)
        {
          result = true
          message = "connexion réussie";
          tokenUser = checkUser.token
        }
      else { 
          result = false;
          message = "mot de passe incorrect";
      }

    } else {
      result=false;
      message="nom d'utilisateur non reconnu";
    }

    res.send({result,message,tokenUser});
})


//route pour récupérer les info d'un profil

router.post('/profile', async function(req,res,next){
  let userProfile= await userModel.findOne({token: req.body.tokenUser})
  console.log(userProfile)

  res.send(userProfile)

})

module.exports = router;
