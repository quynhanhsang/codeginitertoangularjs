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

class User_Model extends Model {
    //put your code here
    
    var $table = 'qa_user';
    
    var $key = 'id';
    
    protected $libary;

    public function __construct() {
        parent::__construct();
        
        $db      = \Config\Database::connect();
        $this->libary = new Common_Libraries();
    }

    public function get_list($data)
    {
        $searchData = $this->libary->convertJsonToArray($data);
        //$userNam = $searchData['filter'];
        // $filter = array(
        //     'userName' => $searchData['filter']? $searchData['filter']:'',
        //     'name' =>  $searchData['filter']? $searchData['filter']:'',
        //     'surName' =>  $searchData['filter']? $searchData['filter']:'',
        // );
        // $query = $this->db->table($this->table)
        //->select('id,userName,level,tennantId,email,phone,name,surName,subName,creatTime,userId,isDelete')
        //->where('isDelete',0)
        // ->like('userName', $searchData['filter']? $searchData['filter'] : '')
        //->orlike($filter); 
        $query = $this->db->query('SELECT id,userName,level,tennantId,email,phone,name,surName,subName,creatTime,userId,isDelete FROM '.$this->table.' where isDelete = 0 AND (userName LIKE "%'.$searchData['filter'].'%" OR name LIKE "%'.$searchData['filter'].'%" OR surName LIKE "%'.$searchData['filter'].'%") ');
        $array =$query->getResult(); 
        foreach($array as $result){
            // $result->id = (int) $result->id;
            $result->isDelete = (bool) $result->isDelete;
            
        }
        return $array;
    }

    public function createOrUpdate($data)
    {
        $array =  $this->libary->convertJsonToArray($data);
        
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
}
