(function () {
    MetronicApp.directive('checkValidate', ['$timeout',
        function ($timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: `<small  ng-class="isShowErrorLabel ? 'custom-error-validate':'ng-hide'" class="help-block cls-hide" >{{message}}</small>`,
                scope: {
                    validateOn: '=?', //submit(Default)  | dirty| blur

                    datacheck: '=?', // Bắt buộc
                    namecheck: '=?', // bắt buộc

                    requiredMessage: '=?', // null lấy thông báo Default
                    max: '=?',
                    maxMessage: '=?', // null lấy thông báo Default
                    min: '=?',
                    equals: '=?',
                 
                    equalsMessage: '=?', // null lấy thông báo Default
                    minMessage: '=?', // null lấy thông báo Default

                    customizer: '&', //Yêu cầu Input : Function    Output : object {value: bool, message:string}
                    parameter1: '=?', //tham số truyền vào nếu có
                    parameter2: '=?', //tham số truyền vào nếu có
                    errorStyle: '=?', //popover(Default) || label 
                },
                link: function ($scope, element, attrs) {
                    if (!$scope.validateOn)
                        $scope.validateOn = 'submit';
                    if (!$scope.errorStyle)
                        $scope.errorStyle = 'popover';

                    var formElement;
                    var parentElem = element[0].parentNode;
                    var elementToWatch;
                   // console.log(parentElem, "parentElem");
                    for (var i = 0; i < parentElem.childElementCount; i++) {
                        let elementTemp = parentElem.children[i];
                        // This ensures we are only watching form fields
                        if ('name' in elementTemp) {
                            if (elementTemp.attributes.name.value == $scope.namecheck) {
                                elementToWatch = elementTemp;
                                formElement = elementToWatch.form;


                                var _firstLoadMax = true;
                                $scope.$watch('max', function () {
                                    if (!_firstLoadMax)
                                        $scope.checkValidate();
                                    _firstLoadMax = false;
                                });
                                var _firstLoadMin = true;
                                $scope.$watch('min', function () {
                                    if (!_firstLoadMin)
                                        $scope.checkValidate();
                                    _firstLoadMin = false;
                                });
                                var _firstLoadEquals = true;
                                $scope.$watch('equals', function () {
                                    if (!_firstLoadEquals)
                                        $scope.checkValidate();
                                    _firstLoadEquals = false;
                                });
                              
                                var _firstLoadcustomizer = true;
                                if ($scope.customizer()) {
                                    $scope.$watch(function () {
                                        return elementToWatch.attributes.name.value + JSON.stringify($scope.customizer()($scope.parameter1, $scope.parameter2));
                                },
                                        function () {
                                        if (!_firstLoadcustomizer)
                                            $scope.checkValidate();
                                        _firstLoadcustomizer = false;
                                    });

                                }
                               

                                angular.element(formElement).on('submit', function (event) {
                                    event.preventDefault();
                                    $scope.$watch(function () {
                                        return elementToWatch.value;
                                    },
                                        function () {
                                            $scope.checkValidate()
                                        });

                                    $scope.$apply();
                                });
                                if ($scope.validateOn == 'blur') {
                                    angular.element(elementToWatch).bind("blur", function () {
                                        $scope.checkValidate()
                                        $scope.$apply();
                                    });
                                } else if ($scope.validateOn == 'dirty') {
                                    var _firstLoadValidateOnDirty = true;
                                    $scope.$watch(function () {
                                        var x = elementToWatch.value;
                                        return x + elementToWatch.attributes.name.value;
                                    },
                                        function () {
                                            if (!_firstLoadValidateOnDirty)
                                                $scope.checkValidate()
                                            _firstLoadValidateOnDirty = false
                                        });
                                }
                            }
                        }
                    }

                    $scope.checkValidate =  function () {
                        try {
                            //debugger
                            //if ($scope.parameter1 != null)
                            //    var check1 = $scope.parameter1;
                            //if ($scope.parameter2 != null)
                            //    var check2 = $scope.parameter2;
                         
                            form = $scope.datacheck;
                            //console.log(form, "form")
                            if (app.IsNullOrEmpty(form)) {

                                $scope.message = $scope.requiredMessage ? $scope.requiredMessage : "Không để trống trường này";
                                addStyle($scope.message);
                                return true;
                            } else if ($scope.max != undefined && $scope.datacheck > $scope.max) {
                                $scope.message = $scope.maxMessage ? $scope.maxMessage : "Giá trị nhập vào phải nhỏ hơn hoặc bằng " + $scope.max;
                                addStyle($scope.message);
                                return true;
                            } else if ($scope.min != undefined && $scope.datacheck < $scope.min) {
                                $scope.message = $scope.minMessage ? $scope.minMessage : "Giá trị nhập vào phải lớn hơn hoặc bằng " + $scope.min;
                                addStyle($scope.message);
                                return true;
                            }
                         
                            else if ($scope.equals != undefined && ($scope.datacheck < $scope.equals || $scope.datacheck > $scope.equals)) {
                                $scope.message = $scope.equalsMessage ? $scope.equalsMessage : "Giá trị nhập vào phải bằng " + $scope.equals;
                                addStyle($scope.message);
                                return true;
                            }

                            //
                            //Code Here
                            //
                       
                            else if ($scope.customizer()) {
                                let data = $scope.customizer()($scope.parameter1, $scope.parameter2);
                                if (data.value) { // return True có lỗi
                                    $scope.message = data.message ? data.message : "Giá trị nhập vào không thỏa mãn điều kiện!";
                                    addStyle($scope.message);
                                    return true;
                                }


                            }


                            //Mặc định nếu ko bị bắt lỗi nào sẽ xóa Erro lỗi(dòng này cần đặt cuối)
                            remStyle(element)
                            return false;
                        } catch (error) {
                          //  console.log(error)
                        }
                    }

                    var popoverName;
                    function addStyle(mess) {
                        if (elementToWatch) {
                            angular.element(parentElem).addClass('has-error');
                            angular.element(elementToWatch).addClass('ord-field-error');

                            if ($scope.errorStyle == "label") {
                                $scope.isShowErrorLabel = true;
                            } else { //popover

                                try {
                                    let namePop = "ordMessage" + elementToWatch.attributes.name.value;
                                    popoverName = "[data-toggle='" + namePop + "']";
                                    elementToWatch.setAttribute("data-toggle", namePop);
                                    elementToWatch.setAttribute("data-content", mess);
                                    elementToWatch.setAttribute("data-placement", "bottom");
                                    elementToWatch.setAttribute("data-trigger", "hover");
                                    $(popoverName).popover();
                                } catch (err) {
                                   // console.log(err)
                                }

                            }
                            // data-toggle="ordMessage" data-content="Some content inside the popover" data-placement="bottom"
                        }
                    }

                    function remStyle() {
                        if (elementToWatch) {
                            angular.element(parentElem).removeClass('has-error');
                            angular.element(elementToWatch).removeClass('ord-field-error');
                            if ($scope.errorStyle == "label") {
                                $scope.isShowErrorLabel = false;
                            } else { //popover
                                try {
                                    if (popoverName)
                                        $(popoverName).popover('destroy');
                                } catch (err) {
                                  //  console.log(err)
                                }
                            }
                        }

                    }
                }
            };
        }
    ]);
})();