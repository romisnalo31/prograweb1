<?php

class Usuario extends Modelo{
    public $nombre_tabla = 'usuarios';
    public $pk = 'id_usuario';
    
    
    public $atributos = array(
        'email'=>array(),
        'password'=>array(),
    );
    
    public $errores = array( );
    
    private $email;
    private $password;
       
    
    function Usuario(){
        parent::Modelo();
    }
    
    public function get_atributos(){
        $rs = array();
        foreach ($this->atributos as $key => $value) {
            $rs[$key]=$this->$key;
        }
        return $rs;
    }
    
    
    public function get_email(){
        return $this->email;
    } 

    public function set_email($valor){

        $er = new Er();
        
        if ( !$er->valida_email($valor) ){
            $this->errores[] = "Este e-mail (".$valor.") no es valido";
        }

        $rs = $this->consulta_sql("select * from usuarios where email = '$valor'");
        $rows = $rs->GetArray();
        
        if(count($rows) > 0){
            $this->errores[] = "Este e-mail (".$valor.") ya esta registrado"; 
        }else{
            $this->email = trim($valor);
        }
    }

    public function get_password(){
        return $this->baja;
    }
    
    public function set_password($valor){
        $this->password = trim( md5($valor) );
    }
    


    
    
    
}

?>
