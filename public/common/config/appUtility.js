var app = app || {};
(function () {
    app.checkValidateForm = function (id) {
        var _check = ($(id).find(".custom-error-validate").length) || $(id).find(".help-block").is(":visible");
        $(id).find(".custom-error-validate").show();
        return !_check;
    }

})();