<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\Permission_Model;
use App\Models\Login_Model;
use App\Models\User_model;
use App\Models\Role_model;

class Layout extends BaseController
{
	protected $session;
    protected $baseUrl;
	protected $Login_Model;
    public function initController(RequestInterface $request, ResponseInterface $response, LoggerInterface $logger) {
       
		parent::initController($request, $response, $logger);
		$this->session = \Config\Services::session();
		$this->session->start();
		$this->baseUrl = base_url();
		helper('url');
		//set lại sesion khi không còn dữ liêu user
		$this->Login_Model = new Login_Model();
		$session = session();
		$uresult = $this->Login_Model->get_user($data);
		if(count($uresult) <= 0){
			$session->destroy();
		}
    }

	public function index()
	{					
		$permission = new Permission_model();
		$permission->setPermission();
		
		if(empty(session()->get('login')))
        {	
			return redirect()->to(base_admin_url().'/login');
        }

		if ( ! is_file(APPPATH.'/Views/app/layout.php'))
		{
			// Whoops, we don't have a page for that!
			throw new \CodeIgniter\Exceptions\PageNotFoundException('layout');
		}

		$data['title'] = ucfirst('home');

		echo view('app/layout', $data);
	}

	public function getSession()
	{   
		echo json_encode($this->session->get());
	}

	public function getRole ()
	{	
		$user = new Role_model();
		$data =  json_decode($this->session->get('roleID'));
		$array = array();
		foreach($data as $item){
			array_push($array ,$user->getListId($item));
		}

		echo json_encode($array);
	}

	public function roles()
	{
		$user = new Role_model();
		$data =  json_decode($this->session->get('roleID'));
		$array = array();
		foreach($data as $item){
			array_push($array ,$user->getListId($item));
		}
		return $array;
	}

	public function getPermission ()
	{

		$pormission = new Permission_Model();

		$data = $this->roles();
		$arrayString = array();
		$i = 0;
		foreach($data as $key => $item){
			foreach($item as $in){
				echo $in->permissionID;
				//array_push($arrayString, json_decode($in->permissionID));
			}
			
			// array_push($arrayString, json_decode($item[$i]->permissionID));
			$i++;
		}
		//var_dump($arrayString);
	}
}
