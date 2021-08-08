<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php'))
{
	require SYSTEMPATH . 'Config/Routes.php';
}

/**
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);
/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Home::index');
$routes->get('/application', 'Layout::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
//tạo thêm mới router

// $routes->get('(:any)', 'Page::view/$1');

$routes->get('application/login', 'Login::index', ['namespace' => 'App\Controllers\Application']);
$routes->get('application/register', 'Register::index', ['namespace' => 'App\Controllers\Application']);
$routes->get('application/createAcount', 'CreateAcount::index', ['namespace' => 'App\Controllers\Application']);
$routes->post('application/authenticate', 'Login::auth_user', ['namespace' => 'App\Controllers\Application']);
$routes->get('application/authenticate/logout', 'Login::logout', ['namespace' => 'App\Controllers\Application']);

$routes->post('application/navigation', 'Navigation::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

$routes->add('application/dashboard', 'Dashboard::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/dashboard/$1', 'Dashboard::index/$1', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

$routes->post('application/layout/getSession', 'Layout::getSession', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/layout/getRole', 'Layout::getRole', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/layout/getPermission', 'Layout::getPermission', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

$routes->get('application/user', 'User::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/user/getList', 'User::getList', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/user/createOrUpdate', 'User::createOrUpdate', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/user/delete', 'User::delete', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/user/deleteAll', 'User::deleteAll', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/user/getRollAllDLL', 'User::getRollAllDLL', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

$routes->post('application/role', 'Role::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/role/getList', 'Role::getList', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/role/createOrUpdate', 'Role::createOrUpdate', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/role/delete(:any)', 'Role::delete/$1', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

$routes->post('application/getpermission', 'Role::getPermissionAll', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

// cấu hình chung
$routes->get('application/systemconfig', 'SystemConfig::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/systemconfig/getList', 'SystemConfig::getList', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/systemconfig/createOrUpdate', 'SystemConfig::createOrUpdate', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/systemconfig/delete', 'SystemConfig::delete', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/systemconfig/deleteAll', 'SystemConfig::deleteAll', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/systemconfig/getRollAllDLL', 'SystemConfig::getRollAllDLL', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

//menus
$routes->get('application/menus', 'Menus::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menus/getList', 'Menus::getList', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menus/createOrUpdate', 'Menus::createOrUpdate', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menus/delete', 'Menus::delete', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menus/deleteAll', 'Menus::deleteAll', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menus/getRollAllDLL', 'Menus::getRollAllDLL', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

//category type
$routes->get('application/categorytype', 'Categorytype::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/categorytype/getList', 'Categorytype::getList', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/categorytype/createOrUpdate', 'Categorytype::createOrUpdate', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/categorytype/delete', 'Categorytype::delete', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/categorytype/deleteAll', 'Categorytype::deleteAll', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/categorytype/getRollAllDLL', 'Categorytype::getRollAllDLL', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

//category
$routes->get('application/category', 'Category::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/category/getList', 'Category::getList', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/category/createOrUpdate', 'Category::createOrUpdate', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/category/delete', 'Category::delete', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/category/deleteAll', 'Category::deleteAll', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/category/getRollAllDLL', 'Category::getRollAllDLL', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

//menu category
$routes->get('application/menucategory', 'MenuCategory::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->get('application/menucategory/menuGetAllDLL', 'MenuCategory::menuGetAllDLL', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menucategory/getList', 'MenuCategory::getList', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menucategory/createOrUpdate', 'MenuCategory::createOrUpdate', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menucategory/delete', 'MenuCategory::delete', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menucategory/deleteAll', 'MenuCategory::deleteAll', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/menucategory/getRollAllDLL', 'MenuCategory::getRollAllDLL', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php'))
{
	require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
