const mongoose = require( 'mongoose' )

var organisationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false
	},
	is_psycho: {
		type: Boolean,
		required: true
	}
})

mongoose.model('Organisation', organisationSchema)
