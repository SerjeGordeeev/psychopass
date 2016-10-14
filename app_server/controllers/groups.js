const mongoose = require('mongoose')
const Organisation = mongoose.model('Organisation')
const User = mongoose.model('User')
const Group = mongoose.model('Group')
const async = require('async')
const url = require('url')


module.exports.getList = function (req, res) {
	Group.find(req.query.id?{_id:mongoose.Types.ObjectId(req.query.id)}:{}, (err, groups)=>{
		if(err) dataError(res)
		else{
			if(req.query.with_members){
				async.filter(groups, function(group, callback){
					let query = User.find({'group': group._id, role: 'student'})
					query.select('name email role organisation')
					query.exec({'group': group._id}, function (err, users) {
						group.members = users
						callback(null, !err)
					})
				},function(err, results){
					//console.log(results)
					res.status(200)
					res.end(JSON.stringify(groups))
				})
			}
			else{
				res.status(200)
				res.end(JSON.stringify(groups))
			}
		}
	})
}

module.exports.delete = function (req, res) {
	Group.findOne({'_id': mongoose.Types.ObjectId(req.query.id)}, (err, data)=>{
		if(err) dataError(res)
		else {
			data.remove(err=>{
				if(err) dataError(res)
				else{
					res.status(200)
					res.end(JSON.stringify({
						message: 'Группа успешно удалена'
					}))
				}
			})
		}
	})

}

module.exports.add = function (req, res) {
	//console.log(req.path)
	//orgs.push({id: 666, name: null, is_psycho: false})

	let group = new Group()
	//group.id = 1312
	group.name = req.body.name
	group.members = []
	group.mentor = null

	group.save(function(err){
		if(err) dataError(res)
		else{
			res.status(200)
			res.end(JSON.stringify({
				message: 'Группа успешно добавлена'
			}))
		}
	})

}

module.exports.update = function (req, res) {
	Group.findOne({'_id': mongoose.Types.ObjectId(req.body.id)}, function (err, doc) {
		if (err) dataError(res)
		else {
			updateData(doc, req.body)
			doc.save(err=> {
				if (err) dataError(res)
				else {
					res.status(200)
					res.end(JSON.stringify({
						message: 'Данные сохранены'
					}))
				}
			})
		}
	})

}