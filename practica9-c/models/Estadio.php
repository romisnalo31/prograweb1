<?php

class Estadio extends Modelo{
    public $Nombre_tabla = 'estadio';
    public $pk = 'idestadio';
    
    
    public $atributos = array(
        'Nombre'=>array(),
    );
    
    public $errores = array( );
    
    private $Nombre;
       
    
    function Estadio(){
        parent::Modelo();
    }
    
    public function get_atributos(){
        $rs = array();
        foreach ($this->atributos as $key => $value) {
            $rs[$key]=$this->$key;
        }
        return $rs;
    }
    
    
    public function get_Nombre(){
        return $this->Nombre;
    } 

    public function set_Nombre($valor){

        $er = new Er();
        
        if ( !$er->valida_nombre($valor) ){
            $this->errores[] = "Este nombre (".$valor.") no es valido";
        }

        $rs = $this->consulta_sql("select * from estadio where Nombre = '$valor'");
        $rows = $rs->GetArray();
        
        if(count($rows) > 0){
            $this->errores[] = "Este nombre (".$valor.") ya esta registrado"; 
        }else{
            $this->Nombre = trim($valor);
        }
    }

    


    
    
    
}

?>
