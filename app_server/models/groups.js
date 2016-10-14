const mongoose = require( 'mongoose' )

var groupSchema = new mongoose.Schema({
	name: { type: String, required: false },
	mentor: { type: String, required: false },
	members: { type: Array, required: false }
})

mongoose.model('Group', groupSchema)