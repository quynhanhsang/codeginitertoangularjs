// var abp =  abp || {};

(function () {
    // abp.arrayRole = [];
    // abp.arrayPemission = [];
    // abp.arraySession = [];

    // abp.getRole = function(){
    //     $.post(ApiUrl+'/layout/getRole')
    //     .then(function(response){
    //         abp.arrayRole = JSON.parse(response);
    //         console.log(abp.arrayRole, 'abp.arrayRole');
    //     }, function(){

    //     });
    // }
    // abp.getPermission = function(){
    //     $.post(ApiUrl+'/layout/getPermission')
    //     .then(function(response){
    //         abp.arrayPemission = JSON.parse(response);
    //         console.log(abp.arrayPemission, 'arrayPemission');
    //     }, function(){

    //     });
    // }

    // abp.getSession = function(){
    //     $.post(ApiUrl+'/layout/getSession')
    //     .then(function(response){
    //         abp.arraySession = response;
    //     }, function(){

    //     });
    // }

    abp.hasPemission = function($data){
        debugger;
        var data = abp.arrayPemission.filter(x=>x.permissionKey == $data);
        if(data.length>0){
            return true;
        }else{
            return false;
        }
    }

    // var init = function(){
    //     debugger;
    //     abp.getRole();
    //     abp.getPermission();
    //     abp.getSession();
    // }
    // init();
})();

/* Setup global settings */
// angular.module('MetronicApp').factory('appConfig', ['$rootScope','$http',
// function($rootScope, $http) {
//     // supported languages
//     var _using = {
//         user: 1,
//     };

//     var getPermission = function(){
//         $http.post(ApiUrl+'/layout/getPermission')
//         .then(function(response){
//             return _using.getPermission = response.data;
//         }, function(){

//         });
//     }
//     var getRole = function(){
//         $http.post(ApiUrl+'/layout/getRole')
//         .then(function(response){
//             return _using.getRole = response.data;
//         }, function(){

//         });
//     }

//     var getSession = function(){
//         $http.post(ApiUrl+'/layout/getSession')
//         .then(function(response){
//             return _using.getSession = response.data;
//         }, function(){

//         });
//     }
//     var init =function(){
//         getPermission();
//         getRole();
//         getSession();
//     }
//     init();
//     return _using;
// }]);

//hàm check pemission