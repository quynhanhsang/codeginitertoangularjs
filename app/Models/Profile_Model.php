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

class Profile_Model extends Model {
    //put your code here
    
    var $table = 'qa_user';
    
    public function __construct() {
        parent::__construct();
        
        $db      = \Config\Database::connect();
    }
    
    public function get_user($data)
    {
        $query = $this->db->table($this->table)->getWhere($data);        
        return $query->getResult();
    }

    public function get_list_user()
    {
        $query = $this->db->table($this->table);        
        return $query->getResult();
    }
}
