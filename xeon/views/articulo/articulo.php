<?php 
  
  include ('../../libs/adodb5/adodb-pager.inc.php');
  include ('../../libs/adodb5/adodb.inc.php');
  include ('../../models/Conexion.php');
  include ('../../models/Modelo.php');
  include ('../../models/Usuario.php');
  include ('../../models/Articulo.php');
  include ('../../controllers/ArticuloController.php');
  include ('../../libs/Er.php');
  include ('../layouts/header.php');
  
  if(isset($_POST['nombre']))
  {
	  $equipoC = new ArticuloController();
	  $equipoC->insertaArticulo($_POST);
  }
?>
    <h2>Art&iacute;culos</h2><hr>
	<div class="container">
    	<div class="row">
            <div class="col-md-6">
                <form role="form" id="formArticulo" method="POST">
                  <div class="form-group">
                    <label for="nombre">Nombre</label>
                    <input type="text" class="form-control" id="nombre" placeholder="Nombre del artículo" name="nombre">
                  </div>
				  <div class="form-group">
                    <label for="resumen">Resumen</label>
                    <textarea class="form-control" rows="3" id="resumen" placeholder="Resumen del artículo" name="resumen"></textarea>
                  </div>
				  <div class="form-group">
                    <label for="abstracts">Abstract</label>
                    <textarea class="form-control" rows="4" id="abstracts" placeholder="Abstract del artículo" name="abstracts"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="introduccion">Introducii&oacute;n</label>
                    <textarea class="form-control" rows="5" id="introduccion" placeholder="Introdución del artículo" name="introduccion"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="metodologia">Metodolog&iacute;a</label>
                    <textarea class="form-control" rows="4" id="metodologia" placeholder="Metodología del artículo" name="metodologia"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="contenido">Contenido</label>
                    <textarea class="form-control" rows="10" id="contenido" placeholder="Contenido del artículo" name="contenido"></textarea>
                  </div>
                  <div class="form-group">
                  <label for="fecha_creacion">Fecha de Creaci&oacute;n</label>
                      <div class='input-group date' id='datetimepicker10'>
                          <input type='text' class="form-control" id="fecha_creacion" name="fecha_creacion"/>
                          <span class="input-group-addon"><span class="fa fa-calendar">
                                </span>
                          </span>
                      </div>
                  </div>
                  <div class="form-group">
                    <label for="archivo_pdf">Archivo PDF</label>
                    <input type="file" id="archivo_pdf" name="archivo_pdf">
                    <p class="help-block">Cargue el artpiculo en formato PDF</p>
                  </div>
                  <div class="form-group">
                    <label for="id_status">Estatus</label>
                    <select clas="form-control" id="id_status" name="id_status">
                    	<option value="1">P&uacute;blico</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="conclusiones">Conclusiones</label>
                    <textarea class="form-control" rows="5" id="conclusiones" placeholder="Conclusiones del artículo" name="conclusiones"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="agradecimientos">Agradecimientos</label>
                    <input type="text" class="form-control" id="agradecimientos" name="agradecimientos">
                  </div>
                  <div class="form-group">
                    <label for="referencias">Referencias</label>
                    <input type="text" class="form-control" id="referencias" name="referencias">
                  </div>
                  <input type="submit" class="btn btn-default" value="Guardar">
                </form>
             </div>
        </div>
     </div>



      
<?php include ('../layouts/footer.php'); ?>
