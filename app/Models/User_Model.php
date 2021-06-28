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

class User_Model extends Model {
    //put your code here
    
    var $table = 'qa_user';
    
    var $key = 'id';

    public function __construct() {
        parent::__construct();
        
        $db = db_connect();
    }
    
    public function convertJsonToArray($data){
        return json_decode(json_encode($data), true);
    }

    public function dateTime(){
        $dateTime = new \DateTime();
        $dateTime=$this->convertJsonToArray($dateTime);
        return $dateTime['date'];
    }

    public function get_list()
    {
        $query = $this->db->table($this->table)->where('isDelete !=', 1);        
        return $query->get()->getResult();
    }

    public function createOrUpdate($data)
    {
        $array = $this->convertJsonToArray($data);
        
        if(empty($array[$this->key])){
            $array['creaTime'] = $this->dateTime();
            $query = $this->db->table($this->table)->insert($array);
            return $query->resultID;
        }else{
            $array['editTime'] = $this->dateTime();
            $query = $this->db->table($this->table)->update($array, [$this->key => $array[$this->key]]);
            return $query->resultID;
        } 
    }

    public function deleteId($id)
    {
       $array['isDelete'] = 1;
       return $this->db->table($this->table)->update($array, [$this->key => $id]);
    }
}
