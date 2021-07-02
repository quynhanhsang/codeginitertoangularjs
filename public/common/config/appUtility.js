var app = app || {};
(function () {
    app.checkValidateForm = function (id) {
        debugger;
        var _check = ($(id).find(".custom-error-validate").length);
        $(id).find(".custom-error-validate").show();
        return !_check;
    }

    app.toastrOption = function(){
        return toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }
    // for success - green box
    app.success = function(option){
        let options = option ? option : 'Success messages';
        app.toastrOption();
        toastr.success(options);
        
    }
    
    // for errors - red box
    app.error = function(option){
        let options = option ? option : 'errors messages';
        app.toastrOption();
        toastr.error(options);
    }
    
    // for warning - orange box
    app.warning = function(option){
        let options = option ? option : 'warning messages';
        app.toastrOption();
        toastr.warning(options);
    }
    
    // for info - blue box
    app.info = function(option){
        let options = option ? option : 'info messages';
        app.toastrOption();
        toastr.info(options);
    }
})();