<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\Menus_Model;
use App\Database\Migrations;
use App\Libraries\Common_Libraries;

class Menus extends BaseController
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
		$this->Menus_Model = new Menus_Model();
		
		$this->baseUrl = base_url();
		helper('url');
		$this->inputRequet = $this->request->getJSON();
    }

	public function index()
	{ 

	}

	public function getList()
	{	

		$uresult = $this->Menus_Model->get_list($this->inputRequet);
		echo json_encode($uresult);
	}

	public function createOrUpdate()
	{
		$this->Menus_Model->createOrUpdate($this->inputRequet);
	}

	public function delete(){
		$this->Menus_Model->deleteId($this->inputRequet);
	}

	public function deleteAll(){
		$data  = $this->inputRequet;
		foreach($data as $item ){
			$this->Menus_Model->deleteId($item->id);
		}
	}

}
