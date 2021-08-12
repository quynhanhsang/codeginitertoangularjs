/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.danhmuc.category.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'cauhinh',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, cauhinh) {

    var vm = this;
    vm.loading = false;
    vm.data = {
        isActive: true,
    };

    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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
        debugger;
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
                    $http.get(ApiUrl+'/category/createOrUpdate', vm.data)
                    .then(function(response){
                        options.success(result);
                    }, function(){

                    });
                }
            }
        }),
        dataValueField: "id",
        dataTextField: "title",
        optionLabel: app.localize('Chọn ...'),
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