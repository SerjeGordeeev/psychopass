const mongoose = require('mongoose')
const Organisation = mongoose.model('Organisation')
const User = mongoose.model('User')
const async = require('async')
const url = require('url')

module.exports.getList = function (req, res) {

	Organisation.find(req.query.id?{_id:mongoose.Types.ObjectId(req.query.id)}:{}, (err, organisation)=>{
		if(err) dataError(res,err)
		else{
			if(req.query.with_members){
				async.filter(organisation, function(org, callback){
					let query = User.find({'organisation': org._id})
					query.select('name email role group')
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
	//console.log(req.path)
	//orgs.push({id: 666, name: null, is_psycho: false})

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

