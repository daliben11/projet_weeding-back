var mongoose = require('mongoose');


const URI_BDD = ``;

var options = {
	connectTimeoutMS: 5000,
	useNewUrlParser: true,
	useUnifiedTopology: true
	};
mongoose.connect( URI_BDD, 
	options, 
	function (err) { 
		if (!typeof(err)) {console.log(err);}
	});

