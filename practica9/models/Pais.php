<?php

class Usuario extends Modelo{
    public $nombre_tabla = 'pais';
    public $pk = 'idpais';
    
    
    public $atributos = array(
        'nombre'=>array(),
        'idcontinente'=>array(),
		'bandera'=>array(),
    );
    
    public $errores = array( );
    
    private $nombre;
    private $idcontinente;
	private $bandera;
       
    
    function Pais(){
        parent::Modelo();
    }
    
    public function get_atributos(){
        $rs = array();
        foreach ($this->atributos as $key => $value) {
            $rs[$key]=$this->$key;
        }
        return $rs;
    }
    
    
    public function get_nombre(){
        return $this->nombre;
    } 

    public function set_nombre($valor){

        $er = new Er();
        
        if ( !$er->valida_nombre($valor) ){
            $this->errores[] = "Este nombre (".$valor.") no es valido";
        }

        $rs = $this->consulta_sql("select * from pais where nombre = '$valor'");
        $rows = $rs->GetArray();
        
        if(count($rows) > 0){
            $this->errores[] = "Este nombre (".$valor.") ya esta registrado"; 
        }else{
            $this->nombre = trim($valor);
        }
    }
	
	public function get_bandera(){
        return $this->bandera;
    }
	
	public function set_bandera($valor){
	
		$er = new Er();
        
        if ( !$er->valida_imagen($valor) ){
            $this->errores[] = "(".$valor.") no es imagen";
        }

        $rs = $this->consulta_sql("select * from pais where bandera = '$valor'");
        $rows = $rs->GetArray();
        
        /*if(count($rows) > 0){
            $this->errores[] = "Este bandera (".$valor.") ya esta registrado"; 
        }else*/{
            $this->bandera = trim($valor);
        }
    }
	
	public function get_idpais(){
        return $this->idpais;
    }
	
	public function set_idcontinente($valor){

        $er = new Er();
        
        if ( !$er->valida_idcontinente($valor) ){
            $this->errores[] = "Este continente (".$valor.") no es valido";
        }

        $rs = $this->consulta_sql("select * from pais where idcontinente = '$valor'");
        $rows = $rs->GetArray();
        
        /*if(count($rows) > 0){
            $this->errores[] = "Este continente (".$valor.") ya esta registrado"; 
        }else*/{
            $this->idcontinente = trim($valor);
        }
    }

    


    
    
    
}

?>
