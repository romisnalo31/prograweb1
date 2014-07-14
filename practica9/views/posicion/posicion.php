<?php 
  session_start();
  include ('../layouts/header.php');
?>
	<br /><br />
    <h2>Registro Posici&oacute;n</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formPosicion">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="ej: delantero" name="nombre">
                  </div>
                  <div class="form-group">
                    <label for="abreviatura">Abreviatura</label>
                    <input type="text" class="form-control" id="abreviatura" placeholder="ej: del" name="abreviatura">
                  </div>
                  <button type="submit" class="btn btn-default">Guardar</button>
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
