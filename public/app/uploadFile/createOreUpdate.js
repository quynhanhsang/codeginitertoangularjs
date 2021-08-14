/* Setup Layout Part - Header */
angular.module('MetronicApp').controller('app.uploadFile.modal.createOreUpdate', ['$rootScope', '$uibModalInstance','$scope', '$http', '$timeout', 'cauhinh',
function($rootScope, $uibModalInstance, $scope, $http, $timeout, cauhinh) {

    var vm = this;
    vm.loading = false;
    vm.data = {
        isActive: true,
    };

    vm.getLink = function () {
        vm.data.target = app.locdau(vm.data.title);
        vm.data.seoAlias = app.locdau(vm.data.title);
        vm.data.seoTitle = vm.data.title;
    }

    vm.save = function () {
        if (!app.checkValidateForm("#categoryCreateOrEditForm")) {
            app.error('Không được để trống');
            return false;
        }
        $http.post(ApiUrl+'/category/createOrUpdate', vm.data)
        .then(function(response){
            app.success('Lưu thành công');
            console.log(response , 'sang');
            $uibModalInstance.close();
        }, function(){

        });

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
            url: "https://localhost/duan/application/upload/file",
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
            }
          
          });
        
        var minSteps = 6,
            maxSteps = 60,
            timeBetweenSteps = 100,
            bytesPerStep = 100000;
          
        dropzone.uploadFiles = function(files) {
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
        }
    }

    vm.submit = function(){
        $('.imgUploadButton').html('Uploading ...');
        $('.imgUploadButton').prop('Disabled');
        debugger;
        //e.preventDefault();
        if ($('#file').val() == '') {
            $('.imgUploadButton').html('Uploading ...');
            $('.imgUploadButton').prop('enabled');
            document.getElementById("image_form").reset();
        } else {
            $.ajax({
                url: ApiUrl+"/file/uploads",
                method: "POST",
                data: new FormData(this),
                processData: false,
                contentType: false,
                cache: false,
                dataType: "json",
                success: function (res) {
                    console.log(res)
                    if (res.success == true) {
                        $('#imgFileUpload').attr('src', 'https://via.placeholder.com/400');
                        $('#statusMsg').html(res.msg);
                        $('#statusMessage').show();
                    } else if (res.success == false) {
                        $('#statusMsg').html(res.msg);
                        $('#statusMessage').show();
                    }
                    setTimeout(function () {
                        $('#statusMsg').html('');
                        $('#statusMessage').hide();
                    }, 5000);

                    $('.imgUploadButton').html('Upload');
                    $('.imgUploadButton').prop('Enabled');
                    document.getElementById("image_form").reset();
                }
            });
        }
    }
    var init = function () {
        if (cauhinh != null) {
            vm.data = cauhinh;
        }
        $timeout(function(){
            vm.uploadFile();
        });
    };
    init();

    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
        
    });

}]);