var app = app || {};
(function () {
    app.checkValidateForm = function (id) {
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

    app.locdau = function (str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/–|!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
        str = str.replace(/-+-/g, "-");
        str = str.replace(/^\-+|\-+$/g, "");
        return str;
    };

    app.isNullOrEmpty = function (val) {
        if (val !== null && val !== undefined && val !== "") {
            return false;
        } else if (val === 0) {
            return false;
        } else {
            return true;
        }
    };
})();