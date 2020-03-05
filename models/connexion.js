var mongoose = require('mongoose');


const URI_BDD = `mongodb+srv://admin:admin@weedingplanner-qstyr.mongodb.net/weddingAppt?retryWrites=true&w=majority`;

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true
	};
mongoose.connect( URI_BDD, 
	options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Bienvenue sur la database Wedding App ***');
    }
   }
);

