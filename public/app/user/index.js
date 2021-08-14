/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('UserController', ['$rootScope','$scope', '$http', '$timeout', '$uibModal','$ngConfirm',
function($rootScope, $scope, $http, $timeout, $uibModal, $ngConfirm) {
    var vm = this;
    vm.loading = false;
    vm.data =[];
    vm.currentPage = 1;

    vm.filter = {
        filter: null
    };

    vm.loadData = function(){
        $http.post(ApiUrl+'/user/getList', vm.filter)
        .then(function(response){
            //app.success('success');
            debugger;
            vm.data = response.data;
            
            vm.data.forEach(function(item){
                item.creatTime = new Date(item.creatTime);
            })
            vm.arrCheckbox = [];
        }, function(){

        });
    }

    vm.addUser = function(data){
        var dataCopy = angular.copy(data);
        openCreateOrEditadvModal(dataCopy);
    }
    
    vm.editUser = function(data){
        var dataCopy = angular.copy(data);
        openCreateOrEditadvModal(dataCopy);
    }
    vm.deleteUser = function(data){
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
                        $http.post(ApiUrl+'/user/delete', data.id)
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

    vm.deleteAllUser = function(){
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
                        

                        $http.post(ApiUrl+'/user/deleteAll', vm.arrCheckbox)
                        .then(function(response){
                            console.log(response, 'response');
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

    //Check All
    {

        vm.arrCheckbox = [];

        vm.clickAllCheckbox = function () {
            vm.arrCheckbox = [];
            if (vm.checkboxAll) {
                vm.data.forEach(function (dat) {
                    vm.arrCheckbox.push(dat);
                    dat.checkbox = true;
                });
            }
            else {
                vm.data.forEach( function (dat) {
                    dat.checkbox = false;
                });
            }
        };

        vm.clickCheckbox = function (ite) {
            if (ite.checkbox) {
                vm.arrCheckbox.push(ite);
                if (vm.arrCheckbox.length == vm.data.length) {
                    vm.checkboxAll = true;
                }
            }
            else {
                var idx = vm.arrCheckbox.indexOf(ite);
                if (idx >= 0)
                    vm.arrCheckbox.splice(idx, 1);
                vm.checkboxAll = false;
            }
        };
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

    var init = function () {
        vm.loadData();
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);