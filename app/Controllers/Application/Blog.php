<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\Blog_Model;
use App\Database\Migrations;
use App\Libraries\Common_Libraries;

class Blog extends BaseController
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
		$this->Blog_Model = new Blog_Model();
		
		$this->baseUrl = base_url();
		helper('url');
		$this->inputRequet = $this->request->getJSON();
    }

	public function index()
	{ 

	}

	public function getList()
	{	

		$uresult = $this->Blog_Model->get_list($this->inputRequet);
		echo json_encode($uresult);
	}

	public function createOrUpdate()
	{
		$this->Blog_Model->createOrUpdate($this->inputRequet);
	}

	public function delete(){
		$this->Blog_Model->deleteId($this->inputRequet);
	}

	public function deleteAll(){
		$data  = $this->inputRequet;
		foreach($data as $item ){
			$this->Blog_Model->deleteId($item->id);
		}
	}

	public function getById()
	{	
		$uresult = $this->Blog_Model->getById($this->inputRequet);
		echo json_encode($uresult);
	}

	public function getMember()
	{	
		var_dump(session()->get());
	}
}
