<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;

class Layout extends BaseController
{
	protected $session;
    protected $baseUrl;

    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
       
		parent::initController($request, $response, $logger);
		$this->session = \Config\Services::session();
		$this->session->start();
		$this->baseUrl = base_url();
		var_dump(session()->get());
		helper('url');
    }

	public function index()
	{
		
		// if(empty(session()->get('login')))
        // {	
		// 	return redirect()->to(base_admin_url().'/login');
        // }

		if ( ! is_file(APPPATH.'/Views/app/layout.php'))
		{
			// Whoops, we don't have a page for that!
			throw new \CodeIgniter\Exceptions\PageNotFoundException('layout');
		}

		$data['title'] = ucfirst('home');

		echo view('app/layout', $data);
	}
}
