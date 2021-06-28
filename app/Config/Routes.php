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
$routes->post('application/authenticate', 'Login::auth_user', ['namespace' => 'App\Controllers\Application']);
$routes->get('application/authenticate/logout', 'Login::logout', ['namespace' => 'App\Controllers\Application']);

$routes->add('application/dashboard', 'Dashboard::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/dashboard/$1', 'Dashboard::index/$1', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);

$routes->post('application/user', 'User::index', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/user/createOrUpdate(:any)', 'User::createOrUpdate/$1', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
$routes->post('application/user/delete(:any)', 'User::delete/$1', ['namespace' => 'App\Controllers\Application', 'filter' => 'auth']);
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
