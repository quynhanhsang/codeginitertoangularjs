/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.uploadFile.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'cauhinh',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, cauhinh) {

    var vm = this;
    vm.loading = false;
    vm.data = {
        isActive: true,
    };

    vm.getLink = function () {
        vm.data.target = app.locdau(vm.data.title);
        vm.data.seoAlias = app.locdau(vm.data.title);
        vm.data.seoTitle = vm.data.title;
    }

    vm.save = function () {
        if (!app.checkValidateForm("#categoryCreateOrEditForm")) {
            app.error('Không được để trống');
            return false;
        }
        $http.post(ApiUrl+'/category/createOrUpdate', vm.data)
        .then(function(response){
            app.success('Lưu thành công');
            console.log(response , 'sang');
            $uibModalInstance.close();
        }, function(){

        });

    };

    vm.categoryOptions = {
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    // abp.services.app.category.allCategoryToDDL().done(function (result) {
                    //     options.success(result);
                    // });
                    $http.get(ApiUrl+'/category/categoryGetAllDLL')
                    .then(function(response){
                        debugger;
                        options.success(response.data.filter(x=>x.id != vm.data.id));
                    }, function(){

                    });
                }
            }
        }),
        dataValueField: "id",
        dataTextField: "title",
        optionLabel: 'Chọn ...',
        filter: "contains",
    };

    vm.categoryTypeOptions = {
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    // abp.services.app.category.allCategoryToDDL().done(function (result) {
                    //     options.success(result);
                    // });
                    $http.get(ApiUrl+'/categorytype/getAllDLL')
                    .then(function(response){
                        debugger;
                        options.success(response.data.filter(x=>x.id != vm.data.id));
                    }, function(){

                    });
                }
            }
        }),
        dataValueField: "typeCode",
        dataTextField: "title",
        optionLabel: 'Chọn ...',
        filter: "contains",
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    var init = function () {
        if (cauhinh != null) {
            vm.data = cauhinh;
        }
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);