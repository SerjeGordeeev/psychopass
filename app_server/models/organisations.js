const mongoose = require( 'mongoose' )

var organisationSchema = new mongoose.Schema({
	name: {
		type: String,
		required: false
	},
	is_psycho: {
		type: Boolean,
		required: true
	},
	members: {
		type: Array,
		required: false
	}
})

mongoose.model('Organisation', organisationSchema)
