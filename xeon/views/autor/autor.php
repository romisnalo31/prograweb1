<?php 
  
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Autor.php');
  include ('../../controllers/AutorController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['nombre']))
  {
	  $autorC = new AutorController();
	  $autorC->insertaAutor($_POST);
  }
?>
    <h2>Autores</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formAutor" method="POST">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre(s)" name="nombre">
                  </div>
				  <div class="form-group">
                    <label for="apellidos">Apellidos</label>
                    <input type="text" class="form-control" id="apellidos" placeholder="Apellido(s)" name="apellidos">
                  </div>
				  <div class="form-group">
                    <label for="email">E-Mail</label>
                    <input type="text" class="form-control" id="email" placeholder="Correo Electrónico" name="email">
                  </div>
                  <input type="submit" class="btn btn-default" value="Guardar">
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
