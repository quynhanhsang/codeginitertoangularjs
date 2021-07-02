(function () {
    MetronicApp.directive('checkValidate', ['$timeout',
        function ($timeout) {
            return {
                restrict: 'E',
                replace: true,
                template: `<small ng-show="checkValidate()" class="help-block" ng-class="checkValidate() ? 'custom-error-validate':''" style="color: #e40909; display: none;">{{mess}}</small>`,
                scope: {
                    datacheck: '=?',
                    oldtext: '=?',
                    checkbymaxdate: '=?',
                    checkbymindate: '=?',
                    nullable: '=?',
                    type: '=?',
                    maxlength: '=?', //Max length
                    minlength: '=?', //Minlength
                    nospecial: '=?', ///Không được chứa ký tự đặc biệt
                    containupper: '=?', //Chứa chữ viết hoa
                    containlower: '=?', //Chứa chữ viết thường
                    html: '=?',
                },
                link: function ($scope, element, attrs) {
                    $scope.checkValidate = function () {
                        
                        var _form = $scope.datacheck;
                        var _maxl = $scope.maxlength;
                        var _minl = $scope.minlength;
                        //Định dạng ngày tháng
                        // ex 
                        //<check-validate-empty datacheck="vm.dataModal.ngayCapGiayPhep" type="'datetime'" oldtext="vm._oldNgayCapGiayPhep" checkbymaxdate="1"></check-validate-empty>
                        if ($scope.type == 'datetime' && $scope.oldtext != undefined && $scope.oldtext != null && $scope.oldtext != '') {
                            let value = $scope.oldtext.replace(/_/g, '');
                            let dateParts = value.split("/");
                            let newDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
                            if (newDate == null || newDate == undefined || dateParts[0] > 31 || dateParts[1] - 1 > 11) {
                                $scope.mess = "Định dạng ngày tháng năm không đúng";
                                return true;
                            }
                            let now = new Date();
                            let now_without_hh_mm_ss = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                            if ($scope.checkbymaxdate) { // ngày lớn nhất là ngày hiện tại
                                if (newDate > now_without_hh_mm_ss) {
                                    $scope.mess = "Ngày nhập vào không được lớn hơn ngày hiện tại";
                                    return true;
                                }
                            }
                            else if ($scope.checkbymindate)// ngày nhỏ nhất là ngày hiện tại
                            {
                                if (newDate < now_without_hh_mm_ss) {
                                    $scope.mess = "Ngày nhập vào không được nhỏ hơn ngày hiện tại";
                                    return true;
                                }
                            }
                        }

                        //Có thể null
                        if (!$scope.nullable) {
                                if (_form != null && _form != undefined && _form != "") {
                                    return false;
                                } else if (_form === 0) {
                                    return false;
                                } else {
                                    $scope.mess = "Không được để trống trường này";
                                    return true;
                                }
                        }
                        //Email
                        if ($scope.type == 'email') {
                            if ($scope.datacheck) {
                                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if (!re.test($scope.datacheck)) {
                                    $scope.mess = "Email không đúng định dạng";
                                    return true;
                                }
                            }
                        }

                        if ($scope.html && $scope.datacheck) {
                            let form = $scope.datacheck;
                            form = form.replace(new RegExp("<p>", "g"), "");
                            form = form.replace(new RegExp("</p>", "g"), "");
                            form = form.replace(new RegExp("<div>", "g"), "");
                            form = form.replace(new RegExp("</div>", "g"), "");
                            form = form.replace(new RegExp("&nbsp;", "g"), "");
                            form = form.replace(new RegExp("<br>", "g"), "");
                            form = form.replace(new RegExp("&lt;", "g"), "");
                            form = form.trim();
                            if (app.IsNullOrEmpty(form)) {
                                $scope.mess = "không để trống trường này";
                                return true;
                            }
                        }
                        //Max length
                        if (_maxl) {
                            if (_form && _form.length && _form.length > _maxl) {
                                $scope.mess = "Dữ liệu không được quá " + _maxl + " ký tự";
                                return true;
                            }
                        }
                        //Minlength
                        if (_minl) {
                            if (_form && _form.length && _form.length < _minl) {
                                $scope.mess = "Dữ liệu không được nhỏ hơn " + _minl + " ký tự";
                                return true;
                            }
                        }
                        //Không được chứa ký tự đặc biệt
                        if ($scope.nospecial) {
                            if (_form && _form.match(/!|@|\#|\$|%|\^|\&|\*|\=|\<|\>|\/|\;|\[|\]|~|`|{|}|\||\\/g)) {
                                $scope.mess = "Dữ liệu không được chứa ký tự đặc biệt";
                                return true;
                            }
                        }

                        //Chứa chữ viết hoa
                        if ($scope.containupper) {
                            if (_form && !/[A-Z]/.test(_form)) {
                                $scope.mess = "Dữ liệu phải chứa ký tự in hoa";
                                return true;
                            }
                        }
                        //Chứa chữ viết thường
                        if ($scope.containlower) {
                            if (_form && !/[a-z]/.test(_form)) {
                                $scope.mess = "Dữ liệu phải chứa ký tự in thường";
                                return true;
                            }
                        }
                    }
                }
            };
        }
    ]);
})();