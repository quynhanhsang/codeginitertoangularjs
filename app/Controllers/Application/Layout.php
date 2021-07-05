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
		$role = new Role_model();
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

		//lấy danh sách Permission
		$roleArrayID = $this->roleArrayID();
		$arrayPemission = $permission->getPermissionID($roleArrayID);
		
		//lấy danh sách role
		$roleID =  json_decode( $this->session->get('roleID') );
		$arrayRole = $role->getListId($roleID);
		
		$data['title'] = ucfirst('home');

		$data['arrayPemission'] = json_encode($arrayPemission);
		$data['arraySession'] = json_encode($this->session->get());
		$data['arrayRole'] = json_encode($arrayRole);

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
		$array = $user->getListId($data);
		echo json_encode($array);
	}

	private function roleArrayID()
	{
		$array = array();
		$user = new Role_model();
		$data =  json_decode($this->session->get('roleID'));
		
		$permissionString = '';
		foreach($user->getListId($data) as $item){
			$permissionString .= $item->permissionID;
		}
		//cắt chuỗi và gọi lại
		$array = json_decode(str_replace("][", ",",$permissionString));
		return array_unique($array);
	}

	public function getPermission ()
	{
		$pormission = new Permission_Model();
		$data = $this->roleArrayID();
		$array = $pormission->getPermissionID($data);
		echo json_encode($array);
	}
}
