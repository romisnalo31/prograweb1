<?php

class Jugador extends Modelo{
    public $numero_tabla = 'jugador';
    public $pk = 'idjugador';
    
    
    public $atributos = array(
        'numero'=>array(),
        'idposicion'=>array(),
		'idpais'=>array(),
    );
    
    public $errores = array( );
    
    private $numero;
    private $idposicion;
	private $idpais;
       
    
    function Jugador(){
        parent::Modelo();
    }
    
    public function get_atributos(){
        $rs = array();
        foreach ($this->atributos as $key => $value) {
            $rs[$key]=$this->$key;
        }
        return $rs;
    }
    
    public function get_numero(){
        return $this->numero;
    } 

    public function set_numero($valor){

        $er = new Er();
        
        if ( !$er->valida_numero($valor) ){
            $this->errores[] = "Este numero (".$valor.") no es valido";
        }

        $rs = $this->consulta_sql("select * from jugador where numero = '$valor'");
        $rows = $rs->GetArray();
        
        /*if(count($rows) > 0){
            $this->errores[] = "Este numero (".$valor.") ya esta registrado"; 
        }else*/{
            $this->numero = trim($valor);
        }
    }
	
	public function get_idpais(){
        return $this->idpais;
    }
	
	public function set_idpais($valor){

        $er = new Er();
        
        if ( !$er->valida_idpais($valor) ){
            $this->errores[] = "Este pais (".$valor.") no es valido";
        }

        $rs = $this->consulta_sql("select * from jugador where idpais = '$valor'");
        $rows = $rs->GetArray();
        
        if(count($rows) > 0){
            $this->errores[] = "Este pais(".$valor.") ya esta registrado"; 
        }else{
            $this->idpais = trim($valor);
        }
    }
	
	public function get_idposicion(){
        return $this->idposicion;
    }
	
	public function set_idposicion($valor){

        $er = new Er();
        
        if ( !$er->valida_idposicion($valor) ){
            $this->errores[] = "Esta posicion (".$valor.") no es valida";
        }

        $rs = $this->consulta_sql("select * from jugador where idposicion = '$valor'");
        $rows = $rs->GetArray();
        
        if(count($rows) > 0){
            $this->errores[] = "Esta posicion (".$valor.") ya esta registrada"; 
        }else{
            $this->idposicion = trim($valor);
        }
    }

    


    
    
    
}

?>
