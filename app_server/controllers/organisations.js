const mongoose = require('mongoose')
const Organisation = mongoose.model('Organisation')
//const Props = mongoose.model('Properties')
const User = mongoose.model('User')
const async = require('async')
const url = require('url')

module.exports.getList = function (req, res) {

	cleanQueryObj(req.query)
	let query = {}
		if(req.query.id) query._id=mongoose.Types.ObjectId(req.query.id)
		if(req.query.is_psycho!=undefined) query.is_psycho=req.query.is_psycho
	
	Organisation.find(query, (err, organisation)=>{
		if(err) dataError(res,err)
		else{
			if(req.query.with_members){
				async.filter(organisation, function(org, callback){
					let query = User.find({'organisation': org._id})
					query.select('name email role group course properties')
					query.exec({'organisation': org._id}, function (err, users) {
						org.members = users
						callback(null, !err)
					})
				},function(err, results){
					//console.log(results)
					res.status(200)
					res.json(organisation)
				})
			}
			else{
				res.status(200)
				res.json(organisation)
			}
		}
	})
}

module.exports.delete = function (req, res) {
	//console.log('DELETE', req.query.id)
	Organisation.findOne({'_id': mongoose.Types.ObjectId(req.query.id)}, (err, data)=>{
		if(err) dataError(res,err)
		else {
			data.remove(err=>{
				if(err) dataError(res,err)
				else{
					res.status(200)
					res.json({
						message: 'Организация успешно удалена'
					})
				}
			})
		}
	})

}

module.exports.add = function (req, res) {
	//console.log(req.path)
	//orgs.push({id: 666, name: null, is_psycho: false})

	let org = new Organisation()
	//org.id = 1312
	org.name = req.body.name
	org.is_psycho = req.body.is_psycho

	org.save(function(err){
		if(err) dataError(res,err)
		else{
			res.status(200)
			res.json({
				message: 'Организация успешно добавлена'
			})
		}
	})

}

module.exports.update = function (req, res) {

	Organisation.findOne({'_id': mongoose.Types.ObjectId(req.query.id)}, function (err, doc) {
		if (err) dataError(res,err)
		else {
			doc.name = req.body.name
			doc.is_psycho = req.body.is_psycho
			doc.save(err=> {
				if (err) dataError(res,err)
				else {
					res.status(200)
					res.json({
						message: 'Данные сохранены'
					})
				}
			})
		}
	})

}

module.exports.upload = function (req, res) {
	require('./utils/upload').uploadFile(req, res, function (orgs) {

		let err = false
		orgs.forEach(org=>{
			if(!org['Название']) err = true
		})

		if(!err) {
			async.filter(orgs, function (orgData, callback) {
				let org = new Organisation()

				org.name = orgData['Название']
				org.is_psycho = !orgData['Учебная']

				org.save(function (err) {
					if (err) dataError(res, err)
					else callback(null, !err)
				})
			}, function (err) {
				if (err) dataError(res, err)
				else {
					res.status(200)
					res.json({message: 'Организации успешно импортированы'})
				}
			})
		}
		else{
			res.status(422)
			res.json({message:'Ошибка в составлении списка организаций'})
		}

	})
}