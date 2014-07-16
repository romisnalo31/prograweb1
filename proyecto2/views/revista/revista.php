<?php 
  
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Revista.php');
  include ('../../controllers/RevistaController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['nombre']))
  {
	  $revistaC = new RevistaController();
	  $revistaC->insertaRevista($_POST);
  }
?>
    <h2>Art&iacute;culos</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formRevista" method="POST">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre de la revista." name="nombre">
                  </div>
                  <div class="form-group">
                    <label for="portada">Portada</label>
                    <input type="file" id="portada" name="portada">
                    <p class="help-block">Cargue la portada de esta n&uacute;mero.</p>
                  </div>
				  <div class="form-group">
                  <label for="fecha">Fecha</label>
                      <div class='input-group date' id='datetimepicker10'>
                          <input type='text' class="form-control" id="fecha" name="fecha"/>
                          <span class="input-group-addon"><span class="fa fa-calendar">
                                </span>
                          </span>
                      </div>
                  </div>
				  <div class="form-group">
                    <label for="volumen">Volumen</label>
                    <input type="text" class="form-control" id="volumen" name="volumen">
                  </div>
                  <div class="form-group">
                    <label for="titulo">T&iacute;tulo</label>
                    <input type="text" class="form-control" id="titulo" name="titulo">
                  </div>
				  <div class="form-group">
                    <label for="subtitulo">Subt&iacute;tulo</label>
                    <textarea class="form-control" rows="3" id="subtitulo" name="subtitulo"></textarea>
                  </div>
				  <div class="form-group">
                    <label for="numero">N&uacute;mero</label>
                    <input type="text" class="form-control" id="numero" name="numero">
                  </div>
				  <div class="form-group">
                    <label for="clave">Clave</label>
                    <input type="text" class="form-control" id="clave" name="clave">
                  </div>
                  <div class="form-group">
                    <label for="directorio">Directorio</label>
                    <textarea class="form-control" rows="4" id="directorio" placeholder="Directorio" name="directorio"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="editorial">Editorial</label>
                    <textarea class="form-control" rows="4" id="editorial" placeholder="Editorial de la revista" name="editorial"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="id_status">Estatus</label>
                    <select clas="form-control" id="id_status" name="id_status">
                    	<option value="1">P&uacute;blico</option>
                    </select>
                  </div>
                  <input type="submit" class="btn btn-default" value="Guardar">
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
