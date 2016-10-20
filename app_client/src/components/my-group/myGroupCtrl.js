require('./my_group.scss')
angular
	.module('psApp')
	.controller('myGroupCtrl', myGroupCtrl)

myGroupCtrl.$inject = ['authentication','$$profiles', '$$groups','$$props','flashAlert']

function myGroupCtrl(authentication, $$profiles, $$groups, $$props, flashAlert) {
	var vm = this

	vm.group = {
		id: authentication.currentUser().group
	}
	vm.props = []

	vm.findProp = findProp
	vm.propCount = propCount
	vm.save = save

	init()

	function init(){

		if(vm.group.id){
			getMembers()
			getGroup()
			getProps()
		}
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
		let field = props.find(prop=>prop._id==propId)
		if(field) return field
		else{
			props.push({
				_id: propId,
				value: null
			})
			return props[props.length-1]
		}
	}

	function propCount(props){
		return props.filter(prop=>!!prop.value).length
	}

	function save(member){
		$$profiles.put({
			id: member._id,
			properties: member.properties
		}).then(resp=>{
			flashAlert.success(resp.data.message)

		})
	}

}
