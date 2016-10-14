const express  = require('express')
//const db = require('./db')
require('./models/db');
require('./config/passport');

const passport = require('passport')
const rotesApi = require('./routes')
const bodyParser = require('body-parser');

const app = express()

// app.use('/*', (req,res,next)=>{
// 	let path = req._parsedUrl.path
// 	console.log(path)
// 	if(path == '/') return
// 	next()
// })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/',express.static('app_client'))

app.use(passport.initialize())
app.use('/api', rotesApi)


module.exports = app


let staticRouts = ['home','groups','organisations','members','psychologs','auth']
initStaticRouts(staticRouts)
function initStaticRouts(routs){
	routs.forEach(route =>{
		app.use(`/${route}*`,express.static('app_client'))
	})
}
