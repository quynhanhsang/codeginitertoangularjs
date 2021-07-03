/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.role.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'role',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, role) {

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

    vm.loadData = function(){
        $http({
            method: 'POST',
            url: ApiUrl+'/getpermission'
        }).then(function (response) {
            
            vm.loading = true;
            var arrayPermission = response.data;
            var arrayPermissionID = (vm.data.permissionID) ? JSON.parse(vm.data.permissionID) : null;
            if(arrayPermissionID){
                var i=0;
                arrayPermission.forEach((item)=>{
                    arrayPermissionID.forEach((items)=>{
                        i++;
                        if(item.id == items){
                            item.selected =  true
                        }else{
                        }
                    });
                });
            }
            
            vm.temp = vm.data_tree(arrayPermission, null, 0,0);
            vm.treeView(vm.temp);
            $('#tree_2').on("changed.jstree", function (e, data) {
                vm.data.permissionID = JSON.stringify(data.selected);
            });
        }, function(response) {
    
        });
    }
    
    vm.data_tree = function(data, itemNew, parentId = 0, level = 0){
        var temp = [] 
        if(parentId == 0){
            var filter = data.filter(x =>x.parentId == parentId);
            if(filter.length > 0){
                filter.forEach((item) => {
                    let obj = {
                        id: item.id,
                        text: item.permissionName,
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
                        text: item.permissionName,
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
            $('#tree_2').jstree({
                'plugins': ["wholerow", "checkbox", "types"],
                'core': {
                    "themes" : {
                        "responsive": false
                    },    
                    'data': data
                },
                "types" : {
                    "default" : {
                        "icon" : "fa fa-folder icon-state-warning icon-lg"
                    },
                    "file" : {
                        "icon" : "fa fa-file icon-state-warning icon-lg"
                    }
                }
            });
        });
    }
    
    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    var init = function () {
        vm.loadData();
        if (role != null) {
            vm.data = role;
        }
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });
}]);