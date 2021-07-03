<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\User_Model;
use App\Models\Role_Model;
use App\Database\Migrations;
use App\Libraries\Common_Libraries;

class User extends BaseController
{
	protected $session;
    protected $baseUrl;
	protected $userModal;
	protected $inputRequet;
	protected $libary;

    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
       
		parent::initController($request, $response, $logger);
		$this->session = \Config\Services::session();
		$this->session->start();
		$this->libary = new Common_Libraries();
		$this->User_Model = new User_Model();
		
		$this->baseUrl = base_url();
		helper('url');
		$this->inputRequet = $this->request->getJSON();
    }

	public function index()
	{ 

	}

	public function getList()
	{	
		$uresult = $this->User_Model->get_list($this->inputRequet);
		echo json_encode($uresult);
	}

	public function createOrUpdate()
	{
		$this->User_Model->createOrUpdate($this->inputRequet);
	}

	public function delete(){
		$this->User_Model->deleteId($this->inputRequet);
	}

	public function deleteAll(){
		$data  = $this->inputRequet;
		foreach($data as $item ){
			$this->User_Model->deleteId($item->id);
		}
	}

	public function getRollAllDLL()
	{   
		$roleModel = new Role_Model();
		$uresult = $roleModel->getAllDLL();
		echo json_encode($uresult);
		//echo 'sang';
	}	
}
