<?php 
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Integrante.php');
  include ('../../models/Entrenador.php');
  include ('../../models/Jugador.php');
  include ('../../controllers/IntegranteController.php');
  include ('../../controllers/EntrenadorController.php');
  include ('../../controllers/JugadorController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['nombre']))
  {
	  $paisC = new IntegranteController();
	  $paisC->insertaIntegrante($_POST);
  }
  if(isset($_POST['nombre']))
  {
	  $paisC = new EntrenadorController();
	  $paisC->insertaEntrenador($_POST);
  }
  if(isset($_POST['nombre']))
  {
	  $paisC = new JugadorController();
	  $paisC->insertaJugador($_POST);
  }
?>
	<br /><br />
    <h2>Registro Integrantes</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formIntegrante" method="POST">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre del integrante" name="nombre">
                  </div>
                  <div class="form-group">
                    <label for="apellido">Apellido(s)</label>
                    <input type="text" class="form-control" id="apellido" placeholder="Apellido(s) del integrante" name="apellido">
                  </div>
                  <div class="form-group">
                    <label for="peso">Peso</label>
                    <input type="text" class="form-control" id="peso" placeholder="Peso en Kg" name="peso">
                  </div>
                  <div class="form-group">
                    <label for="estatura">Estatura</label>
                    <input type="text" class="form-control" id="estatura" placeholder="Estatura en metros" name="estatura">
                  </div>
                  <div class="form-group">
                    <label for="foto">Foto</label>
                    <input type="file" id="foto" name="foto">
                    <p class="help-block">Cargue la foto del integrante del Equipo</p>
                  </div>
                  <div class="form-group">
                    <label for="Edad">Edad</label>
                    <input type="number" class="form-control" id="Edad" name="Edad">
                  </div>
				  <div class="form-group">
                    <label for="idequipo">Equipo</label>
                    <select class="form-control" id="idequipo" name="idequipo">
                    	<option value="1">M&eacute;xico</option>
                    </select>
                  </div>
                  <div class="form-group">
              <div class="radio">
                  <label>
                    <input type="radio" name="optionsRadios1" id="radioJugador" value="jugador">
                    Jugador
                  </label>
              </div>
              <div class="radio">
                  <label>
                    <input type="radio" name="optionsRadios1" id="radioEntrenador" value="entrenador">
                    Entrenador
                  </label>
              </div>
              </div>
                
             </div>
        </div>
        <div class="row" id="formJugador" style="display:none">
        <div class="col-md-6">
          <h3>Jugador</h3>
              <div class="form-group">
                <label for="numero">N&uacute;mero</label>
                <input type="number" class="form-control" id="numero" placeholder="Número de la playera" name="numero">
              </div>
              <div class="form-group">
                    <label for="idposicion">Posici&oacute;n</label>
                    <select clas="form-control" id="idposicion" name="idposicion">
                    	<option value="1">Delantero</option>
                    </select>
              </div>
          </div>
          </div>
          <div class="row" id="formEntrenador" style="display:none">
          <div class="col-md-6">
          <h3>Entrenador</h3>
              <div class="form-group">
                <label for="idpais">Pa&iacute;s</label>
                <input type="text" class="form-control" id="idpais" placeholder="Nacionalidad del entrenador" name="idpais">
              </div>
          </div>
          </div>
          <button type="submit" class="btn btn-default">Guardar</button>
          </form>
     </div>
     



      
<?php include ('../layouts/footer.php'); ?>
