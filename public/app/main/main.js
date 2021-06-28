/***
Metronic AngularJS App Main Script
***/
/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

// //AngularJS v1.3.x workaround for old style controller declarition in HTML
// MetronicApp.config(['$controllerProvider', function($controllerProvider) {
//     // this option might be handy for migrating old apps, but please don't use it
//     // in new ones!
//     $controllerProvider.allowGlobals();
// }]);
  

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: baseUrl+ '/assets/admin',
        globalPath: baseUrl+ '/assets/admin/global',
        layoutPath: baseUrl+ '/assets/admin/layouts/layout3',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider','$qProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $qProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");  
    $stateProvider
        // Home
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: baseUrl+'/app/dashboard/index.html',            
            data: {pageTitle: 'Dashboard'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/dashboard/index.js',
                        ] 
                    });
                }]
            }
        })
    debugger;
    $stateProvider
        // Home
        .state('user', {
            url: "/user",
            templateUrl: baseUrl+'/app/user/index.html',            
            data: {pageTitle: 'User'},
            controller: "UserController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/user/index.js',
                            baseUrl+'/app/user/modal/createOreUpdate.js',
                        ] 
                    });
                }]
            }
        })
        $qProvider.errorOnUnhandledRejections(false);
}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);