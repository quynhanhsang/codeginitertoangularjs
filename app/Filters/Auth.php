<?php namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
class Auth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
      
      if(empty(session()->get('login')))
      {	
        return redirect()->to(base_admin_url().'/login');
      }
    }

    //--------------------------------------------------------------------

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Do something here
    }
}