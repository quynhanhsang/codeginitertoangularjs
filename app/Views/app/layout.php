<!DOCTYPE html>
<html lang="en" ng-app="MetronicApp">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title data-ng-bind="$state.current.data.pageTitle">Metronic | Dashboard 3</title>

        <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />  
        <meta http-equiv="Pragma" content="no-cache" />  
        <meta http-equiv="Expires" content="0" /> 

        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <base href="<?php echo base_admin_url()?>">
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/global/plugins/bootstrap-toastr/toastr.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/scripts/angular-confirm/css/angular-confirm.css" rel="stylesheet" type="text/css" />
        
        <link href="<?php echo base_url()?>/scripts/kendoui/css/kendo.common.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/scripts/kendoui/css/kendo.bootstrap.min-backend.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/css/layout.css" rel="stylesheet" type="text/css" />
        <script>
            var baseUrl =  '<?php echo base_url()?>';
            var ApiUrl = '<?php echo base_admin_url()?>';
            var app = app || {};
            var abp =  abp || {};
            abp.arrayRole = <?php echo $arrayRole; ?>;
            abp.arrayPemission = <?php echo $arrayPemission;  ?>;
            abp.arraySession = <?php echo $arraySession; ?>;
        </script>

        
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN DYMANICLY LOADED CSS FILES(all plugin and page related styles must be loaded between GLOBAL and THEME css files ) -->
        <link id="ng_load_plugins_before" />
        <!-- END DYMANICLY LOADED CSS FILES -->
        <!-- BEGIN THEME STYLES -->
        <!-- DOC: To use 'rounded corners' style just load 'components-rounded.css' stylesheet instead of 'components.css' in the below style tag -->
        <link href="<?php echo base_url()?>/assets/admin/global/css/components.min.css" id="style_components" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/global/plugins/dropzone/dropzone.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/global/plugins/dropzone/basic.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/global/css/plugins.min.css" rel="stylesheet" type="text/css" />
       
        <link href="<?php echo base_url()?>/assets/admin/layouts/layout3/css/layout.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/assets/admin/layouts/layout3/css/themes/default.min.css" rel="stylesheet" type="text/css" id="style_color" />
        <link href="<?php echo base_url()?>/assets/admin/layouts/layout3/css/custom.min.css" rel="stylesheet" type="text/css" />
        <link href="<?php echo base_url()?>/scripts/ng-ckeditor/ng-ckeditor.css" rel="stylesheet" type="text/css" />
        <!-- END THEME STYLES -->
        <link rel="shortcut icon" href="favicon.ico" /> 
        <style>
            .form-group.form-md-line-input .help-block{
                opacity: 1;
            }
            table .mt-checkbox{
                padding-left: 19px;
            }
        </style>
        
    </head>
    <!-- END HEAD -->
    <body  ng-controller="AppController" class="page-on-load">
        <div ng-spinner-bar class="page-spinner-bar">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
        <!-- setheader -->
        <div data-ng-include="'<?php echo base_url()?>/app/header.html'" data-ng-controller="HeaderController as vm" class="page-header"></div>
        <!-- end setheader -->
        <div class="clearfix"> </div>
        <!-- setbody -->
        <div class="page-container">
            <div data-ng-include="'<?php echo base_url()?>/app/page-head.html'" data-ng-controller="PageHeadController" class="page-head"> </div>
            <div class="page-content">
                <div class="container-fluid">
                    <div ui-view class="fade-in-up">  </div>
                </div>
            </div>
            <!-- BEGIN QUICK SIDEBAR -->
            <a href="javascript:;" class="page-quick-sidebar-toggler">
                <i class="icon-login"></i>
            </a>
            <div data-ng-include="'<?php echo base_url()?>/app/quick-sidebar.html'" data-ng-controller="QuickSidebarController" class="page-quick-sidebar-wrapper"></div>
            <!-- END QUICK SIDEBAR -->
        </div>
        <!-- end setbody -->

        <!-- setfooter -->
        <div data-ng-include="'<?php echo base_url()?>/app/footer.html'" data-ng-controller="FooterController"> </div>
        <!-- end setfooter -->
        
        <!--[if lt IE 9]>
        <![endif]-->
        <script src="<?php echo base_url()?>/scripts/jquery/jquery.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/common/config/appUtility.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/scripts/jquery/jquery-migrate.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/js.cookie.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/bootstrap-toastr/toastr.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/dropzone/dropzone.min.js" type="text/javascript"></script>
        <!-- END CORE JQUERY PLUGINS -->
        <script src="<?php echo base_url()?>/app/main/appConfig.js" type="text/javascript"></script>
        <!-- BEGIN CORE ANGULARJS PLUGINS -->
        <script src="<?php echo base_url()?>/scripts/angular.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/scripts/angular-sanitize.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/scripts/angular-touch.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/scripts/angular-ui-router.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/angularjs/plugins/ocLazyLoad.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/scripts/angular-ui/ui-bootstrap-tpls.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/scripts/kendoui/js/kendo.all.min.js" type="text/javascript"></script>
        <!-- END CORE ANGULARJS PLUGINS -->
        <script src="<?php echo base_url()?>/common/paging/dirPagination.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/scripts/angular-confirm/js/angular-confirm.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/global/plugins/ckeditor/ckeditor.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/scripts/ng-ckeditor/ng-ckeditor.js" type="text/javascript"></script>
     
        <!-- BEGIN APP LEVEL ANGULARJS SCRIPTS -->
        
        <script src="<?php echo base_url()?>/app/main/main.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/app/header.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/app/footer.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/app/page-head.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/app/quick-sidebar.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/js/directives.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/common/directives/checkValidate.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/common/directives/draggable.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/common/directives/spinnerLoader.js" type="text/javascript"></script>

        <script src="<?php echo base_url()?>/app/uploadFile/createOreUpdate.js" type="text/javascript"></script>

        <!-- <script src="<?php echo base_url()?>/common/checkValidate.js" type="text/javascript"></script> -->
        <!-- END APP LEVEL ANGULARJS SCRIPTS -->
        <!-- BEGIN APP LEVEL JQUERY SCRIPTS -->
        <script src="<?php echo base_url()?>/assets/admin/global/scripts/app.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/layouts/layout3/scripts/layout.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/layouts/global/scripts/quick-sidebar.min.js" type="text/javascript"></script>
        <script src="<?php echo base_url()?>/assets/admin/layouts/layout3/scripts/demo.min.js" type="text/javascript"></script>
        <!-- END APP LEVEL JQUERY SCRIPTS -->
        <!-- END JAVASCRIPTS -->
    </body>

</html>