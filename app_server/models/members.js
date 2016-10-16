//const process = require('process')
const mongoose = require( 'mongoose' )
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

//const MY_SECRET = process.env.SECRET

var userSchema = new mongoose.Schema({
	user_id: { type: String, required: false },
	properties: Array,
})

mongoose.model('Member', userSchema)
