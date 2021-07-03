<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\Role_model;
use App\Models\Permission_Model;
use CodeIgniter\HTTP\IncomingRequest;
class Role extends BaseController
{
	protected $session;
    protected $baseUrl;
	protected $userModal;
	protected $inputRequet;
	protected $Role_model;
	protected $permission;
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
       
		parent::initController($request, $response, $logger);
		$this->session = \Config\Services::session();
		$this->session->start();
		
		$this->Role_model = new Role_model();
		$this->permission = new Permission_Model();
		$this->baseUrl = base_url();
		helper(['form', 'url']);
		$this->inputRequet = $this->request->getJSON();
		
    }

	public function index()
	{
		$uresult = $this->Role_model->get_list();
		echo json_encode($uresult);
	}
	public function getList()
	{	
		$uresult = $this->Role_model->get_list($this->inputRequet);
		echo json_encode($uresult);
		
	}

	public function createOrUpdate()
	{
		$this->Role_model->createOrUpdate($this->inputRequet);
	}

	public function getPermissionAll()
    {
        echo json_encode($this->permission->getPermissionAll());
    }

	public function delete(){
		
		$this->Role_model->deleteId($this->inputRequet);
	}

}
