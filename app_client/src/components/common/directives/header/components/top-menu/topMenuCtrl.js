
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
        access: ['admin', 'org', 'psycholog']
      },
      {
        title:'Участники',
        href:'/members',
        access: ['admin','psycholog', 'org']
      },
      {
        title:'Группы',
        href:'/groups',
        access: ['admin', 'org']
      },
      {
        title:'Руководство группой',
        href:'/mygroup',
        access: ['psycholog']
      },
      {
        title:'Характеристики',
        href:'/props',
        access: ['admin','psycholog', 'org']
      }
    ]

    getPages()

    function getPages() {
      vm.accessPages.forEach(page=>{
        if(page.access.includes(vm.userRole)){
          vm.pages.push(page)
          console.log(page)
        }else{
         // console.log(page.access.includes(vm.userRole),page.access, vm.userRole)
        }
      })
      //console.log(vm.pages)
    }

  }
