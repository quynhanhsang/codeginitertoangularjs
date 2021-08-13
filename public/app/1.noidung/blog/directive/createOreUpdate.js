(function () {
    /* Setup Layout Part - Header */
    angular.module('MetronicApp').controller('app.noidung.blog.directive.createOreUpdate', 
    ['$rootScope','$scope', '$http', '$timeout', '$stateParams', '$state', '$uibModal',
    function($rootScope, $scope, $http, $timeout, $stateParams,  $state, $uibModal) {

        var vm = this;
        vm.loading = false;
        vm.data = {
            isActive: true,
        };

        vm.getLink = function () {
            vm.data.seoAlias = app.locdau(vm.data.title);
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
                $state.go('baiviet');
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
            debugger;
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

        vm.createUpdateImage = function(data){
            openCreateOrEditImageModal(null);
        }

        function openCreateOrEditImageModal(data) {
        
            var modalInstance = $uibModal.open({
                templateUrl: baseUrl+'/app/uploadFile/createOreUpdate.html',
                controller: 'app.uploadFile.modal.createOreUpdate as vm',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    cauhinh: data
                }
            });
    
            modalInstance.result.then(function (result) {
                //vm.loadData();
            });
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