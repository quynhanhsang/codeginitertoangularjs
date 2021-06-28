/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('UserController', ['$rootScope','$scope', '$http', '$timeout', '$uibModal',
function($rootScope, $scope, $http, $timeout, $uibModal) {

    var vm = this;
    vm.loading = false;
    vm.data =[];
    vm.loadData = function(){
        $http({
            method: 'POST',
            url: 'http://localhost:8080/project-root/application/user'
        }).then(function successCallback(response) {
            debugger;
            vm.loading = true;
            vm.data = response.data;
            console.log(vm.data);
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
        $http.post('http://localhost:8080/project-root/application/user/delete', data.id)
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