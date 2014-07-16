<?php 
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Continente.php');
  include ('../../controllers/ContinenteController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['nombre']))
  {
	  $continenteC = new ContinenteController();
	  $continenteC->insertaContinente($_POST);
  }
?>
    <h2>Registro Continentes</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formContinente" method="POST">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre del continente" name="nombre">
                  </div>
                  <button type="submit" class="btn btn-default">Guardar</button>
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
