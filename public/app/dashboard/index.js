angular.module('MetronicApp').controller('DashboardController',['$rootScope','$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    var vm = this;
    vm.name = "sang";
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });
}]);