
	angular
		.module('psApp')
		.controller('homeCtrl', homeCtrl);

	function homeCtrl (authentication) {
		console.log('Home controller is running',authentication.isLoggedIn());
	}
