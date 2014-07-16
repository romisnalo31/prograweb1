<?php
	class PosicionController extends Posicion{
		
		public $muestra_errores = false;
		function __construct(){
			 
		}
		
		public function insertaPosicion($datos)
		{
			echo"<pre>datos";
	  		print_r($datos);
	  		echo"</pre>";
			$posicion = new Posicion();
			$posicion->set_nombre($datos['nombre']);
			$posicion->set_abreviatura($datos['abreviatura']);
			if(count($posicion->errores)>0)
			{
				print_r($posicion->errores);
			}
			die();
		}
		
		public function validaUsuario($datos){
			$rs = $this->consulta_sql(" select * from usuarios where email = '".$datos['email']."'  ");
        	$rows = $rs->GetArray();
        	if(count($rows) > 0){
        		if ($rows['0']['password']== md5($datos['password'])) {
        			$this->iniciarSesion($rows['0']['rol'],$rows['0']['email']);
        		}else{
		     		$this->muestra_errores = true;
		     		$this->errores[] = 'Password incorrecto';
		     	}
	     	}else{
	     		$this->muestra_errores = true;
	     		$this->errores[] = 'este email no existe';
	     	}

		}

		public function iniciarSesion($rol,$email){
			$_SESSION['user'] = $rol;
			$_SESSION['email'] = $email;
			header("Location: inicio.php");
		}

		public function cerrarSesion(){
			session_destroy();
			header("Location: inicio.php");
		}

	}


?>