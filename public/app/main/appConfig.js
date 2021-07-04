/* Setup global settings */
angular.module('MetronicApp').factory('appConfig', ['$rootScope','$http',
function($rootScope, $http) {
    // supported languages
    var _using = {
        user: 1,
    };

    var getPermission = function(){
        $http.post(ApiUrl+'/layout/getPermission')
        .then(function(response){
            return _using.getPermission = response.data;
        }, function(){

        });
    }
    var getRole = function(){
        $http.post(ApiUrl+'/layout/getRole')
        .then(function(response){
            return _using.getRole = response.data;
        }, function(){

        });
    }

    var getSession = function(){
        $http.post(ApiUrl+'/layout/getSession')
        .then(function(response){
            return _using.getSession = response.data;
        }, function(){

        });
    }
    var init =function(){
        getPermission();
        getRole();
        getSession();
    }
    init();
    return _using;
}]);


//hàm check pemission