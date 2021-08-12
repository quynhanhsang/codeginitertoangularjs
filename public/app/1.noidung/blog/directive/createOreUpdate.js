(function () {
    /* Setup Layout Part - Header */
    angular.module('MetronicApp').controller('app.noidung.blog.directive.createOreUpdate', 
    ['$rootScope','$scope', '$http', '$timeout', '$stateParams', '$state',
    function($rootScope, $scope, $http, $timeout, $stateParams,  $state) {

        var vm = this;
        vm.loading = false;
        vm.data = {
            isActive: true,
        };

        vm.getLink = function () {
            vm.data.target = app.locdau(vm.data.title);
            vm.data.seoTitle = vm.data.title;
        }

        vm.save = function () {
            if (!app.checkValidateForm("#blogCreateOrEditForm")) {
                app.error('Không được để trống');
                return false;
            }
            $http.post(ApiUrl+'/blog/createOrUpdate', vm.data)
            .then(function(response){
                app.success('Lưu thành công');
                console.log(response , 'sang');
                //$uibModalInstance.close();
            }, function(){

            });

        };
        vm.delete = function(){
            $http.post(ApiUrl+'/blog/delete', $stateParams.id)
                .then(function(response){
                    $state.go('baiviet');
                }, function(){
        
                });
        }
        vm.cancel = function () {
            $uibModalInstance.dismiss();
        };
        
        vm.loadDataById = function(){
            if (!app.isNullOrEmpty($stateParams.id)) {
                $http.post(ApiUrl+'/blog/getById', $stateParams.id)
                .then(function(response){
                    if(response.data.length > 0){
                        vm.data = response.data[0];
                    }else{
                        $state.go('baiviet');
                    }
                   
                }, function(){
        
                });
            }else{
                
            }
        }
        var init = function () {
            vm.loadDataById();
        };
        init();

        $scope.$on('$viewContentLoaded', function() {   
            // initialize core components
            App.initAjax();
            
        });
    }]);
})();