<?php 
  
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Status.php');
  include ('../../controllers/StatusController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['status']))
  {
	  $statusC = new StatusController();
	  $statusC->insertaStatus($_POST);
  }
?>
    <h2>Estatus</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formStatus" method="POST">
                  <div class="form-group">
                    <label for="status">Estatus</label>
                    <input type="text" class="form-control" id="status" placeholder="ej: público" name="status">
                  </div>
                  <input type="submit" class="btn btn-default" value="Guardar">
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
