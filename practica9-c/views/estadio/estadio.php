<?php 
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Estadio.php');
  include ('../../controllers/EstadioController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['Nombre']))
  {
	  $estadioC = new EstadioController();
	  $estadioC->insertaEstadio($_POST);
  }
?>
    <h2>Registro Estadio</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formEstadio" method="POST">
                  <div class="form-group">
                    <label for="Nombre">Nombre</label>
                    <input type="text" class="form-control" id="Nombre" placeholder="Nombre del estadio" name="Nombre">
                  </div>
                  <button type="submit" class="btn btn-default">Guardar</button>
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
