<?php

class Autor extends Modelo{
    public $nombre_tabla = 'autor';
    public $pk = 'id_autor';
    
    public $atributos = array(
        'nombre'=>array(),
		'apellidos'=>array(),
        'email'=>array(),
    );
    
    public $errores = array( );
    
    private $nombre;
    private $apellidos;
	private $email;
       
    
    function Autor(){
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

        $rs = $this->consulta_sql("select * from autor where nombre = '$valor'");
        $rows = $rs->GetArray();
        
        if(count($rows) > 0){
            $this->errores[] = "Este nombre (".$valor.") ya esta registrado"; 
        }else{
            $this->nombre = trim($valor);
        }
    }
	
	public function get_apellidos(){
        return $this->apellidos;
    } 

    public function set_apellidos($valor){

        $er = new Er();
        
        if ( !$er->valida_nombre($valor) ){
            $this->errores[] = "Los apellidos (".$valor.") no son validos";
        }
        
        /*if(count($rows) > 0){
            $this->errores[] = "Este apellido (".$valor.") ya esta registrado"; 
        }else*/{
            $this->apellidos = trim($valor);
        }
    }
	
	public function get_email(){
        return $this->email;
    }
	
	public function set_email($valor){
		$er = new Er();
        
        if ( !$er->valida_email($valor) ){
            $this->errores[] = "Este email(".$valor.") no es valido";
        }
            $this->email = trim($valor);
        
    }

    


    
    
    
}

?>
