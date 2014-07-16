<?php 
  session_start();
  include ('../layouts/header.php');
?>


      <div class="jumbotron">
        <h1>Proyecto 1</h1>
        <p><a href="#" class="btn btn-primary btn-lg" role="button">Learn more &raquo;</a></p>
      </div>

<div align="center">
			<img width="960" height="556" src="../images/logoMundial2014.png" />
		</div>

      <div class="page-header">
        <h1>Pruebas</h1>
      </div>
<div class="container">
<div class="col-sm-6">

      <a class="various fancybox.iframe" id="single_1" href="../images/singapour.jpg" title="Singapore from the air (Andrew Tan 2011)">
	<img src="../images/singapour.jpg" alt="" width="40%" height="40%"/>
    </a>
  </div>  
    
<div class="col-sm-6">
<form class="registerForm" id="formEjemplo">
    <div class="form-group">
        <label>Username</label>
        <input type="text" class="form-control" name="username" />
    </div>
    <div class="form-group">
        <label>Email address</label>
        <input type="text" class="form-control" name="email" />
    </div>
</form>
</div>
    <div class="col-sm-6" style="height:130px;">
        <div class="form-group">
            <div class='input-group date' id='datetimepicker10'>
                <input type='text' class="form-control" />
                <span class="input-group-addon"><span class="fa fa-calendar">
                      </span>
                </span>
            </div>
        </div>
    </div>
</div>



      
<?php include ('../layouts/footer.php'); ?>
