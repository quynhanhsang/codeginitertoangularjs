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

class Upload extends BaseController
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

	public function File()
	{

		$message = $this->session->flashdata('message');
		$this->data['title'] = 'File upload';
		$this->data['arrayData'] = '';
		$this->data['jquery'] = '';// array( 'custom/blog_post.js');
		$this->data['message'] = $message;
		$data = $this->input->post('formData');
		
		
		$count = count($_FILES['files']['name']);
 		// /$this->load->library('upload');
		for ($i= 0; $i<$count; $i++){
			if (!empty($_FILES['files']['name'][$i])) {
				
				$config['upload_path'] = 'uploads/';
				$config['allowed_types'] = 'jpg|jpeg|png|gif';
				$config['file_name'] = $_FILES['files']['name'][$i];
				$config['max_size']      = '5000';
				$config['max_width']     = '2000';
				$config['max_height']    = '2000';
				$config['overwrite'] = false;

				$_FILES['filenames']['name'] = $_FILES['files']['name'][$i];
				$_FILES['filenames']['type'] = $_FILES['files']['type'][$i];
				$_FILES['filenames']['tmp_name'] = $_FILES['files']['tmp_name'][$i];
				$_FILES['filenames']['error'] = $_FILES['files']['error'][$i];
				$_FILES['filenames']['size'] = $_FILES['files']['size'][$i];
				 
				// $this->load->library('upload', $config);
				$this->load->library('upload',$config);

				if ($this->upload->do_upload('filenames')) {
					echo 'dung';
					$uploadData[] = $this->upload->data();
					$data["image"] = $uploadData['file_name'];
				} else{
					$data["image"] = '';
				}
				
			}else{
				$data["image"] = '';
			}
		}
		
		//vardump($data);
	}
}
