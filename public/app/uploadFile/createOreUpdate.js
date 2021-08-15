/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.uploadFile.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'cauhinh', '$ngConfirm',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, cauhinh, $ngConfirm) {

    var vm = this;
    vm.loading = false;
    vm.data = {
        isActive: true,
    };

    vm.dataCheck = {

    }

    vm.selectedPeeps = {};

    vm.filter = {
        filter: null
    };

    vm.loadData = function(){
        vm.loading = true;
        $http.post(ApiUrl+'/file/getListFile', vm.filter)
        .then(function(response){
            vm.data = response.data;
            vm.arrCheckbox = [];
        }, function(){

        }).finally(function () {
            vm.loading = false;
        });
    }

    vm.checkImage = function(data){
        vm.dataCheck = angular.copy(data);
        if(vm.selectedPeeps[data.id]) {
            vm.selectedPeeps[data.id] = false;
            vm.dataCheck = {};
        } else {
            vm.selectedPeeps[data.id] = true;
        }
    }

    vm.deleteImage = function(data){
        $ngConfirm({
            theme: 'modern',
            title: '',
            icon: "fa fa-warning",
            content: '<span class="text-center" style="display:block">Bạn có muốn xóa không ?</span>',
            scope: $scope,
            buttons: {
                ok: {
                    text: "Có",
                    btnClass: 'btn-primary',
                    keys: ['enter'],
                    action: function (scope) {
                        $http.post(ApiUrl+'/file/delete', data.id)
                            .then(function(response){
                                vm.loadData();
                            }, function(){

                            });
                    }
                },
                close: {
                    text: "Đóng",
                },
            },
        });
    }

    vm.getLink = function () {
        vm.data.target = app.locdau(vm.data.title);
        vm.data.seoAlias = app.locdau(vm.data.title);
        vm.data.seoTitle = vm.data.title;
    }

    vm.save = function () {
        // if (!app.checkValidateForm("#categoryCreateOrEditForm")) {
        //     app.error('Không được để trống');
        //     return false;
        // }
        $uibModalInstance.close(vm.dataCheck);
    };

    vm.categoryOptions = {
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    // abp.services.app.category.allCategoryToDDL().done(function (result) {
                    //     options.success(result);
                    // });
                    $http.get(ApiUrl+'/category/categoryGetAllDLL')
                    .then(function(response){
                        options.success(response.data.filter(x=>x.id != vm.data.id));
                    }, function(){

                    });
                }
            }
        }),
        dataValueField: "id",
        dataTextField: "title",
        optionLabel: 'Chọn ...',
        filter: "contains",
    };

    vm.categoryTypeOptions = {
        dataSource: new kendo.data.DataSource({
            transport: {
                read: function (options) {
                    // abp.services.app.category.allCategoryToDDL().done(function (result) {
                    //     options.success(result);
                    // });
                    $http.get(ApiUrl+'/categorytype/getAllDLL')
                    .then(function(response){
                        debugger;
                        options.success(response.data.filter(x=>x.id != vm.data.id));
                    }, function(){

                    });
                }
            }
        }),
        dataValueField: "typeCode",
        dataTextField: "title",
        optionLabel: 'Chọn ...',
        filter: "contains",
    };

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    vm.uploadFile = function(){
        var dropzone = new Dropzone('#my-dropzone', {
            url: ApiUrl+"/file/muntiluploads",
            previewTemplate: document.querySelector('#preview-template').innerHTML,
            parallelUploads: 2,
            thumbnailHeight: 120,
            thumbnailWidth: 120,
            maxFilesize: 3,
            filesizeBase: 1000,
            thumbnail: function(file, dataUrl) {
              if (file.previewElement) {
                file.previewElement.classList.remove("dz-file-preview");
                var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                for (var i = 0; i < images.length; i++) {
                  var thumbnailElement = images[i];
                  thumbnailElement.alt = file.name;
                  thumbnailElement.src = dataUrl;
                }
                setTimeout(function() { file.previewElement.classList.add("dz-image-preview"); }, 1);
              }
            },
            success: function(file, response){
                if(response.success == true){
                    console.log(response, 'file');
                    app.success(response.msg);
                }else{
                    app.error(response.msg);
                }
            }
          });
        
        var minSteps = 6,
            maxSteps = 60,
            timeBetweenSteps = 100,
            bytesPerStep = 100000;
        dropzone.on("addedfile", function(files) {
            var self = this;
            for (var i = 0; i < files.length; i++) {
            
                var file = files[i];
                totalSteps = Math.round(Math.min(maxSteps, Math.max(minSteps, file.size / bytesPerStep)));
            
                for (var step = 0; step < totalSteps; step++) {
                var duration = timeBetweenSteps * (step + 1);
                setTimeout(function(file, totalSteps, step) {
                    return function() {
                    file.upload = {
                        progress: 100 * (step + 1) / totalSteps,
                        total: file.size,
                        bytesSent: (step + 1) * file.size / totalSteps
                    };
            
                    self.emit('uploadprogress', file, file.upload.progress, file.upload.bytesSent);
                    if (file.upload.progress == 100) {
                        file.status = Dropzone.SUCCESS;
                        self.emit("success", file, 'success', null);
                        self.emit("complete", file);
                        self.processQueue();
                        //document.getElementsByClassName("dz-success-mark").style.opacity = "1";
                    }
                    };
                }(file, totalSteps, step), duration);
                }
            }
        });  
    }

    var init = function () {
        if (cauhinh != null) {
            vm.data = cauhinh;
        }
        $timeout(function(){
            vm.uploadFile();
        });
        vm.loadData();
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });

}]);