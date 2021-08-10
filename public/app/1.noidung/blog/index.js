/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.noidung.blog.index', ['$rootScope','$scope', '$http', '$timeout', '$uibModal','$ngConfirm',
function($rootScope, $scope, $http, $timeout, $uibModal, $ngConfirm) {
    var vm = this;
    vm.loading = false;
    vm.data =[];
    vm.listMenu = [];
    vm.currentPage = 1;
    vm.show_mode = null;

    vm.filter = {
        filter: null
    };

    vm.loadData = function(){
        $http.post(ApiUrl+'/category/getList', vm.filter)
        .then(function(response){
            //app.success('success');
            vm.data = response.data;
            // vm.data.forEach(function(item){
            //     item.creatTime = new Date(item.creatTime);
            // })
            vm.arrCheckbox = [];
        }, function(){

        });
    }

    vm.loadMenu = function(){
        $http.get(ApiUrl+'/category/menuGetAllDLL')
        .then(function(response){
            vm.listMenu = response.data;
        }, function(){

        });
    }

    vm.addBlog = function(data){
        
        vm.show_mode = "addOrEdit";
    }
    
    vm.editCauHinhChung = function(data){
        var dataCopy = angular.copy(data);
        
    }
    vm.deleteCauHinhChung = function(data){
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
                        $http.post(ApiUrl+'/category/delete', data.id)
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

    vm.deleteAll = function(){
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
                        

                        $http.post(ApiUrl+'/category/deleteAll', vm.arrCheckbox)
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
    

    var init = function () {
        vm.loadData();
        vm.loadMenu();
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);