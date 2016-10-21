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
	vm.getActuallyVal = getActuallyVal
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

/*	function findProp(propId, props, with_actually){
		let field = props.find(prop=>prop._id==propId)
		if(!with_actually) return field
		if(field) field = field.data.find(a=> a.actually == true)
		if(field) return field
		else{
			props.push({
				_id: propId,
				data: [
					{
						date: new Date(),
						value: null,
						actually: true
					}
				]
			})
			return props[props.length-1]
		}
	}*/

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
