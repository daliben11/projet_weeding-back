var mongoose = require ('mongoose') // on recupere ce qui est exporté par bdd

  var userSchema = mongoose.Schema({
    userfirstname: String,
    userlastname: String,
    email:String,
    address: String,
    zipcode: Number,
    city: String,
    phone: Number,
    sexe: String,
    avatar: String,
    password: String,
    id_wedding: [{ type: mongoose.Schema.Types.ObjectId, ref: 'weddings' }], // clefs etrangeres pour lui associer des mariages
    salt:String, // nécessaire pour cryptage avec crypt js (pas avec bcrypt)
    token:String,
});

var userModel = mongoose.model('users', userSchema);


module.exports = userModel;

