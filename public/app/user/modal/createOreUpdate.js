/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.user.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'user',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, user) {

    var vm = this;
    vm.loading = false;
    vm.data ={
        level: 1,
        userId: 1,
    };

    vm.save = function () {
        if (!app.checkValidateForm("#userCreateOrEditForm")) {
            //abp.notify.error('Mời nhập dữ liệu !!!');
            return false;
        }
        $http.post('http://localhost:8080/project-root/application/user/createOrUpdate', vm.data)
        .then(function(response){
            console.log(response)
            $uibModalInstance.close();
        }, function(){

        });

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    var init = function () {
        if (user != null) {
            vm.data = user;
        }
    };
    init();

    
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);