/**
 * Функционал парсинга файла - списка тестируемых адресов
 **/

const url = require('url')

exports.parseHostList = parseHostList

/*
 #########################################################
                        FUNCTIONS
 #########################################################
 */

/**
 * Парсинг записи параметров запроса
 * @params [],{}
 * @return [{},{}]
 * */
function parseHostList(hlist, defaultParams){

	//Удаляем из массива пустые строки и обрабатываем записи
	hlist = hlist.filter(host => host[0] != '#' && host.length)
		.map((host)=>{
			console.log(host)
			return {raw: host}
		})

	//Предварительная проверка корректности файла
	if(hlist[0].raw.indexOf('\t')!=-1 || hlist[0].raw[0] == ' '){
		console.log(hlist[0].raw)
		throw new Error('Ошибка конфигурационного файла')
	}

	//Создаем иерархические объекты хостов
	for(let i = 0; i < hlist.length; i++){
		i = createDeep(hlist, null, hlist[i], i)
	}

	//Оставляем только корневые хосты
	return hlist.filter(host=>!host.parentHost)

	/**
	 *Рекурсивная функция обработки записей адресов
	 * @params [],{},{},Number
	 * @return Number
	 */
	function createDeep(hlist, parent, child, index){
		//Выходим из функции, если достигнут конец массива
		if(index >= hlist.length) return index

		//Вводим поля ссылок на доченрние и родительский хосты
		if(!child._deep) child._deep = tabCount(child.raw)
		if(!child.parentHost) child.parentHost = null
		if(!child.childHosts) child.childHosts = []
		if(!child.params) child.params = {}

		//Если у дочернего хоста уже есть родитель идем вниз по иерархии
		if(parent && child.parentHost){
			//console.log(1)
			return createDeep(hlist,child,hlist[index+1],index+1)
		}

		if(!parent){
			//Обработка корневых хостов
			//console.log(2)
			child = parseHostData(child)
			child.params = inheritParams(child.params, defaultParams)
			//console.log(child.params)
			return createDeep(hlist, child, hlist[index+1], index+1)

		}
		else{
			//Если дочернего хоста выше в иерархии предпологаемого родителя
			if(child._deep < parent._deep){
				//Если глубина дочернего хоста равна 0, то это корневой хост
				if(child._deep == 0) return index-1
				//Иначе нужно подняться по иерархии и найти его родителя
				else{
					//Подъем до хоста с равной глубиной
					console.log(3)
					return createDeep(hlist, hlist[index-1], child, index-1)
				}
			}
			//Если глубина род.хоста и доч.хоста равна значит доч.хосту указываем родителя род.хоста
			else if(child._deep == parent._deep){
				//console.log(4)
				child.parentHost = parent.parentHost
				parent.parentHost.childHosts.push(child)
				child = parseHostData(child)
				child.params = inheritParams(child.params, parent.parentHost.params)
				return createDeep(hlist,child,hlist[index+1],index+1)
			}
			//Иначе если глубина доч.хоста больше предпологаемого родителя, то это и есть родитель
			else{
				//console.log(5)
				child.parentHost = parent//.id //parent
				parent.childHosts.push(child)
				child = parseHostData(child)
				child.params = inheritParams(child.params, parent.params)
				return createDeep(hlist,child,hlist[index+1],index+1)
			}
		}
	}
}

/**
 * Парсинг строки хоста
 * @params {}
 * @return {}
 **/
function parseHostData(child){
	let hData = {
		parentHost:child.parentHost,
		childHosts:child.childHosts,
		params: child.params,
		_deep: child._deep
	}, chunks = child.raw.trim().split(' '), parsedHName

	//Если адрес хоста заканчивается на '/' помечаем его как подлежащий тестированию
	if(chunks[0][chunks[0].length-1] != '/'){
		hData.params.req = true
	}

	//TODO менять протокол в url если он отличается от протокола родительского хоста
	parsedHName = url.parse(chunks[0])
	console.log(parsedHName)
	hData.params.h = url.resolve(hData.parentHost? hData.parentHost.params.h:'', parsedHName.href)
	hData.params.path = parsedHName.hostname?parsedHName.hostname+parsedHName.path:parsedHName.path
	hData.params.prl = parsedHName.protocol

	for(let i = 1; i < chunks.length; i++){
		let buffer = chunks[i].split(':')
		//Если в параметрах указан флаг, устанавливаем ему значение true
		if(buffer.length == 1) buffer.push(true)
		hData.params[buffer[0]] = buffer[1]
	}

	return hData
}

/**
 * Наследование параметров от родительского хоста к дочернему
 * @params {},{}
 * @return {}
 **/
function inheritParams(childParams, parentParams){
	for(let prop in parentParams){
		if( childParams[prop] === undefined || childParams[prop] === null) {
			childParams[prop] = parentParams[prop]
		}
	}
	return childParams
}

/**
 * Посчитать глубину хоста
 * @params String
 * @return Number
 **/
function tabCount(string){
	let count = 0;
	while(string[count] == ' ') count++
	return count
}