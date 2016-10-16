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

global.updatingResponse = function(err,doc){
	if (err) dataError(res)
	else {
		res.status(200)
		res.end(JSON.stringify({
			message: 'Данные сохранены'
		}))
	}
}