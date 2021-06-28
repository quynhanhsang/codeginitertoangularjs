<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class Page extends BaseController
{
	private $authentication;

	function __construct(){

		//parent::__construct();
		//$this->authentication = $this->qa_authentication->check();

	}

	public function index()
	{
		return view('welcome_message');
	}

	public function view($page = 'home')
	{
		if ( ! is_file(APPPATH.'/Views/app/'.$page.'.php'))
		{
			// Whoops, we don't have a page for that!
			throw new \CodeIgniter\Exceptions\PageNotFoundException($page);
		}

		$data['title'] = ucfirst($page);
		$data['template'] ='app/home';

		echo view('app/layout', $data);

	}
}
