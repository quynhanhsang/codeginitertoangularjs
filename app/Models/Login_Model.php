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

class Login_Model extends Model {
    //put your code here
    
    var $table = 'qa_user';
    
    public function __construct() {
        parent::__construct();
        
        $db      = \Config\Database::connect();
    }
    
    public function get_user($data)
    {
        $query = $this->db->table($this->table)->where("isDelete", 0)->getWhere($data);        
        return $query->getResult();
    }
}
