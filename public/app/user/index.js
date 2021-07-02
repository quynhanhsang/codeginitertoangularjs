/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('UserController', ['$rootScope','$scope', '$http', '$timeout', '$uibModal',
function($rootScope, $scope, $http, $timeout, $uibModal) {
    console.log('giang');
    var vm = this;
    vm.loading = false;
    vm.data =[];
    vm.loadData = function(){
        
        $http({
            method: 'POST',
            url: ApiUrl+'/user'
        }).then(function successCallback(response) {
            vm.loading = true;
            vm.data = response.data;
            console.log(vm.data, 'vm.data');
        }, function errorCallback(response) {
    
        });
    }

    vm.loadData();

    vm.addUser = function(data){
        var dataCopy = angular.copy(data);
        openCreateOrEditadvModal(dataCopy);
    }
    
    vm.editUser = function(data){
        var dataCopy = angular.copy(data);
        openCreateOrEditadvModal(dataCopy);
    }
    vm.deleteUser = function(data){
        $http.post(ApiUrl+'/user/delete', data.id)
        .then(function(response){
            console.log(response);
            vm.loadData();
        }, function(){

        });
    }
    function openCreateOrEditadvModal(data) {
        var modalInstance = $uibModal.open({
            templateUrl: baseUrl+'/app/user/modal/createOreUpdate.html',
            controller: 'app.user.modal.createOreUpdate as vm',
            backdrop: 'static',
            resolve: {
                user: data
            }
        });

        modalInstance.result.then(function (result) {
            vm.loadData();
        });
    }
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);