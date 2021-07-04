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
use \DateTime; 
use App\Libraries\Common_Libraries;
use App\Models\Permission_Model;

class Role_Model extends Model {
    //put your code here
    
    var $table = 'qa_role';
    
    var $key = 'id';

    protected $libary;
    protected $permission;
    public function __construct() {
        parent::__construct();
        
        $db      = \Config\Database::connect();
        $this->libary = new Common_Libraries();
        $this->permission = new Permission_Model();
    }
    
    public function get_list($data)
    {
        $arrayx = $this->libary->convertJsonToArray($data);
        $filter = array(
            'roleName'=> $arrayx['filter']
        );

        $query = $this->db->table($this->table)->where('isDelete', 0)->like($filter); 
        $array = $query->get()->getResult();   
        foreach($array as $result){
            // $result->id = (int) $result->id;
            // $result->ngayTao = date("d-m-Y H:s", strtotime($result->creatTime));
            // $result->ngaySua = date("d-m-Y H:s", strtotime($result->editTime));
            $result->isDefault = (bool) $result->isDefault;
            $result->isDelete = (bool) $result->isDelete;
        }
        return $array;
    }

    public function createOrUpdate($data)
    {
        $array = $this->libary->convertJsonToArray($data);
        if(empty($array[$this->key])){
            $array['creatTime'] = $this->libary->dateTime();
            $query = $this->db->table($this->table)->insert($array);
            return $this->db->insertID();
        }else{
            
            $array['editTime'] = $this->libary->dateTime();
            $query = $this->db->table($this->table)->update($array, [$this->key => $array[$this->key]]);
            return $this->db->insertID();
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

    public function getListId($id)
    {
        $query = $this->db->table($this->table)->where('isDelete', 0)->where('id', $id); 
        $array = $query->get()->getResult();
        return $array;
    }
}
