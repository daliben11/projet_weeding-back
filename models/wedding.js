var mongoose = require('mongoose');


const personalTaskSchema = mongoose.Schema({
  title: String,
  address: String,
  description: String,
  zipcode : Number,
  state: String, // advancement state of the task
  owner: String,
  dateIn: Number,
  dateOut: Number
});
	
const participantSchema = mongoose.Schema({
  ID_wed_invite: String, // generated 
  name: String,
  email: String,
	accompanying : Number, // number of people comming with
  ID_contact_app: String, // id user in the app if existing
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
  zipcode: String,
  url_images: Array, // To show the service
  total_price: Number,
  paid_price: Number,
  payment_history: [paymentSchema]
});



const weddingSchema = mongoose.Schema({
	wedDate: Date,
	wedDescription: String,
	budgetTotal: Number,
	budgetPaid: Number,
	tasksPersonal: [personalTaskSchema],
	participants: [participantSchema],
	serviceProviders: [serviceSchema],
});



var weddingModel = mongoose.model('weddings', weddingSchema);


module.exports = weddingModel;
