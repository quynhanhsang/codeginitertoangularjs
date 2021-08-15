/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$rootScope','$scope', '$http', '$timeout', '$uibModal', '$state',
function($rootScope, $scope, $http, $timeout, $uibModal, $state) {
    var vm = this;
    vm.menu = [];
    vm.getMenu = function(){
        $http.get(ApiUrl+'/navigation').then(function(response) {
            // vm.loading = true;
            vm.menu = response.data;
            console.log(vm.menu, 'meny');
        }, function(response) {
    
        });
    }
    

    vm.goToPage = function(url){
        $state.go(url);
    }
    
    vm.permission = function($data){
        var data = abp.arrayPemission.filter(x=>x.permissionKey == $data);
        if(data.length>0){
            return true;
        }else{
            return false;
        }
    }

    var init = function(){

        vm.getMenu();
    }

    init();

    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);
