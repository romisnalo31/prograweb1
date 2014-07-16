<?php 
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Pais.php');
  include ('../../controllers/PaisController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['nombre']))
  {
	  $paisC = new PaisController();
	  $paisC->insertaPais($_POST);
  }
?>
    <h2>Registro Pa&iacute;ses</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formPais" method="POST">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre del país" name="nombre">
                  </div>
                  <div class="form-group">
                    <label for="bandera">Bandera</label>
                    <input type="file" id="bandera" name="bandera">
                    <p class="help-block">Cargue la imagen de la bandera</p>
                  </div>
                  <div class="form-group">
                    <label for="idcontinente">Continente</label>
                    <select class="form-control" id="idcontinente" name="idcontinente">
                    	<option value="1">Am&eacute;rica</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-default">Guardar</button>
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
