const mongoose = require('mongoose')
const Organisation = mongoose.model('Organisation')
const url = require('url')

module.exports.getList = function (req, res) {

	Organisation.find({},(err,data)=>{
		if(err) throw err
		else{
			res.status(200)
			res.end(JSON.stringify(data))
		}
	})

}

module.exports.delete = function (req, res) {
	//console.log('DELETE', req.query.id)
	Organisation.findOne({'_id': mongoose.Types.ObjectId(req.query.id)}, (err, data)=>{
		if(err) dataError(res)
		else {
			data.remove(err=>{
				if(err) dataError(res)
				else{
					res.status(200)
					res.end(JSON.stringify({
						message: 'Организация успешно удалена'
					}))
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
		if(err) dataError(res)
		else{
			res.status(200)
			res.end(JSON.stringify({
				message: 'Организация успешно добавлена'
			}))
		}
	})

}

module.exports.update = function (req, res) {
	//console.log(req.path)
	//orgs.push({id: 666, name: null, is_psycho: false})

	Organisation.findOne({'_id': mongoose.Types.ObjectId(req.query.id)}, function (err, doc) {
		if (err) dataError(res)
		else {
			doc.name = req.body.name
			doc.is_psycho = req.body.is_psycho
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

function dataError(res){
		console.error(org)
		res.status(422)
		res.end(JSON.stringify({
			message: 'Ошибка в данных'
		}))
	}