<?php
	class StatusController extends Status{
		
		public $muestra_errores = false;
		function __construct(){
			 
		}
		
		public function insertaStatus($datos)
		{
			echo"<pre>datos";
	  		print_r($datos);
	  		echo"</pre>";
			$status = new Status();
			$status->set_status($datos['status']);
			if(count($status->errores)>0)
			{
				print_r($status->errores);
				die();
			}
			$status->inserta($status->get_atributos());
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