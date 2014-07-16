<?php

class Er
{
    //Email
	public function valida_email($valor)
	{
		$exp_reg = '/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Imagen
	public function valida_imagen($valor)
	{
		$exp_reg = '%\.(gif|jpe?g|png)$%i'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Código postal
	public function valida_cp($valor)
	{
		$exp_reg = '/^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Valores flotantes
	public function valida_flotante($valor)
	{
		$exp_reg = '/^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Password 
	function verificar_password_strenght($password)
	{ 
		if (preg_match("/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/", $password))
			echo "Su password seguro.";
		else
			echo "Su password inseguro.";
	}
	//IPv4
	function verificar_ip($ip)
	{
		return preg_match("/^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])"."
				(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/", $ip );
	}
	
		
	//Nombre y apellido
	public function valida_nombre($valor)
	{
		$exp_reg = '/^[A-Za-záéíóúñ]{2,}([\s][A-Za-záéíóúñ]{2,})*+$/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Verificar usuario
	public function valida_usuario($valor)
	{
		$exp_reg = '/^[a-z0-9_-]{3,15}$/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Seguridad de contraseña
	public function valida_seguridad($valor)
	{
		$exp_reg = '/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Número de teléfono
	public function valida_telefono($valor)
	{
		$exp_reg = '/^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Minúsculas
	public function valida_minusculas($valor)
	{
		$exp_reg = '/[a-z]/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Entero
	public function valida_entero($valor)
	{
		$exp_reg = '/^(?:\+|-)?\d+$/'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Fecha
	public function valida_fecha($valor)
	{
		$exp_reg = '^\d{1,2}\/\d{1,2}\/\d{2,4}$'; 
		if (preg_match($exp_reg, $valor))
		{
		     return true;
		} else
		{ 
		     return false;
		} 
	}
	
	//Cambiar formato de fecha
	function cambiar_formato_fecha($fecha)
	{ 
		return preg_replace("/([0-9]{4})\/([0-9]{2})\/([0-9]{2})/i","$3/$2/$1",$fecha);
	}

	
	
	

}

?>    