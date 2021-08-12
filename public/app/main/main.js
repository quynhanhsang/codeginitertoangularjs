/***
Metronic AngularJS App Main Script
***/
/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
    "angularUtils.directives.dirPagination",
    "cp.ngConfirm",
    'ngCkeditor'
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
MetronicApp.controller('AppController', ['$scope', '$rootScope',  function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);



/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider','$qProvider',  function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $qProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");  
    if(abp.hasPemission("Page.dashboard")){
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
    }
    
    //admin
    if(abp.hasPemission("Page.hethong.user")){
        $stateProvider
        // Home
        .state('user', {
            url: "/user",
            templateUrl: baseUrl+'/app/user/index.html',            
            data: {pageTitle: 'User'},
            controller: "UserController as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/user/index.js',
                            baseUrl+'/app/user/modal/createOreUpdate.js',
                            baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                        ] 
                    });
                }]
            }
        })
    }
    
    if(abp.hasPemission("Page.hethong.role")){
        $stateProvider
        // Home
        .state('role', {
            url: "/role",
            templateUrl: baseUrl+'/app/role/index.html',            
            data: {pageTitle: 'Role'},
            controller: "app.role.index as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/role/index.js',
                            baseUrl+'/app/role/modal/createOreUpdate.js',
                            baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                            // baseUrl+'/common/directives/jsTree.directive.js',
                        ] 
                    });
                }]
            }
        })
    }
    //end admin

    //cấu hình
    
    if(abp.hasPemission("Page.cauhinh.cauhinhchung")){
        $stateProvider
        // Home
        .state('cauhinhchung', {
            url: "/cauhinhchung",
            templateUrl: baseUrl+'/app/cauhinhchung/index.html',            
            data: {pageTitle: 'Cấu hình chung'},
            controller: "app.cauhinhchung.index as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/cauhinhchung/index.js',
                            baseUrl+'/app/cauhinhchung/modal/createOreUpdate.js',
                            baseUrl+'/assets/admin/global/plugins/ckeditor/ckeditor.js',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            // baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                            // baseUrl+'/common/directives/jsTree.directive.js',
                        ] 
                    });
                }]
            }
        })
    }

    if(abp.hasPemission("Page.cauhinh.vitriquangcao")){
        $stateProvider
        // Home
        .state('vitriquangcao', {
            url: "/vitriquangcao",
            templateUrl: baseUrl+'/app/vitriquangcao/index.html',            
            data: {pageTitle: 'Vị trí quảng cáo'},
            controller: "app.vitriquangcao.index as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/vitriquangcao/index.js',
                            baseUrl+'/app/vitriquangcao/modal/createOreUpdate.js',
                            baseUrl+'/assets/admin/global/plugins/ckeditor/ckeditor.js',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            // baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                            // baseUrl+'/common/directives/jsTree.directive.js',
                        ] 
                    });
                }]
            }
        })
    }

    if(abp.hasPemission("Page.cauhinh.menu")){
        $stateProvider
        // Home
        .state('menu', {
            url: "/menu",
            templateUrl: baseUrl+'/app/menu/index.html',            
            data: {pageTitle: 'Menu'},
            controller: "app.menu.index as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/menu/index.js',
                            baseUrl+'/app/menu/modal/createOreUpdate.js',
                            baseUrl+'/assets/admin/global/plugins/ckeditor/ckeditor.js',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            // baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                            // baseUrl+'/common/directives/jsTree.directive.js',
                        ] 
                    });
                }]
            }
        })
    }

    if(abp.hasPemission("Page.cauhinh.categorytype")){
        $stateProvider
        // Home
        .state('categorytype', {
            url: "/categorytype",
            templateUrl: baseUrl+'/app/categorytype/index.html',            
            data: {pageTitle: 'Categorytype'},
            controller: "app.categorytype.index as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/categorytype/index.js',
                            baseUrl+'/app/categorytype/modal/createOreUpdate.js',
                            baseUrl+'/assets/admin/global/plugins/ckeditor/ckeditor.js',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            // baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                            // baseUrl+'/common/directives/jsTree.directive.js',
                        ] 
                    });
                }]
            }
        })
    }
    //end cấu hình 

    //Danh mục
    if(abp.hasPemission("Page.danhmuc.menucategory")){
        $stateProvider
        // Home
        .state('menucategory', {
            url: "/menucategory",
            templateUrl: baseUrl+'/app/menucategory/index.html',            
            data: {pageTitle: 'menucategory'},
            controller: "app.menucategory.index as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/menucategory/index.js',
                            baseUrl+'/app/menucategory/modal/createOreUpdate.js',
                            //baseUrl+'/assets/admin/global/plugins/ckeditor/ckeditor.js',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            // baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                            // baseUrl+'/common/directives/jsTree.directive.js',
                        ] 
                    });
                }]
            }
        })
    }

    if(abp.hasPemission("Page.danhmuc.category")){
        $stateProvider
        // Home
        .state('category', {
            url: "/category",
            templateUrl: baseUrl+'/app/category/index.html',            
            data: {pageTitle: 'category'},
            controller: "app.category.index as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/category/index.js',
                            baseUrl+'/app/category/modal/createOreUpdate.js',
                            //baseUrl+'/assets/admin/global/plugins/ckeditor/ckeditor.js',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            // baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                            // baseUrl+'/common/directives/jsTree.directive.js',
                        ] 
                    });
                }]
            }
        })
    }
    //end Danh mục

    //Nội dung
    if(abp.hasPemission("Page.noidung.baiviet")){
        $stateProvider
        // Home
        .state('baiviet', {
            url: "/baiviet",
            templateUrl: baseUrl+'/app/1.noidung/blog/index.html',            
            data: {pageTitle: 'Bài viết'},
            controller: "app.noidung.blog.index as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            baseUrl+'/app/1.noidung/blog/index.js',
                            //baseUrl+'/app/1.noidung/blog/directive/createOreUpdate.js',
                            //baseUrl+'/assets/admin/global/plugins/ckeditor/ckeditor.js',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
                            // baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
                            // baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
                            // baseUrl+'/common/directives/jsTree.directive.js',
                        ] 
                    });
                }]
            }
        })
        .state('baivietchitiet',
        {
            url: "/baivietchitiet/{id}",
            templateUrl: baseUrl+'/app/1.noidung/blog/directive/createOreUpdate.html',            
            data: {pageTitle: 'Bài viết'},
            controller: "app.noidung.blog.directive.createOreUpdate as vm",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            // baseUrl+'/app/1.noidung/blog/index.js',
                            baseUrl+'/app/1.noidung/blog/directive/createOreUpdate.js',
                        ] 
                    });
                }]
            }
        })

    }

    // if(abp.hasPemission("Page.danhmuc.category")){
    //     $stateProvider
    //     // Home
    //     .state('category', {
    //         url: "/category",
    //         templateUrl: baseUrl+'/app/category/index.html',            
    //         data: {pageTitle: 'category'},
    //         controller: "app.category.index as vm",
    //         resolve: {
    //             deps: ['$ocLazyLoad', function($ocLazyLoad) {
    //                 return $ocLazyLoad.load({
    //                     insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
    //                     files: [
    //                         baseUrl+'/app/category/index.js',
    //                         baseUrl+'/app/category/modal/createOreUpdate.js',
    //                         //baseUrl+'/assets/admin/global/plugins/ckeditor/ckeditor.js',
    //                         // baseUrl+'/assets/admin/global/plugins/jstree/dist/themes/default/style.min.css',
    //                         // baseUrl+'/assets/admin/global/plugins/jstree/dist/jstree.min.js',
    //                         // baseUrl+'/assets/admin/pages/scripts/ui-tree.min.js',
    //                         // baseUrl+'/common/directives/jsTree.directive.js',
    //                     ] 
    //                 });
    //             }]
    //         }
    //     })
    // }
    //end Danh mục

    $qProvider.errorOnUnhandledRejections(false);
}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    // $rootScope.$on('$viewContentLoaded', function() {
    //     $templateCache.removeAll();
    //  });
}]);