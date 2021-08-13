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
use App\Models\Category_Model;
use \DateTime; 

class Blog_Model extends Model {
    //put your code here
    
    var $table = 'qa_blog';
    
    var $key = 'id';
    
    protected $libary;

    public function __construct() {
        parent::__construct();
        
        $db      = \Config\Database::connect();
        $this->libary = new Common_Libraries();
        $this->Category_Model = new Category_Model();
    }

    public function get_list($data)
    {
        $arrayx = $this->libary->convertJsonToArray($data);
        
        $filter = array(
            $this->table.'.title'=> $arrayx['filter']
        );
        // $builder = $this->table($this->table)
        // ->select('qa_category.title, qa_category.typeCode,qa_category.seoAlias,qa_category.seoTitle,qa_category.seoKeywords,qa_category.seoDescription,qa_category.parentId,qa_category.isActive,qa_category.isDelete, qa_categorytype.title as categoryTypeName')
        // ->where('qa_category.isDelete', false)
        // ->like($filter)
        // ->join('qa_categorytype', 'qa_categorytype.typeCode = qa_category.typeCode','left');

        $query = $this->db->table($this->table)
                            ->select('
                            qa_blog.id, 
                            qa_blog.title, 
                            qa_blog.editedBy,
                            qa_blog.description,
                            qa_blog.categoryId,
                            qa_blog.tag, 
                            qa_blog.isActive,
                            qa_blog.isDelete,
                            qa_blog.viewCount,
                            qa_blog.seoTitle,
                            qa_blog.seoKeywords,
                            qa_blog.seoAlias,
                            qa_blog.seoDescription,
                            qa_blog.tennantId,
                            qa_blog.creatTime,
                            qa_blog.editTime,
                            qa_user.userName,
                            qa_user.name as author')
                            ->where($this->table.'.isDelete', 0)->like($filter)
                            ->join('qa_user', 'qa_user.id = qa_blog.tennantId','left'); 
        
        $array = $query->get()->getResult();   
        foreach($array as $result){
            $arrayCategory = array();
            foreach( json_decode($result->categoryId) as $item){
                // var_dump($this->Category_Model->getCategoryById($item));
                array_push($arrayCategory, $this->Category_Model->getCategoryById($item)[0]);
            }
            // $result->id = (int) $result->id;
            // $result->ngayTao = date("d-m-Y H:s", strtotime($result->creatTime));
            // $result->ngaySua = date("d-m-Y H:s", strtotime($result->editTime));
            $result->isActive = (bool) $result->isActive;
            $result->arrayCategory = $arrayCategory;
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

    public function getById($id){
        //$array = $this->libary->convertJsonToArray($data);
        $query = $this->db->table($this->table)->where("isDelete", 0)->getWhere([$this->key => $id]);        
        return $query->getResult();
        //return $data;
    }
}
