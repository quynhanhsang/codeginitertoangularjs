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

class File extends BaseController
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
		$this->baseUrl = base_url();
		helper(['form', 'url']);
		$this->inputRequet = $this->request->getJSON();
    }

	public function index()
	{ 

	}

	// public function File()
	// {
	// 	$validated = $this->validate([
    //         'file' => [
    //             'uploaded[file]',
    //             'mime_in[file,image/jpg,image/jpeg,image/gif,image/png]',
    //             'max_size[file,4096]',
    //         ],
    //     ]);

	// 	$msg = 'Please select a valid file';
  
    //     if ($validated) {
    //         $avatar = $this->request->getFile('file');
    //         $avatar->move(WRITEPATH . 'uploads');
 
    //       $data = [
 
    //         'name' =>  $avatar->getClientName(),
    //         'type'  => $avatar->getClientMimeType()
    //       ];
 
    //       $save = $builder->insert($data);
    //       $msg = 'File has been uploaded';
    //     }
 
	// 	var_dump('sang');
	// }

	// public function Upload()
	// {
	// 	if ($this->request->getMethod() == "post") {

	// 		$rules = [
	// 			"name" => "required",
	// 			"email" => "required|valid_email",
	// 			"mobile" => "required",
	// 			"profileImage" => [
	// 				"rules" => "uploaded[profileImage]|max_size[profileImage,1024]|is_image[profileImage]|mime_in[profileImage,image/jpg,image/jpeg,image/gif,image/png]",
	// 				"label" => "Profile Image",
	// 			],
	// 		];

	// 		if (!$this->validate($rules)) {

	// 			$response = [
	// 				'success' => false,
	// 				'msg' => "There are some validation errors",
	// 			];

	// 			return $this->response->setJSON($response);
	// 		} else {

	// 			$file = $this->request->getFile('profileImage');

	// 			$profile_image = $file->getName();

	// 			// Renaming file before upload
	// 			$temp = explode(".",$profile_image);
	// 			$newfilename = round(microtime(true)) . '.' . end($temp);

	// 			if ($file->move("images", $newfilename)) {

	// 				$studentModel = new StudentModel();

	// 				$data = [
	// 					"name" => $this->request->getVar("name"),
	// 					"email" => $this->request->getVar("email"),
	// 					"mobile" => $this->request->getVar("mobile"),
	// 					"profile_image" => "images/" . $newfilename,
	// 				];

	// 				if ($studentModel->insert($data)) {

	// 					$response = [
	// 						'success' => true,
	// 						'msg' => "Student created successfully",
	// 					];
	// 				} else {

	// 					$response = [
	// 						'success' => false,
	// 						'msg' => "Failed to create student",
	// 					];
	// 				}

	// 				return $this->response->setJSON($response);
	// 			} else {

	// 				$response = [
	// 					'success' => false,
	// 					'msg' => "Failed to upload Image",
	// 				];

	// 				return $this->response->setJSON($response);
	// 			}
	// 		}
	// 	}
	// }

	public function Uploads(){

		// $data = array();
  
		// // Read new token and assign to $data['token']
		// //$data['token'] = csrf_hash();
		// var_dump('sang tranb');
		// ## Validation
		// $validation = \Config\Services::validation();
  
		// $input = $validation->setRules([
		//    'file' => 'uploaded[file]|max_size[file,1024]|ext_in[file,jpeg,jpg,docx,pdf],'
		// ]);
  
		// if ($validation->withRequest($this->request)->run() == FALSE){
  
		//    $data['success'] = 0;
		//    $data['error'] = $validation->getError('file');// Error response
  
		// }else{
  
		//    if($file = $this->request->getFile('file')) {
		// 	  if ($file->isValid() && ! $file->hasMoved()) {
		// 		 // Get file name and extension
		// 		 $name = $file->getName();
		// 		 $ext = $file->getClientExtension();
  
		// 		 // Get random file name
		// 		 $newName = $file->getRandomName();
  
		// 		 // Store file in public/uploads/ folder
		// 		 $file->move('../public/uploads', $newName);
  
		// 		 // File path to display preview
		// 		 $filepath = base_url()."/uploads/".$newName;
  
		// 		 // Response
		// 		 $data['success'] = 1;
		// 		 $data['message'] = 'Uploaded Successfully!';
		// 		 $data['filepath'] = $filepath;
		// 		 $data['extension'] = $ext;
  
		// 	  }else{
		// 		 // Response
		// 		 $data['success'] = 2;
		// 		 $data['message'] = 'File not uploaded.'; 
		// 	  }
		//    }else{
		// 	  // Response
		// 	  $data['success'] = 2;
		// 	  $data['message'] = 'File not uploaded.';
		//    }
		// }
		// return $this->response->setJSON($data);
		helper(['form', 'url']);
         
        $database = \Config\Database::connect();
        //$builder = $database->table('users');

		$validateImage = $this->validate([
            'userfile' => [
                'uploaded[userfile]',
				'mime_in[userfile, image/jpg,image/jpeg,image/gif,image/png]',
				'max_size[userfile, 4098]',
            ],
        ]);
    
        $response = [
            'success' => false,
            'data' => '',
            'msg' => "Xảy ra lỗi khi upload ảnh"
        ];

        if ($validateImage) {
            $imageFile = $this->request->getFile('userfile');
            $imageFile->move('uploads/users');

            $data = [
                'img_name' => $imageFile->getClientName(),
                'file'  => $imageFile->getClientMimeType()
            ];

            //$save = $builder->insert($data);

            $response = [
                'success' => true,
                'data' => $save,
                'msg' => "Upload ảnh thành công",
				'linkImage' => "public/uploads/users/".$data['img_name'],
				'nameImage' => "public/uploads/users/".$data['file'],
            ];
        }
		
        return $this->response->setJSON($response);
	 }
}
