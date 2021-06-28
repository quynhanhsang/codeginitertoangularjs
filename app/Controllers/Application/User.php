<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\User_Model;

class User extends BaseController
{
	protected $session;
    protected $baseUrl;
	protected $userModal;
	protected $inputRequet;
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
       
		parent::initController($request, $response, $logger);
		$this->session = \Config\Services::session();
		$this->session->start();
		
		$this->User_Model = new User_Model();
		$this->baseUrl = base_url();
		helper('url');
		$this->inputRequet = $this->request->getJSON();
		if(empty(session()->get('login')))
        {	
			return redirect()->to(base_admin_url().'/login');
        }
    }

	public function index()
	{
		$uresult = $this->User_Model->get_list();
		echo json_encode($uresult);
	}

	public function createOrUpdate()
	{
		$this->User_Model->createOrUpdate($this->inputRequet);
	}

	public function delete(){
		$this->User_Model->deleteId($this->inputRequet);
	}
}
