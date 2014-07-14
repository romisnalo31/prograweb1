<?php 
  session_start();
  include ('../layouts/header.php');
?>
	<br /><br />
    <h2>Registro Integrantes</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formIntegrante">
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
                    <label for="edad">Edad</label>
                    <input type="number" class="form-control" id="edad" name="edad">
                  </div>
                  <div class="form-group">
                    <label for="idequipo">Continente</label>
                    <div class="dropdown">
                      <button class="btn btn-default dropdown-toggle" type="button" id="idequipo" data-toggle="dropdown" name="idequipo">
                        Seleccionar
                        <span class="caret"></span>
                      </button>
                      <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Action</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Another action</a></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Something else here</a></li>
                        <li role="presentation" class="divider"></li>
                        <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Separated link</a></li>
                      </ul>
                    </div>
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
              	Posici&oacute;n
              <div class="dropdown">
                  <button class="btn btn-default dropdown-toggle" type="button" id="idposicion" data-toggle="dropdown" name="idposicion">
                    Seleccionar
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Defensa</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Delantero</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Portero</a></li>
                    <li role="presentation"><a role="menuitem" tabindex="-1" href="#">Lateral</a></li>
                  </ul>
              </div>
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
