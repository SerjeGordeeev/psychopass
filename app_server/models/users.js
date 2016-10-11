//const process = require('process')
const mongoose = require( 'mongoose' )
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

//const MY_SECRET = process.env.SECRET

var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	login: {
		type: String,
		required: true
	},
	openPassword: {
		type: String,
		required: true
	},
	role:{
		type: String,
		required: true
	},
	hash: String,
	salt: String
})

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex')
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
}

userSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex')
	return this.hash === hash
}

userSchema.methods.generateJwt = function() {
	var expiry = new Date()
	expiry.setDate(expiry.getDate() + 7)

	return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	}, 'MY_SECRET') // DO NOT KEEP YOUR SECRET IN THE CODE!
}

mongoose.model('User', userSchema)
