/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.cauhinhchung.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'cauhinh',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, cauhinh) {

    var vm = this;
    vm.loading = false;
    vm.data ={};
    vm.temp = [];

    vm.save = function () {
        if (!app.checkValidateForm("#roleCreateOrEditForm")) {
            app.error('Không được để trống');
            return false;
        }
        
        $http.post(ApiUrl+'/role/createOrUpdate', vm.data)
        .then(function(response){
            app.success('Lưu thành công');
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
        }
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);