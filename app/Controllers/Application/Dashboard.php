<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;

class Dashboard extends BaseController
{
	protected $session;
    protected $baseUrl;

    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
       
		parent::initController($request, $response, $logger);

		// $this->validation =  \Config\Services::validation();
		$this->session = \Config\Services::session();
		$this->session->start();
		// $this->Login_Model = new Login_Model();
		// $this->Profile_Model = new \App\Models\AdminModels\Profile_Model();
		$this->baseUrl = base_url();
		helper('url');
		
    }

	public function index()
	{
        echo 'sang';
	}
}
