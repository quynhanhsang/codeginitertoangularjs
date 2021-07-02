/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$rootScope','$scope', '$http', '$timeout', '$uibModal', '$state',
function($rootScope, $scope, $http, $timeout, $uibModal, $state) {
    var vm = this;
    vm.menu = [];
    vm.getMenu = function(){
        $http({
            method: 'POST',
            url: 'http://localhost:8080/project-root/application/navigation'
        }).then(function successCallback(response) {
            // vm.loading = true;
            vm.menu = response.data;
            console.log(vm.menu);
        }, function errorCallback(response) {
    
        });
    }
    vm.getMenu();

    vm.goToPage = function(url){
        $state.go(url);
    }
    
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);
