/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.categorytype.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'cauhinh',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, cauhinh) {

    var vm = this;
    vm.loading = false;
    vm.data = {
        isActive: true,
    };

    vm.save = function () {
        if (!app.checkValidateForm("#categorytypeCreateOrEditForm")) {
            app.error('Không được để trống');
            return false;
        }
        debugger;
        $http.post(ApiUrl+'/categorytype/createOrUpdate', vm.data)
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
        }
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);