<?php
namespace App\Models;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Signup_Model
 *
 * @author vishal
 */
use CodeIgniter\Model;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use \Psr\Log\LoggerInterface;
use App\Libraries\Common_Libraries;
use \DateTime; 

class Category_Model extends Model {
    //put your code here
    
    var $table = 'qa_category';
    
    var $key = 'id';
    
    protected $libary;
    protected $db;

    public function __construct() {
        parent::__construct();
        
        $this->db      = \Config\Database::connect();
        $this->libary = new Common_Libraries();
    }

    public function get_list($data)
    {
        $arrayx = $this->libary->convertJsonToArray($data);
        
        $filter = array(
            'qa_category.title'=> $arrayx['filter']
        );

        //$query = $this->db->table($this->table)->where('isDelete', 0)->like($filter); 
        $builder = $this->table($this->table)
                        ->select('
                        qa_category.id,
                        qa_category.title, 
                        qa_category.typeCode,
                        qa_category.seoAlias,
                        qa_category.seoTitle,
                        qa_category.seoKeywords,
                        qa_category.seoDescription,
                        qa_category.parentId,
                        qa_category.isActive,
                        qa_category.isDelete, 
                        qa_categorytype.title as categoryTypeName')
                        ->where('qa_category.isDelete', false)
                        ->like($filter)
                        ->join('qa_categorytype', 'qa_categorytype.typeCode = qa_category.typeCode','left');
    
        // $builder->where('isDelete', 0);
        $array = $builder->get()->getResult();   
        foreach($array as $result){
            // $result->id = (int) $result->id;
            // $result->ngayTao = date("d-m-Y H:s", strtotime($result->creatTime));
            // $result->ngaySua = date("d-m-Y H:s", strtotime($result->editTime));
            $result->isActive = (bool) $result->isActive;
            // $result->isDefault = (bool) $result->isDefault;
            $result->isDelete = (bool) $result->isDelete;
        }
        return $array;
    }

    public function createOrUpdate($data)
    {
        $array = $this->libary->convertJsonToArray($data);
        
        if(empty($array[$this->key])){
            $array['creatTime'] = $this->libary->dateTime();
            $array['tennantId'] = session()->get('tennantId');
            $query = $this->db->table($this->table)->insert($array);
            return $this->db->insertID();
        }else{
            
            $array['editTime'] = $this->libary->dateTime();
            $array['creatTime'] = $this->libary->dateTime();
            $query = $this->db->table($this->table)->update($array, [$this->key => $array[$this->key]]);
            
            return $array[$this->key];
        } 
    }

    public function deleteId($id)
    {
       $array['isDelete'] = 1;
       return $this->db->table($this->table)->update($array, [$this->key => $id]);
    }

    public function getAllDLL()
    {
        $query = $this->db->table($this->table)->where('isDelete', 0); 
        $array = $query->get()->getResult();
        return $array;
    }

    public function getCategoryById($id)
    {    
        $query = $this->db->table($this->table)->where("isDelete", 0)->where('id' ,$id);        
            
        return $query->get()->getResult();
    }
}
