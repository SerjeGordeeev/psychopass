
  angular
    .module('psApp')
    .controller('topMenuCtrl', topMenuCtrl)

  topMenuCtrl.$inject = ['$location','authentication']

  function topMenuCtrl($location,authentication) {
    var vm = this

    vm.pages = []
    vm.userRole = authentication.currentUser().role

    vm.activePage = $location.path()

    vm.accessPages = [
      {
        title:'Психологи',
        href:'/psychologs',
        access: ['admin', 'org']
      },
      {
        title:'Организации',
        href:'/organisations',
        access: ['admin', 'org']
      },
      {
        title:'Участники',
        href:'/members',
        access: ['admin', 'org']
      },
      {
        title:'Группы',
        href:'/groups',
        access: ['admin', 'org']
      },
      {
        title:'Руководство группой',
        href:'/my_group',
        access: ['psycholog']
      },
      {
        title:'Характеристики',
        href:'/props',
        access: ['admin','psycholog', 'org']
      },
      {
        title:'Администрирование',
        href:'/admin',
        access: ['admin']
      }
    ]

    getPages()

    function getPages() {
      vm.accessPages.forEach(page=>{
        if(page.access.includes(vm.userRole)){
          vm.pages.push(page)
          //console.log(page)
        }else{
         // console.log(page.access.includes(vm.userRole),page.access, vm.userRole)
        }
      })
      //console.log(vm.pages)
    }

  }
