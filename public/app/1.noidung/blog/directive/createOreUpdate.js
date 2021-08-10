(function () {
    angular.module('MetronicApp').directive('app.noidung.blog.directive.createOreUpdate', ['$compile', '$templateRequest',
        function ($compile, $templateRequest) {
            var controller = ['$scope', '$http', '$uibModal',
                function ($scope, $http, $uibModal) {
                    //variable
                    var vm = this;
                    vm.loading = false;
                    debugger;

                    //Init()
                    var Init = function () {

                        
                    };
                    //Run Init()
                    Init();

                }
            ];

            return {
                restrict: 'EA',
                scope: {
                    dataitem: "=",
                    fncallback: "&"
                },
                controller: controller,
                controllerAs: 'vm',
                bindToController: false,
                link: function (scope, elem, attr, ctrl) {
                    $templateRequest(baseUrl+"/app/1.noidung/blog/directive/createOreUpdate.html").then(function (html) {
                        var template = angular.element(html);
                        debugger;
                        elem.append(template);
                        $compile(template)(scope);
                    });
                }
            };
        }
    ]);
})();