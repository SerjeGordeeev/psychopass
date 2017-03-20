require('./NormalDistribution.html')
angular
	.module('psApp')
	.controller('normalDistCtrl', Controller);

function Controller ($q, authentication, $$admin, $location, flashAlert, $$props, $$profiles) {

	let vm = this

	vm.checkCRUDRights = authentication.checkCRUDRights;
	vm.props = [];
	vm.props = [];
	vm.results = [];

	init(); 

	function init(){
		if(!vm.checkCRUDRights()) $location.path('/')
		vm.promise = $q.all({
			users: $$profiles.getList({role: "student"}),
			props: $$props.getList({type:"number"})
		}).then(response=>{
			vm.users = response.users.data;
			vm.props = response.props.data;
			getResults()
		})		
	}

	function getResults(){
		_.forEach(vm.props, prop => {
			let result = {}

			_.assign(result,{
				propId: prop._id,
				propName: prop.name,
				values: getValues(prop._id),
				showGraph: false 
			});

			result.valuesCount = result.values.length;
			result.minValue = _.min(result.values);
			result.maxValue = _.max(result.values);
			result.mu = _.sum(result.values)/result.values.length;
			result.sigma = getSigma(result.values, result.mu);
			result.lower = getLowerPart(result);
			result.upper = getUpperPart(result);



			vm.results.push(result)
		})
	}

	function getValues(propId){
		return _.compact(
			_.map(vm.users, user => {
				let result = _.find(user.properties, {_id: propId})
				return result ? result.actuallVal : null
			})
		)
	}

	function getSigma(arr, median){
		let sigma = 0;
		let summ = 0;
		_.forEach(arr, val => {
			summ += Math.pow(val - median, 2);
		})

		return Math.pow(summ/arr.length, 0.5);
	}

	function getLowerPart(result){
		return (_.filter(result.values, val =>{
			return val < (result.mu - result.sigma)
		}).length * 100)/result.values.length
	}

	function getUpperPart(result){
		return (_.filter(result.values, val =>{
			return val > (result.mu + result.sigma)
		}).length * 100)/result.values.length
	}

}
