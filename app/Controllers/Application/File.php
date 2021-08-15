<?php

namespace App\Controllers\Application;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\I18n\Time;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use CodeIgniter\HTTP\Message;
use App\Controllers\BaseController;
use App\Models\Blog_Model;
use App\Database\Migrations;
use App\Libraries\Common_Libraries;
use App\Models\Gallery_Model;


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
		$this->Gallery_Model = new Gallery_Model();
		$this->inputRequet = $this->request->getJSON();
    }

	public function index()
	{ 

	}

	public function load()
	{  
		$datetime = new Time;
		
		var_dump($datetime->getYear());
	}
	public function Uploads(){
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

	
	public function MuntilUploads(){
		$validateImage = $this->validate([
			'file' => [
				'uploaded[file]',
				// 'mime_in[file, image/jpg,image/jpeg,image/gif,image/png,image/svg,image/svg+xml,application/xml,text/xml,video/mp4,video/mpeg,video/quicktime,video/avi,video/3gpp,application/zip,application/msword,application/x-zip,application/msexcel,application/x-msexcel,application/x-ms-excel,application/x-excel,application/x-dos_ms_excel,application/xls,application/x-xls,application/excel,
				// application/download,application/msword,application/octet-stream,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet]',
				'max_size[file, 4098]',
			],
		]);

		$response = [
			'success' => false,
			'data' => '',
			'msg' => "Xảy ra lỗi khi upload ảnh"
		];
		
		//dattime
		
		
		if ($validateImage) {
			
			$datetime = new Time;

			$imageFile = $this->request->getFile('file');
			$imageFile->move('uploads/gallery/'.$datetime->getYear().'/'.$datetime->getMonth().'/'.$datetime->getDay());
			
			$type = $imageFile->getClientMimeType();
			$typeId = 1;

			
			$slug = "public/uploads/gallery/".$datetime->getYear().'/'.$datetime->getMonth().'/'.$datetime->getDay().'/'.$imageFile->getClientName();
			
			if($type == 'image/jpg' || $type == 'image/jpeg' || $type == 'image/gif' || $type == 'image/png' || $type == 'image/svg' || $type == 'image/svg+xml' || $type == 'application/xml' || $type == 'text/xml'){
				$typeId = 1;
				
			}elseif($type == 'video/mp4' || $type == 'video/mpeg' || $type == 'video/quicktime' || $type == 'video/3gpp'){
				$typeId = 2;
			}else{
				$typeId = 3;
			}

			$data = [
				'title' => $imageFile->getClientName(),
				'slug'  => $slug,
				'type'  => $type,
				'typeId' => $typeId,
			];

			$save = $this->Gallery_Model->createOrUpdate($data);

			$response = [
				'success' => true,
				'data' => $save,
				'msg' => "Upload ảnh thành công",
				'file'  => $imageFile->getClientMimeType(),
			];
		}
		
		return $this->response->setJSON($response);
	}

	public function getListFile(){
		$uresult = $this->Gallery_Model->get_list($this->inputRequet);
		// echo json_encode($uresult);
		return $this->response->setJSON($uresult);
	}

	public function delete()
	{
		$this->Gallery_Model->deleteId($this->inputRequet);
	}

}
