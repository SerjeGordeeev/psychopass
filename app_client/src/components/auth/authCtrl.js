require('./auth.scss')
angular
	.module('psApp')
	.controller('authCtrl', authCtrl);

function authCtrl (authentication, $$organisations, $location) {

	let vm = this
	
	vm.showSignUpForm = false
	vm.orgs = []

	vm.login = null
	vm.password = null
	
	vm.signInData = {
			login: null,
			password: null
	}
	
	vm.signUpData = {
			name: null,
			login: null,
			password: null,
			email: null
	}
	
	vm.signIn = signIn
	vm.signUp = signUp

	$$organisations.getList().then(resp=>{
		vm.orgs = resp.data
	})
	
	function signIn(){
		authentication.login({
			login: vm.signInData.login,
			password: vm.signInData.password
		}).then(data=>{
			$location.path('/')
		}).catch(data=>{
			//console.log(data)
		})
	}

	function signUp(){
		authentication.register({
			name: vm.signUpData.name,
			login: vm.signUpData.login,
			email: vm.signUpData.email
		}).then(data=>{
			$location.path('/')
		}).catch(data=>{
			console.log(data)
		})
	}

}
