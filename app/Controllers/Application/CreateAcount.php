<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\Login_Model;
use App\Models\Permission_Model;
use App\Models\User_Model;
class CreateAcount extends BaseController
{
	protected $session;
    protected $baseUrl;
	protected $Login_Model;

    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
       
		parent::initController($request, $response, $logger);

		$this->validation =  \Config\Services::validation();
		$this->session = \Config\Services::session();
		$this->session->start();
		$this->Login_Model = new Login_Model();
		// $user = new User_Model();
		// $user->createAdmin();
		$this->baseUrl = base_admin_url();
		helper('url');

		//create admin

    }

	public function index()
	{
		return view('account/create.php');
	}


}
