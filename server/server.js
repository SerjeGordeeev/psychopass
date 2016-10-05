/**
 * Функционал сервера, обслуживающего запросы GUI
 */

const express  = require('express')
const upload = require('./upload').uploadFile
const db = require('./db')

exports.run = run

function run(port = 80, defaultParams){

	db.run()

	const app = express()

	app.use(express.static(__dirname + '/public'))

	app.listen(port, function () {
		console.log(`Start server on: ${port}`)
		//require('openurl').open(`http://127.0.0.1:${port}`)
	})

	/**
	 * Редирект на главную
	 */
	app.get('/*', (req, res)=>{
		if(!req.path.indexOf('api') > -1) res.redirect('/')
	})

	/**
	 * Запрос на начало тестирования
	 */
	app.get('/api/start', (req, res)=>{
		console.log(req.path)
		res.send('start')
	})

	/**
	 * Прием конфигурационного файла
	 */
	app.post('/api/upload', (req,res)=>{
		upload(req, res, defaultParams)
	})


}