require('./admin.html')
angular
	.module('psApp')
	.controller('adminCtrl', adminCtrl);

function adminCtrl (authentication, $$admin, $location, flashAlert) {

	let vm = this

	vm.checkCRUDRights = authentication.checkCRUDRights

	vm.getBDBackup = getBDBackup

	init()

	function init(){
		if(!vm.checkCRUDRights()) $location.path('/')

	}

	function getBDBackup(){
		console.log('asd')
		$$admin.getBDBackup().then(()=>{
			flashAlert.success('Данные успешно экспортированны')
		})
	}
}
