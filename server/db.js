
exports.run = function(){

	const mongoose = require('mongoose')
	const db = mongoose.createConnection('mongodb://localhost/test')

	db.on("error", console.error.bind(console, "connection error:"));
	db.once("open", function callback () {
		console.log("Connected!")
	});

	return db
}



