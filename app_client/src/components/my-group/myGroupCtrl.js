require('./my_group.scss')
angular
	.module('psApp')
	.controller('myGroupCtrl', myGroupCtrl)

myGroupCtrl.$inject = ['$q','authentication','$$profiles', '$$groups','$$props','flashAlert', '$scope']

function myGroupCtrl($q,authentication, $$profiles, $$groups, $$props, flashAlert, $scope) {
	var vm = this

	vm.group = {
		id: authentication.currentUser().group
	}
	vm.props = []
	vm.tableMode = false
	vm.promise = null

	vm.findProp = findProp
	vm.getActuallyVal = getActuallyVal
	vm.propCount = propCount
	vm.save = save

	init()

	function init(){
		console.log(authentication.currentUser())
		//authentication.actualizeUserInfo()

		vm.createTableBody = createTableBody

		vm.group = {
			id: authentication.currentUser().group
		}

		if(vm.group.id){
			vm.promise = $q.all({
				members: $$profiles.getList({
					group: vm.group.id,
					role: 'student'
				}),
				group: 	$$groups.getList({
					id: vm.group.id
				}),
				props: $$props.getList()
			}).then(data=>{
			/*	console.log(data)*/
				vm.group.members = data.members.data
				vm.group.groupData = data.group.data[0]
				vm.props = data.props.data
				console.log(vm.props, vm.group.members)
			})

		}
		else{
			//console.log(authentication.currentUser())
		}
	}

	function createTableBody(userProps){
		let result = []
			vm.props.forEach(prop=>{
				result.push(userProps.find(value=>value._id == prop._id))
			})
		return result
	}

	function getMembers(){
		$$profiles.getList({
			group: vm.group.id,
			role: 'student'
		}).then(resp => {
			vm.group.members = resp.data

		})
	}

	function getGroup(){
		$$groups.getList({
			id: vm.group.id
		}).then(resp => {
			vm.group.groupData = resp.data[0]
		})
	}

	function getProps(){
		$$props.getList()
			.then(resp => {
			vm.props = resp.data
		})
	}

	function findProp(propId, props){
		let prop = props.find(prop=>prop._id==propId)
		if(!prop){
			prop = {
				_id: propId,
				data: [
					{
						date: new Date(),
						value: null,
						actually: true
					}
				],
				actuallVal:null
			}
			props.push(prop)
		}
		return prop
	}

	function getActuallyVal(prop){
		return prop.data.find(rec=>rec.actually)
	}

	function propCount(props){
		return props.filter(prop=>!!prop.actuallVal).length
	}

	function save(member){
		member.properties.forEach(prop=>{
			prop.data.find(prop=>prop.actually).actually = false
			prop.data.push({
				actually: true,
				date: new Date(),
				value: prop.actuallVal
			})
		})

		$$profiles.put({
			id: member._id,
			properties: member.properties
		}).then(resp=>{
			flashAlert.success(resp.data.message)
		}).catch(err=>{
			flashAlert.error(err.data.message)
			init()
		})
	}

}
