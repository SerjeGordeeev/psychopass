const mongoose = require( 'mongoose' )

var propertySchema = new mongoose.Schema({
    name: {type: String, required: false},
    type: {type: String, required: false},
    description: {type: String, required: false},
    min: {type: String, required: false},
    max: {type: String, required: false}
})

mongoose.model('Property', propertySchema)
