<?php

class Usuario extends Modelo{
    public $numero_tabla = 'entrenador';
    public $pk = 'identrenador';
    
    
    public $atributos = array(
		'idpais'=>array(),
    );
    
    public $errores = array( );

	private $idpais;
       
    
    function Entrenador(){
        parent::Modelo();
    }
    
    public function get_atributos(){
        $rs = array();
        foreach ($this->atributos as $key => $value) {
            $rs[$key]=$this->$key;
        }
        return $rs;
    }
    
	public function get_idpais(){
        return $this->idpais;
    }
	
	public function set_idpais($valor){

        $er = new Er();
        
        if ( !$er->valida_idpais($valor) ){
            $this->errores[] = "Este pais (".$valor.") no es valido";
        }

        $rs = $this->consulta_sql("select * from entrenador where idpais = '$valor'");
        $rows = $rs->GetArray();
        
        if(count($rows) > 0){
            $this->errores[] = "Este pais(".$valor.") ya esta registrado"; 
        }else{
            $this->idpais = trim($valor);
        }
    }
	
	
    


    
    
    
}

?>
