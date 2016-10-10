require('./auth.scss')
angular
	.module('psApp')
	.controller('loginCtrl', loginCtrl);

function loginCtrl (authentication) {
	let vm = this

	vm.login = null
	vm.password = null
	vm.signIn = signIn

	function signIn(){
		authentication.login({
			email: vm.login,
			password: vm.password
		}).then(data=>{
			console.log(data)
		})
	}
}
