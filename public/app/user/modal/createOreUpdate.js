/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.user.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'user',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, user) {

    var vm = this;
    vm.loading = false;
    vm.data ={
        level: 1,
    };

    vm.save = function () {
       
        if (!app.checkValidateForm("#userCreateOrEditForm")) {
            app.error('Mời nhập dữ liệu !!!');
            return false;
        }
        debugger;
        $http.post(ApiUrl+'/user/createOrUpdate', vm.data)
        .then(function(response){
            console.log(response);
            
            $uibModalInstance.close();
        }, function(){

        });

    };
    vm.loadData = function(){
        $http({
            method: 'POST',
            url: ApiUrl+'/user/getRollAllDLL'
        }).then(function (response) {
            vm.loading = true;
            var arrayRole = response.data;
            var arrayUserID = (vm.data.userID) ? JSON.parse(vm.data.userID) : null;
            if(arrayUserID){
                var i=0;
                arrayRole.forEach((item)=>{
                    arrayUserID.forEach((items)=>{
                        i++;
                        if(item.id == items){
                            item.selected =  true
                        }else{
                        }
                    });
                });
            }
            
            vm.temp = vm.data_tree(arrayRole, null);
            console.log(vm.temp, 'vm.temp');
            vm.treeView(vm.temp);
            $('#tree_vaitro').on("changed.jstree", function (e, data) {
                vm.data.userID = JSON.stringify(data.selected);
            });
        }, function(response) {
    
        });
    }

    vm.data_tree = function(data, itemNew){
        var temp = [] 
        //var filter = data.filter(x =>x.parentId == parentId);
        if(data.length > 0){
            data.forEach((item) => {
                let obj = {
                    id: item.id,
                    text: item.roleName,
                    key: item.id,
                    state: {
                        selected: item.selected
                    }
                }
                itemNew = obj;
                temp.push(itemNew);
                //vm.data_tree(data, itemNew);
            });
        }
        return temp;
    }

    vm.treeView = function (data) {
        $timeout(function(){
            $('#tree_vaitro').jstree({
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