<?php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use CodeIgniter\Filters\FilterInterface;

class Home extends BaseController 
{
	public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
       
		parent::initController($request, $response, $logger);
		$this->session = \Config\Services::session();
		$this->session->start();

		helper('url');
    }

	public function index()
	{

		if ( ! is_file(APPPATH.'/Views/app/home.php'))
		{
			// Whoops, we don't have a page for that!
			throw new \CodeIgniter\Exceptions\PageNotFoundException('home');
		}

		$data['title'] = ucfirst('home');
		$data['template'] ='app/home';

		echo view('app/home');
	}

	public function before(RequestInterface $request, $arguments = null)
	{
		
	}

}
