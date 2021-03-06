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
use \DateTime; 
use App\Libraries\Common_Libraries;

class Permission_Model extends Model {
    //put your code here
    var $table = 'qa_permission';
    var $key = 'id';
    protected $libary;
    public function __construct() {
        parent::__construct();
        
        $db      = \Config\Database::connect();
        $this->libary = new Common_Libraries();
    }

    public function setPermission(){
        $dashboard = $this->createPermission('Dashboard','Page.dashboard');
        $hethong = $this->createPermission('Hệ thống','Page.hethong');
        $hethongchils1 = $this->createChildPermission('User','Page.hethong.user', $hethong);
        $hethongchils2 = $this->createChildPermission('Role','Page.hethong.role', $hethong);

        $cauHinh = $this->createPermission('Cấu hình','Page.cauhinh');
        $cauHinh1 = $this->createChildPermission('Vị trí quảng cáo','Page.cauhinh.vitriquangcao', $cauHinh);
        $cauHinh2 = $this->createChildPermission('Menu','Page.cauhinh.menu', $cauHinh);
        $cauHinh3 = $this->createChildPermission('Cấu hình chung','Page.cauhinh.cauhinhchung', $cauHinh);
        $cauHinh4 = $this->createChildPermission('Menu','Page.cauhinh.categorytype', $cauHinh);

        $danhmuc = $this->createPermission('Danh mục','Page.danhmuc');
        $danhmuc1 = $this->createChildPermission('Danh mục','Page.danhmuc.category', $danhmuc);
        $danhmuc2 = $this->createChildPermission('Menu danh mục','Page.danhmuc.menucategory', $danhmuc);

        $noidung = $this->createPermission('Nội dung','Page.noidung');
        $noidung1 = $this->createChildPermission('Bài viết','Page.noidung.baiviet', $noidung);
        $noidung2 = $this->createChildPermission('Sản phẩm','Page.noidung.sanpham', $noidung);
    }

    public function createPermission($name, $key)
    {
        $array =  array(
            "permissionName"  => $name,
            "permissionKey"   => $key,
        );

        $uresult = $this->getPermission(array("permissionKey"   => $key));
        
        if(count($uresult) > 0){
            $array['editTime'] = $this->libary->dateTime();
            $query = $this->db->table($this->table)->update($array, [$this->key => $uresult[0]->id]);
            return $uresult[0]->id;
        }else{
            $array['creatTime'] = $this->libary->dateTime();
            $query = $this->db->table($this->table)->insert($array);
            return $this->db->insertID();
        }
    }

    public function createChildPermission( $name, $key, $parentId)
    {
        $array =  array(
            "permissionName"  => $name,
            "permissionKey"   => $key,
            "parentId"        => $parentId,
        );
        $uresult = $this->getPermission(array("permissionKey"   => $key));
        if(count($uresult) > 0){
            $array['editTime'] = $this->libary->dateTime();
            $query = $this->db->table($this->table)->update($array, [$this->key => $uresult[0]->id]);
            return $uresult[0]->id;
        }else{
            $array['creatTime'] = $this->libary->dateTime();
            $query = $this->db->table($this->table)->insert($array);
            return $this->db->insertID();
        }
       
    }

    public function getPermission($data)
    {
        $query = $this->db->table($this->table)->getWhere($data);        
        return $query->getResult();
    }

    public function getPermissionAll(){
        $query = $this->db->table($this->table)->where('isDelete', 0); 
        $array = $query->get()->getResult();   
        foreach($array as $result){
            // $result->id = (int) $result->id;
            $result->parentId = (int) $result->parentId;
            $result->isDelete = (bool) $result->isDelete;
        }
        return $array;
    }

    public function getPermissionID($dataID){
        $textQuery = '';
        foreach($dataID as $item){
            $textQuery .= 'id = '.$item.' OR ';
        }
        //echo trim($textQuery, 'OR ');
        $query = $this->db->query('SELECT * FROM '.$this->table.' where isDelete = 0 AND ( '.trim($textQuery, 'OR ').')');
        //$query = $this->db->table($this->table)->where('isDelete', 0); 
        $array = $query->getResult();
        return $array;
    }
}
