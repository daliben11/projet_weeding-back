var mongoose = require('mongoose');


const personalTaskSchema = mongoose.Schema({
  title: String,
  address: String,
  description: String,
  zipcode : String,
  state: Boolean, // advancement state of the task
  owner: String,
  dateIn: Date,
  dateOut: Date
});
	
const participantSchema = mongoose.Schema({
  ID_wed_invite: String, // generated 
  ID_contact_app: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}, // id user in the app if existing
  nom: String,
  prenom: String,
  email: String,
	accompanying : Number, // number of people comming with   //
  RSVP: Boolean,
  table: String
});

const paymentSchema = mongoose.Schema({
  price: Number,
  date: Date
});

const serviceSchema = mongoose.Schema({
  company_name: String,
  type_service: String,
  phone_number: String,
  contact_name: String,
  website: String,
  address: String,
  zipcode: Number,
  total_price: Number,
  paid_price: Number,
  img: String,  // A default picture of a service
  payment_history: [paymentSchema]
});



const weddingSchema = mongoose.Schema({
	ownership: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	wedDate: Date,
	wedCity: String,
	brideName: String,
	groomName: String,
	wedDescription: String,
	budgetTotal: Number,
	budgetPaid: Number,
	tasksPersonal: [personalTaskSchema],
	participants: [participantSchema],
	serviceProviders: [serviceSchema],
});



var weddingModel = mongoose.model('weddings', weddingSchema);


module.exports = weddingModel;
