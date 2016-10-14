const process = require('process')
const app = require('./config')

const port = process.env.PORT || 8778

app.listen(port, function () {
	console.log(`Start server on: ${port}`)
})

app.on('error', err =>{
	console.log('Server error')
	throw err
});


global.dataError = function dataError(res){
	console.error(org)
	res.status(422)
	res.end(JSON.stringify({
		message: 'Ошибка в данных'
	}))
}

global.cleanQueryObj = function cleanQueryObj(queryObj){
	for(let prop in queryObj){
		if(queryObj[prop] === 'null') queryObj[prop] = null
	}
	return queryObj
}

global.updateData = function updateData(obj, data){
	for(let prop in data){
		obj[prop] = data[prop]
	}
}