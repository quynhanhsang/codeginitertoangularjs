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
        vm.temp = [];
        vm.getLink = function () {
            vm.data.seoAlias = app.locdau(vm.data.title);
            vm.data.seoTitle = vm.data.title;
        }
        vm.comback = function(){
            $state.go('baiviet');
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

        //danh mục
        vm.loadDataDanhMuc = function(){
            $http.get(ApiUrl+'/category/categoryGetAllDLL')
            .then(function (response) {
                vm.loading = true;
                debugger;
                var categotys = response.data;

                var categoryIds = (vm.data.categoryId) ? JSON.parse(vm.data.categoryId) : null;
                if(categoryIds){
                    var i=0;
                    categotys.forEach((item)=>{
                        categoryIds.forEach((items)=>{
                            i++;
                            if(item.id == items){
                                item.selected =  true
                            }else{
                            }
                        });
                    });
                }
                
                vm.temp = vm.data_tree(categotys, null, 0,0);
                vm.treeView(vm.temp);
                $('#tree_danhmuc').on("changed.jstree", function (e, data) {
                    vm.data.categoryId = JSON.stringify(data.selected);
                });
                
            }, function(response) {
        
            });


            // $http({
            //     method: 'POST',
            //     url: ApiUrl+'/category/categoryGetAllDLL'
            // })
        }
    
        vm.data_tree = function(data, itemNew, parentId = 0, level = 0){
            var temp = [] 
            if(parentId == 0){
                var filter = data.filter(x =>x.parentId == parentId);
                if(filter.length > 0){
                    filter.forEach((item) => {
                        let obj = {
                            id: item.id,
                            text: item.title,
                            level: level,
                            key: item.id,
                            state: {
                                selected: item.selected
                            },
                            children: []
                        }
                        itemNew = obj;
                        temp.push(itemNew);
                        vm.data_tree(data, itemNew, item.id, level);
                    });
                }
            }else if (parentId != null) {
                level++;
                var filter = data.filter(x => x.parentId == parentId);
                if (filter.length > 0) {
                    filter.forEach((item) => {
                        let obj = {
                            id: item.id,
                            text: item.title,
                            level: level,
                            key: item.id,
                            state: {
                                selected: item.selected
                            },
                            children: []
                        }
                        if (itemNew != null) {
                            itemNew.children.push(obj);
                        }
                        else {
                            itemNew = obj;
                            temp.push(itemNew);
                            vm.data_tree(data, itemNew, item.id, level);
                        }
    
                    });
                    if (itemNew != null) {
                        itemNew.children.forEach((item) => {
                            vm.data_tree(data, item, item.key, level);
                        });
                    }
    
                }
            }
            return temp;
        }
    
        vm.treeView = function (data) {
            $timeout(function(){
                $('#tree_danhmuc').jstree({
                    'plugins': ["wholerow", "checkbox", "types"],
                    'core': {
                        "themes" : {
                            "responsive": false,
                            "icons":false
                        },    
                        'data': data
                    },
                    "types" : {
                        "default" : {
                            "icon" : ""
                        },
                        "file" : {
                            "icon" : ""
                        }
                    }
                });
            });
        }
        //end danh mục

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

        vm.addDanhMuc = function(data){
            var dataCopy = angular.copy(data);
            openCreateOrEditDanhMucModal(dataCopy);
        }

        function openCreateOrEditDanhMucModal(data) {
        
            var modalInstance = $uibModal.open({
                templateUrl: baseUrl+'/app/2.danhmuc/category/modal/createOreUpdate.html',
                controller: 'app.danhmuc.category.modal.createOreUpdate as vm',
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    cauhinh: data
                }
            });
    
            modalInstance.result.then(function (result) {
                debugger;
                $('#tree_danhmuc').remove();
                $("#tree_danhmuc_item").append(`<div id="tree_danhmuc" class="tree_danhmuc margin-top-15"> </div>`);
                vm.loadDataDanhMuc();

            });
        }

        var init = function () {
            vm.loadDataById();
            vm.loadDataDanhMuc();
        };
        init();

        $scope.$on('$viewContentLoaded', function() {   
            // initialize core components
            App.initAjax();
            
        });
    }]);
})();