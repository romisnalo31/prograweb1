<?php

class Revista extends Modelo{
    public $nombre_tabla = 'revista';
    public $pk = 'id_revista';
    
    
    public $atributos = array(
        'nombre'=>array(),
		'portada'=>array(),
		'fecha'=>array(),
		'volumen'=>array(),
		'titulo'=>array(),
		'subtitulo'=>array(),
		'numero'=>array(),
		'clave'=>array(),
        'directorio'=>array(),
		'editorial'=>array(),
		'id_status'=>array(),
    );
    
    public $errores = array( );
    
    private $nombre;
	private $portada;
	private $fecha;
	private $volumen;
	private $titulo;
	private $subtitulo;
	private $numero;
	private $clave;
    private $directorio;
	private $editorial;
	private $id_status;
       
    
    function Revista(){
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

            $this->nombre = trim($valor);
    }
	
	public function get_fecha(){
        return $this->fecha;
    } 

    public function set_fecha($valor){

            $this->fecha = trim($valor);
    }
	
	public function get_volumen(){
        return $this->volumen;
    } 

    public function set_volumen($valor){
		$er = new Er();
        
        if ( !$er->valida_flotante($valor) ){
            $this->errores[] = "Este valor(".$valor.") no es valido";
        }
            $this->volumen = trim($valor);
    }
	
	public function get_titulo(){
        return $this->titulo;
    } 

    public function set_titulo($valor){

            $this->titulo = trim($valor);
    }
	
	public function get_subtitulo(){
        return $this->subtitulo;
    } 

    public function set_subtitulo($valor){

            $this->subtitulo = trim($valor);
    }
	
	public function get_numero(){
        return $this->numero;
    } 

    public function set_numero($valor){
		$er = new Er();
        
        if ( !$er->valida_flotante($valor) ){
            $this->errores[] = "Este valor(".$valor.") no es valido";
        }
            $this->numero = trim($valor);
    }
	
	public function get_clave(){
        return $this->clave;
    } 

    public function set_clave($valor){

            $this->clave = trim($valor);
    }
	
	public function get_id_status(){
        return $this->id_status;
    }
	
	public function set_id_status($valor){

            $this->id_status = trim($valor);
    }
	
	public function get_portada(){
        return $this->portada;
    }
	
	public function set_portada($valor){
	
		$er = new Er();
        
        if ( !$er->valida_imagen($valor) ){
            $this->errores[] = "Este archvio(".$valor.") no es una imagen.";
        }

        /*$rs = $this->consulta_sql("select * from equipo where escudo = '$valor'");
        $rows = $rs->GetArray();
        
        if(count($rows) > 0){
            $this->errores[] = "Este escudo (".$valor.") ya esta registrado"; 
        }else*/{
            $this->portada = trim($valor);
        }
    }
	
	public function get_directorio(){
        return $this->directorio;
    } 

    public function set_directorio($valor){

            $this->directorio = trim($valor);
    }
	
	public function get_editorial(){
        return $this->editorial;
    } 

    public function set_editorial($valor){

            $this->editorial = trim($valor);
    }

    


    
    
    
}

?>
