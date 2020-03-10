var express = require('express');
var router = express.Router();

// importation des models
var userModel = require('../models/users');
var weddingModel = require ('../models/weddings');

// importation de la liste de tache
var tasks = require('../public/task')

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
      sexe: req.body.sexe,
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
  var tokenUser="";
  var wedding=[];
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
          tokenUser = checkUser.token;
          wedding = checkUser.id_wedding

        }
      else { 
          result = false;
          message = "mot de passe incorrect";
      }

    } else {
      result=false;
      message="nom d'utilisateur non reconnu";
    }

    res.send({result,message,tokenUser,wedding});
})


//route pour récupérer les info d'un profil

router.post('/profile', async function(req,res,next){
  let userProfile= await userModel.findOne({token: req.body.tokenUser})
  console.log(userProfile)

  res.send(userProfile)

})

//route pour créer un évenement mariage

router.post('/add-wedding', async function(req,res,next){
  var resultMariage = false;
  var messageMariage= "";
 
  var newWedding = new weddingModel({
    wedDate: req.body.date,
    wedDescription: req.body.description,
    budgetTotal: req.body.budget,
    serviceProviders:[
      { type_service:'Lieux', img:'./images/lieuxmariage.jpg'},
      { type_service:'Traiteur', img:'./images/traiteurmariage.jpg' },
      { type_service:'Photographe', img:'./images/photomariage.jpeg' },
      { type_service:'Animation', img:'./images/weddingparty.jpeg'},
      { type_service:'Robe', img:'./images/robe.jpg'},
      { type_service:'Décorateur', img:'./images/decoration.jpeg' },
      { type_service:'Patisserie', img:'./images/gateuxmariage.jpg'},
      { type_service:'Bijoux', img:'./images/bijoux.jpg' }
    ]

  });

  var newDate = new Date(req.body.date)
  
  console.log('date du mariage',newDate)
  for (let i=0;i<tasks.length;i++){
    tasks[i].dateIn= newDate.setMonth(newDate.getMonth()-tasks[i].dateIn);
    newDate = new Date(req.body.date)
    tasks[i].dateOut= newDate.setMonth(newDate.getMonth()-tasks[i].dateOut);
    newDate = new Date(req.body.date)
    tasks[i].state=false;
    console.log(tasks[i].dateIn)
   
    };

  newWedding.tasksPersonal=tasks
  var weddingSaved = await newWedding.save()


  var userProfile= await userModel.findOne({token: req.body.tokenUser})

  userProfile.id_wedding.push(weddingSaved._id)

  userProfile.save()

  resultMariage = true;
  messageMariage = "inscription du mariage réussie";
  res.send({resultMariage,messageMariage});
})


router.post('/budget', async function(req,res,next){

var wedding = await  weddingModel.findById(req.body.id)
console.log(wedding)

res.json({wedding})

})


module.exports = router;
