/**
 * Функционал сервера, обслуживающего запросы GUI
 */

const express  = require('express')
const db = require('./db')


run()

function run(port = 8222, defaultParams){

	//db.run()

	const app = express()

	app.use(express.static(__dirname + '/public'))

	app.listen(port, function () {
		console.log(`Start server on: ${port}`)
		//require('openurl').open(`http://127.0.0.1:${port}`)
	})


	app.get('/*', (req, res)=>{
		if(!req.path.indexOf('api') > -1) res.redirect('/')
	})


}