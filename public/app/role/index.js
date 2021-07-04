/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.role.index', ['$rootScope','$scope', '$http', '$timeout', '$uibModal', '$ngConfirm', 'appConfig',
function($rootScope, $scope, $http, $timeout, $uibModal, $ngConfirm, $appConfig) {

    var vm = this;
    vm.loading = false;
    vm.data =[];
    vm.currentPage = 1;

    vm.filter = {
        filter: null
    };
    debugger;
    m = $appConfig;
    console.log(m, 'sang');
    vm.loadData = function(){
        $http.post(ApiUrl+'/role/getList', vm.filter)
        .then(function(response){
            //app.success('success');
            vm.data = response.data;
            console.log(vm.data, 'vm.dat')
        }, function(){

        });
    }
    

    vm.addRole = function(data){
        var dataCopy = angular.copy(data);
        openCreateOrEditModal(dataCopy);
    }
    
    vm.editRole = function(data){
        var dataCopy = angular.copy(data);
        openCreateOrEditModal(dataCopy);
    }

    vm.deleteRole = function(data){
        $ngConfirm({
            theme: 'modern',
            title: '',
            icon: "fa fa-warning",
            content: '<span class="text-center" style="display:block">Bạn có muốn xóa không ?</span>',
            scope: $scope,
            buttons: {
                ok: {
                    text: "Có",
                    btnClass: 'btn-primary',
                    keys: ['enter'],
                    action: function (scope) {
                        $http.post(ApiUrl+'/role/delete', data.id)
                        .then(function(response){
                            console.log(response);
                            vm.loadData();
                        }, function(){
                
                        });
                    }
                },
                close: {
                    text: "Đóng",
                },
            },
        });
        
    }

    vm.search =  function(){
        vm.loadData();
    }
    function openCreateOrEditModal(data) {
        var modalInstance = $uibModal.open({
            templateUrl: baseUrl+'/app/role/modal/createOreUpdate.html',
            controller: 'app.role.modal.createOreUpdate as vm',
            backdrop: 'static',
            resolve: {
                role: data
            }
        });

        modalInstance.result.then(function (result) {
            vm.loadData();
        });
    }

    vm.setSelected = function () {
        vm.setSelected(0);
    }

    var init = function () {
        vm.loadData();
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);