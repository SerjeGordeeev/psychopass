require('./analize.html')
angular
	.module('psApp')
	.controller('analizeCtrl', analizeCtrl);

function analizeCtrl (authentication, $$admin, $location, flashAlert) {

	let vm = this

	vm.checkCRUDRights = authentication.checkCRUDRights

	vm.reports = [
		{
			title: "Нормальное распределение",
			href: "analize/normal_distribution"
		}
	]

	init()

	function init(){
		console.log(vm)
		if(!vm.checkCRUDRights()) $location.path('/')

	}

}
