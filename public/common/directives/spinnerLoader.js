// (function () {
//     appModule.directive('busyIf', [
//         function () {
//             return {
//                 restrict: 'A',
//                 scope: {
//                     busyIf: "="
//                 },
//                 link: function (scope, element, attrs) {
//                     scope.$watch('busyIf', function () {
//                         if (scope.busyIf) {
//                             abp.ui.setBusy($(element));
//                         } else {
//                             abp.ui.clearBusy($(element));
//                         }
//                     });
//                 }
//             };
//         }
//     ]);
// })();

/*global angular*/
angular.module('MetronicApp').directive('spinnerLoader',['$timeout', function($timeout) {
    'use strict';

    return {
        restrict: 'EA',
        scope: {
            slVisible: '=',
            slSize: '='
        },
        template:
            '<div class="spinnerLoad">' +
                '<div id="stepOne"    class="bar"></div>' +
                '<div id="stepTwo"    class="bar"></div>' +
                '<div id="stepThree"  class="bar"></div>' +
                '<div id="stepFour"   class="bar"></div>' +
                '<div id="stepFive"   class="bar"></div>' +
                '<div id="stepSix"    class="bar"></div>' +
                '<div id="stepSeven"  class="bar"></div>' +
                '<div id="stepEight"  class="bar"></div>' +
                '<div id="stepNine"   class="bar"></div>' +
                '<div id="stepTen"    class="bar"></div>' +
                '<div id="stepEleven" class="bar"></div>' +
                '<div id="stepTvelve" class="bar"></div>' +
            '</div>',
        link: function (scope, element, attrs) {
          
          var parent = element[0].parentNode;
            
            /* Will handle visibility changes */
            scope.$watch(attrs.slVisible, function () {
                $timeout(function () {
                   //element[0].style.position    = 'fixed';
                    // element[0].style.marginTop  = (parent.offsetHeight / 4.5) + 'px';
                    // element[0].style.marginLeft = (parent.offsetWidth / 2.3) + 'px';

                    element.css('display', scope.slVisible ? 'block' : 'none');
                }, 1500);
               
            });

            /* Will handle the Size */
            scope.$watch(attrs.slSize, function () {
                if (attrs.slSize) {
                    element[0].className = attrs.slSize.toLowerCase() + 'Size';
                }
            });

        }
    };
}
]);



// angular.module('MetronicApp').directive('spinnerLoader', ['$timeout', function ($timeout) {
//     return {
//         restrict: 'EA',
//         template: '<i ng-class="currentClass" ></i>',
//         // scope: {
//         //     show: '=',
//         //     class: '@',
//         //     spinnerClass: '@'
//         // },
//         scope: {
//             slVisible: '=',
//             slSize: '=',
//             class: '@',
//             spinnerClass: '@'
//         },
//         replace: true,
//         link: function (scope, elm, attrs) {

//            //scope.currentClass = scope.class;

//             scope.$watch('slVisible', function () {
//                 if (scope.slVisible) {

//                     scope.currentClass = scope.spinnerClass;
//                     $timeout(function () {
//                         //if hasn't change yet
//                         if (scope.slVisible) {
//                             scope.slVisible = false;
//                             scope.currentClass = scope.class;
//                         }
//                     }, 1500);
//                 } else {

//                     scope.slVisible = false;
//                     scope.currentClass = scope.class;
//                 }
//             });
//         }
//     };
// }
// ]);
