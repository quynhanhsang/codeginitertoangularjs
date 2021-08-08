/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.vitriquangcao.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'cauhinh',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, cauhinh) {

    var vm = this;
    vm.loading = false;
    vm.dataSetting = {};
    vm.data = {
        isActive: true,
        settingType: 1
    };

    vm.save = function () {
        if (!app.checkValidateForm("#systemConfigCreateOrEditForm")) {
            app.error('Không được để trống');
            return false;
        }
        
        if (vm.data.settingType == '1') {
            vm.data.settingValue = vm.dataSetting.string;
        }
        if (vm.data.settingType == '2') {
            vm.data.settingValue = vm.dataSetting.image;
        }
        if (vm.data.settingType == '3') {
            vm.data.settingValue = vm.dataSetting.text;
        }
debugger;
        $http.post(ApiUrl+'/systemconfig/createOrUpdate', vm.data)
        .then(function(response){
            app.success('Lưu thành công');
            console.log(response , 'sang');
            $uibModalInstance.close();
        }, function(){

        });

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    var init = function () {
        if (cauhinh != null) {
            vm.data = cauhinh;
            debugger;
            if (vm.data.settingType == '1') {
                vm.dataSetting.string = vm.data.settingValue;
            }
            if (vm.data.settingType == '2') {
                vm.dataSetting.image = vm.data.settingValue;
            }
            if (vm.data.settingType == '3') {
                vm.dataSetting.text = vm.data.settingValue;
            }
        }
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);