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
            "length"     => 3,
            "items"      => array(
                array(
                    "name"       => "Vị trí quảng cáo",
                    "permission" => "Page.cauhinh.vitriquangcao",
                    "url"        => "vitriquangcao",
                    "icon"       => "",
                ),
                array(
                    "name"       => "Kiểu Danh mục",
                    "permission" => "Page.cauhinh.categorytype",
                    "url"        => "categorytype",
                    "icon"       => "",
                ),
                array(
                    "name"       => "Menu",
                    "permission" => "Page.cauhinh.menu",
                    "url"        => "menu",
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

        $menuDanhmuc =  array(
            "name"       => "Danh mục",
            "permission" => "Page.danhmuc",
            "url"        => "",
            "icon"       => "",
            "length"     => 2,
            "items"      => array(
                array(
                    "name"       => "Danh mục",
                    "permission" => "Page.danhmuc.category",
                    "url"        => "category",
                    "icon"       => "",
                ),
                array(
                    "name"       => "Menu danh mục",
                    "permission" => "Page.danhmuc.menucategory",
                    "url"        => "menucategory",
                    "icon"       => "",
                )
            )
        );

        $menuNoiDung =  array(
            "name"       => "Nội dung",
            "permission" => "Page.noidung",
            "url"        => "",
            "icon"       => "",
            "length"     => 2,
            "items"      => array(
                array(
                    "name"       => "Bài viết",
                    "permission" => "Page.noidung.baiviet",
                    "url"        => "baiviet",
                    "icon"       => "",
                ),
                array(
                    "name"       => "Sản phẩm",
                    "permission" => "Page.noidung.sanpham",
                    "url"        => "sanpham",
                    "icon"       => "",
                )
            )
        );
        array_push($array, $menuDashboard);
        array_push($array, $menuCauHinh);
        array_push($array, $menuNoiDung);
        array_push($array, $menuDanhmuc);
        array_push($array, $menuHeThong);

        return $array;
    }
}
