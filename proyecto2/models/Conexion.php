<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Conexion
 *
 * @author Oscar 
 */
class Conexion {
    
    
    function Conexion(){
        $this->db = ADONewConnection('mysql');
        $this->db->debug = true;
			       //ip     user      pass    bd
        $this->db->Connect('localhost','fifa_333423423','Narusaku131','revista');

    }
    
}

?>
