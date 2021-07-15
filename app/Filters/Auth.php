<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Models\User_Model;
class Auth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
      $userModel = new User_Model();
      if(count($userModel->getAll()) > 0){
        if(empty(session()->get('login')))
        {	
          return redirect()->to(base_admin_url().'/login');
        }
      }else{
        return redirect()->to(base_admin_url().'/createAcount');
      }
    }
  
    //--------------------------------------------------------------------

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here
    }
}