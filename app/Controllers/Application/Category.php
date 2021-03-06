<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\Category_Model;
use App\Database\Migrations;
use App\Libraries\Common_Libraries;

class Category extends BaseController
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
		$this->Category_Model = new Category_Model();
		
		$this->baseUrl = base_url();
		helper('url');
		$this->inputRequet = $this->request->getJSON();
    }

	public function index()
	{ 

	}

	public function getList()
	{	

		$uresult = $this->Category_Model->get_list($this->inputRequet);
		echo json_encode($uresult);
	}

	public function createOrUpdate()
	{
		$this->Category_Model->createOrUpdate($this->inputRequet);
	}

	public function delete(){
		$this->Category_Model->deleteId($this->inputRequet);
	}

	public function deleteAll(){
		$data  = $this->inputRequet;
		foreach($data as $item ){
			$this->Category_Model->deleteId($item->id);
		}
	}

	public function categoryGetAllDLL()
	{
		//echo 'sang';
		echo json_encode($this->Category_Model->getAllDLL());
	}

	public function getTest()
	{
		echo json_encode($this->Category_Model->getCategoryById(1));
	}
}
