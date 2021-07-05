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

class Navigation_Model extends Model {
    //put your code here
    
    public function setNavigation(){
        $array = array();

        $menuDashboard =  array(
            "name"       => "Dashboard",
            "permission" => "Page.dashboard",
            "url"        => "dashboard",
            "icon"       => "",
        );
        
        $menuHeThong =  array(
            "name"       => "Hệ thống",
            "permission" => "Page.hethong",
            "url"        => "",
            "icon"       => "",
            "length"     => 2,
            "items"      => array(
                array(
                    "name"       => "Role",
                    "permission" => "Page.hethong.role",
                    "url"        => "role",
                    "icon"       => "",
                ),
                array(
                    "name"       => "User",
                    "permission" => "Page.hethong.user",
                    "url"        => "user",
                    "icon"       => "",
                )
            )
        );

        $menuCauHinh =  array(
            "name"       => "Cấu hình",
            "permission" => "Page.cauhinh",
            "url"        => "",
            "icon"       => "",
            "length"     => 2,
            "items"      => array(
                array(
                    "name"       => "Vị trí quản cáo",
                    "permission" => "Page.cauhinh.vitriquangcao",
                    "url"        => "vitriquangcao",
                    "icon"       => "",
                ),
                array(
                    "name"       => "Cấu hình chung",
                    "permission" => "Page.cauhinh.cauhinhchung",
                    "url"        => "cauhinhchung",
                    "icon"       => "",
                )
            )
        );
        array_push($array, $menuDashboard);
        array_push($array, $menuCauHinh);
        array_push($array, $menuHeThong);

        return $array;
    }
}
