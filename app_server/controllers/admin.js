const mongoose = require('mongoose')
const User = mongoose.model('User')
const Group = mongoose.model('Group')
const Organisation = mongoose.model('Organisation')
const Prop = mongoose.model('Property')

module.exports.getBDBackup = function (req,res) {

/*	Promise.all([User.find({})]).then((err, result)=>{
		console.log(result)
	})*/
	let dumpJSON = {}
	User.find({},(err,data)=>{
		dumpJSON.users = data
		Group.find({},(err,data)=>{
			dumpJSON.groups = data
			Organisation.find({},(err,data)=>{
				dumpJSON.organisations = data
				Organisation.find({},(err,data)=>{
					dumpJSON.props = data
					dumpJSON.date = new Date()
					res.status(200)
					res.json(dumpJSON)
				})
			})
		})
	})

/*	var file = __dirname + '/utils/backup.json';
	res.download(file);*/
}