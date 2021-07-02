<?php 
namespace App\Libraries;

use \DateTime; 
class Common_Libraries
{
    public function convertJsonToArray($data){
        return json_decode(json_encode($data), true);
    }

    public function dateTime(){
        $dateTime = new \DateTime();
        $dateTime= $this->convertJsonToArray($dateTime);
        return $dateTime['date'];
    }
} 