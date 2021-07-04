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
class Login extends BaseController
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

		$this->baseUrl = base_admin_url();
		helper('url');
    }

	public function index()
	{
		return view('account/login.php');
	}

	public function auth_user()
	{
		$data['userName'] = $this->request->getPost("userName");
		$data['passWord'] = $this->request->getPost("passWord");
		$remember = $this->request->getPost("remember");
		if($remember){
			$this->session->set('remember_me', $remember);
		}
		$this->validation->setRules([
				'userName' => 'required',
				'passWord' => 'required|min_length[4]',
		]);
		// form validation
		
		if ($this->validation->run($data) == FALSE)
		{
			// validation fail
			$id['invalid_credential'] = 'Email/Password Required ';
			$this->session->setFlashdata('msg', 'Bạn phải đăng nhập username và password!');
			return redirect()->to($this->baseUrl.'/login');
		}
		else
		{
			// check for user credentials
			$uresult = $this->Login_Model->get_user($data);
			
			if (count($uresult) > 0)
			{
				// set session
				$sess_data = array(
					'login' => TRUE, 
					'userName' => $uresult[0]->userName,
					'level'=>$uresult[0]->level,
					'tennantId'=>$uresult[0]->tennantId,
					'email'=>$uresult[0]->email,
					'roleID'=>$uresult[0]->roleID,
					'uid' => $uresult[0]->id);
				$this->session->set($sess_data);
				
				return redirect()->to($this->baseUrl);
			}
			else
			{
				
				$this->session->setFlashdata('msg', 'Sai Email hoặc Password!');
				return redirect()->to($this->baseUrl.'/login');
			}
		}

	}

	public function logout()
    {
        $session = session();
        $session->destroy();
        return redirect()->to($this->baseUrl.'/login');
    }
}
