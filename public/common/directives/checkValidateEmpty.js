(function () {
    MetronicApp.directive('labelNotempty', [
        function () {
            return function (scope, element, attrs) {
                var newDirective = angular.element('<span class="font-red">(*)</span>');
                element.append(newDirective);
            };
        }
    ]);
})();

(function () {
    MetronicApp.directive('checkValidateEmpty', ['appSession',
        function (appSession) {
            return {
                restrict: 'E',
                replace: true,
                template: `<small ng-show="checkValidate()" class="help-block" ng-class="checkValidate() ? 'custom-error-validate':''" style="color: #e40909;display: none;">{{mess}}</small>`,
                scope: {
                    datacheck: '=?',
                    type: '=?'
                },
                link: function ($scope, element, attrs) {
                    $scope.checkValidate = function () {
                        var _form = $scope.datacheck;
                        if (app.IsNullOrEmpty(_form)) {
                            $scope.mess = "Không được để trống trường này";
                            return true;
                        }
                        if ($scope.type == 'email' && !app.validateEmail(_form)) {
                            $scope.mess = "Email không đúng định dạng";
                            return true;
                        }
                    };
                }
            };
        }
    ]);
})();


