angular.module('MetronicApp').controller('DashboardController',['$rootScope','$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {

    var vm = this;
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });
}]);