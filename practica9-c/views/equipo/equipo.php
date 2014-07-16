<?php 
  
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Equipo.php');
  include ('../../controllers/EquipoController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['nombre']))
  {
	  $equipoC = new EquipoController();
	  $equipoC->insertaEquipo($_POST);
  }
?>
    <h2>Registro Equipos</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formEquipo" method="POST">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre del integrante" name="nombre">
                  </div>
                  <div class="form-group">
                    <label for="escudo">Foto</label>
                    <input type="file" id="escudo" name="escudo">
                    <p class="help-block">Cargue la foto del integrante del Equipo</p>
                  </div>
                  <div class="form-group">
                    <label for="idpais">Pa&iacute;s</label>
                    <select clas="form-control" id="idpais" name="idpais">
                    	<option value="1">M&eacute;xico</option>
                    </select>
                  </div>
                  <input type="submit" class="btn btn-default" value="Guardar">
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
