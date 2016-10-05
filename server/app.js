
/**
 *TODO Распараллеливание, Логгирование, Обработка ответов, Вывод результата
 **/

;(()=>{

const util   = require('util')
const http   = require('http')
const url    = require('url')
const fs     = require('fs')
const config = require('./../woodpecker.config.json')
const parseHostList = require('./parser').parseHostList 

	let vm = this

	//vm.events = new require('events')()
	const EventEmitter = require('events');
	class StressTest extends EventEmitter {}
	vm.stressTest = new StressTest();

	vm.params = require('optimist')
    	.default(config.defaults)
    	.alias(config.aliases)
    	.argv

	vm.hosts = []

	if(vm.params.gui){

		const server = require('./server'),
			  serverPort = vm.params.serverPort

		clearArgvParams(vm.params)

		console.log(serverPort)
		server.run(serverPort, vm.params)
	}
	else if(vm.params.f){
		let filepath = vm.params.f
		clearArgvParams(vm.params)
		
		try {
			let hlist = parseHostList(fs.readFileSync(filepath).toString().split('\n'), vm.params)
			
			//TODO Генерация объекта данных тестирования, отправка запросов, механизм остановки тестирования

			//console.log(JSON.stringify(hlist))

		/*
			vm.hosts.hostCount = 0
			hlist.forEach((host)=>{
				host.requests = []
				sendRequest(host)
				vm.hosts.push(host)
			})

			vm.stressTest.on('final',()=>{
				console.log('final')
				console.log(vm.hosts)
			})
		*/

		}catch(err){
			console.error(err)
		}
	}else if(vm.params.hostname) vm.hosts.push(vm.params.hostname)

/*
	#########################################################
							FUNCTIONS
    #########################################################
*/

	/**
	 * Заполняем объект options для запроса
	 * @params {}
	 * @return {}
	 **/
	function getReqOptions(host){
		let urlObj = url.parse(host.h,true)
		let options = {
			hostname: urlObj.hostname,
			port: host.p,
			path: urlObj.pathname,
			method: host.mt,
			protocol: urlObj.protocol,
			query: urlObj.query || null
		}
		return options
	}

	/**
	 *Отправить запрос
	 * @params {}
	 **/
	function sendRequest(host){
		let options = getReqOptions(host)
		host.reqCount = 0
		for(let i = 1; i <= host.n; i++) {
			setImmediate(()=>{
				let req = http.request(options, (res)=>processResults(res, host))
					req.setTimeout(host.tm, function(){
						console.log(req)
						this.abort()
					})
					req.end(()=>{console.log(`Request:${i} to ${host.h}`)})
					host.requests.push(req)
			}, host.d)
		}
		delete options
	}

	/**
	 * Обработать результаты запроса
	 **/
	function processResults(res, host) {
		host.reqCount++;
		if(host.reqCount == host.n){
			vm.hosts.hostCount++;
			if(vm.hosts.hostCount == vm.hosts.length-1){
				vm.stressTest.emit('final')
			}
		}
	}

	/**
	 * Убрать лишние поля из параметров
	 **/
	function clearArgvParams(params){

		//console.log(params)
		//console.log('============>')
		//console.log(config.defaults)

		for(let key in config.defaults){
			delete params[key]
		}
		delete params._
		delete params.$0
		delete params.f
		//console.log('=====AFTER ALL=====>')
		//console.log(params)
		//return params
	}

})()
