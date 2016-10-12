const mongoose = require('mongoose')
const Organisation = mongoose.model('Organisation')

module.exports.getList = function (req, res) {
	console.log(req.body)
	res.status(200)
	res.end(JSON.stringify([{name:'Оциярганиза', is_psycho: true}]))
}

module.exports.delete = function (req, res) {

}

module.exports.add = function (req, res) {

}