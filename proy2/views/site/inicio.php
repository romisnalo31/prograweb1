<?php 
  session_start();
  include ('../layouts/header.php');
?>

<body data-spy="scroll" data-target="#navbar" data-offset="0">
    <header id="header" role="banner">
        <div class="container">
            <div id="navbar" class="navbar navbar-default">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="index.html"></a>
                </div>
                <div class="collapse navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#main-slider"><i class="icon-home"></i></a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="#pricing">Pricing</a></li>
                        <li><a href="#about-us">About Us</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header><!--/#header-->

    <section id="main-slider" class="carousel">
        <div class="carousel-inner">
            <div class="item active">
                <div class="container">
                    <div class="carousel-content">
                        <h1>Revista Digital</h1>
                        <p class="lead">Examen de la materia de Programaci&oacute;n Web</p>
                    </div>
                </div>
            </div><!--/.item-->
            <div class="item">
                <div class="container">
                    <div class="carousel-content">
                        <h1>Proyecto 2</h1>
                        <p class="lead">Segundo proyecto de la materia</p>
                    </div>
                </div>
            </div><!--/.item-->
        </div><!--/.carousel-inner-->
        <a class="prev" href="#main-slider" data-slide="prev"><i class="icon-angle-left"></i></a>
        <a class="next" href="#main-slider" data-slide="next"><i class="icon-angle-right"></i></a>
    </section><!--/#main-slider-->

    <section id="portfolio">
        <div class="container">
            <div class="box">
                <div class="center gap">
                    <h2>Art&iacute;culos</h2>
                    <p class="lead">Ent&eacute;rate de las noticias m&aacute;s recientes.<br>Escoge el art&iacute;culo que m&aacute;s te guste.</p>
                </div><!--/.center-->
                <ul class="portfolio-filter">
                    <li><a class="btn btn-primary active" href="#" data-filter="*">All</a></li>
                    <li><a class="btn btn-primary" href="#" data-filter=".bootstrap">Bootstrap</a></li>
                    <li><a class="btn btn-primary" href="#" data-filter=".html">HTML</a></li>
                    <li><a class="btn btn-primary" href="#" data-filter=".wordpress">Wordpress</a></li>
                </ul><!--/#portfolio-filter-->
                <ul class="portfolio-items col-4">
                    <li class="portfolio-item apps">
                        <div class="item-inner">
                            <div class="portfolio-image">
                                <!--<img src="../images/portfolio/thumb/item1.jpg" alt="">-->
                                
									<a class="various fancybox.iframe" id="single_1" href="../images/portfolio/full/item1.jpg" title="Artículo #1">
										<img src="../images/portfolio/full/item1.jpg"/>
									</a>
                                    <!--<a class="preview btn btn-danger" title="Artículo #t" href="../images/portfolio/full/item1.jpg"><i class="icon-eye-open"></i></a>-->            
                                
                            </div>
                            <h5>Artículo #1</h5>
                        </div>
                    </li><!--/.portfolio-item-->
                    <li class="portfolio-item joomla bootstrap">
                        <div class="item-inner">
                            <div class="portfolio-image">
									<a class="various fancybox.iframe" id="single_1" href="../images/portfolio/full/item2.jpg" title="Artículo #2">
										<img src="../images/portfolio/full/item2.jpg"/>
									</a>
                            </div> 
                            <h5>Artículo #2</h5>         
                        </div>
                    </li><!--/.portfolio-item-->
                    <li class="portfolio-item bootstrap wordpress">
                        <div class="item-inner">
                            <div class="portfolio-image">
                                <a class="various fancybox.iframe" id="single_1" href="../images/portfolio/full/item3.jpg" title="Artículo #3">
										<img src="../images/portfolio/full/item3.jpg"/>
							    </a>
                            </div>
                            <h5>Artículo #3</h5>          
                        </div>           
                    </li><!--/.portfolio-item-->
                    <li class="portfolio-item joomla wordpress apps">
                        <div class="item-inner">
                            <div class="portfolio-image">
                                <a class="various fancybox.iframe" id="single_1" href="../images/portfolio/full/item4.jpg" title="Artículo #4">
										<img src="../images/portfolio/full/item4.jpg"/>
								</a> 
                            </div>
                            <h5>Artículo #4</h5>        
                        </div>           
                    </li><!--/.portfolio-item-->
                    <li class="portfolio-item joomla html">
                        <div class="item-inner">
                            <div class="portfolio-image">
                                <a class="various fancybox.iframe" id="single_1" href="../images/portfolio/full/item5.jpg" title="Artículo #5">
										<img src="../images/portfolio/full/item5.jpg"/>
								</a>  
                            </div>
                            <h5>Artículo #5</h5>  
                        </div>       
                    </li><!--/.portfolio-item-->
                    <li class="portfolio-item wordpress html">
                        <div class="item-inner">
                            <div class="portfolio-image">
                                <a class="various fancybox.iframe" id="single_1" href="../images/portfolio/full/item6.jpg" title="Artículo #6">
										<img src="../images/portfolio/full/item6.jpg"/>
								</a>  
                            </div>
                            <h5>Artículo #6</h5>         
                        </div>           
                    </li><!--/.portfolio-item-->
                    <li class="portfolio-item joomla html">
                        <div class="item-inner">
                            <a class="various fancybox.iframe" id="single_1" href="../images/portfolio/full/item5.jpg" title="Artículo #7">
										<img src="../images/portfolio/full/item5.jpg"/>
							</a>
                            <h5>Artículo #7</h5>  
                        </div>       
                    </li><!--/.portfolio-item-->
                    <li class="portfolio-item wordpress html">
                        <div class="item-inner">
                            <div class="portfolio-image">
                                <a class="various fancybox.iframe" id="single_1" href="../images/portfolio/full/item6.jpg" title="Artículo #8">
										<img src="../images/portfolio/full/item6.jpg"/>
								</a>  
                            </div>
                            <h5>Artículo #8</h5>        
                        </div>         
                    </li><!--/.portfolio-item-->
                </ul>   
            </div><!--/.box-->
        </div><!--/.container-->
    </section><!--/#portfolio-->

    <section id="contact">
        <div class="container">
            <div class="box last">
                <div class="row">
                    <div class="col-sm-6">
                        <h1>Contacto</h1>
                        <p>Estamos deseosos de escuchar tus sugerencias; por favor no dudes en dejarnos saber tus comentarios, gracias.</p>
                        <div class="status alert alert-success" style="display: none"></div>
                        <form id="formContacto" class="registerForm" name="formContacto" method="post" role="form">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" required="required" placeholder="Nombre" id="nombre" name="nombre">
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" required="required" placeholder="E-mail" id="email" name="email">
                                    </div>
                                </div>
                            </div>
							<div class="row">
								<div class="col-sm-6">
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
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="form-group">
                                        <textarea name="message" id="message" required="required" class="form-control" rows="8" placeholder="Message"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-danger btn-lg">Enviar Mensaje</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div><!--/.col-sm-6-->
                    <div class="col-sm-6">
                        <h1>Nuestra Direcci&oacute;n</h1>
                        <div class="row">
                            <div class="col-md-6">
                                <address>
                                    <strong>Twitter, Inc.</strong><br>
                                    795 Folsom Ave, Suite 600<br>
                                    San Francisco, CA 94107<br>
                                    <abbr title="Phone">P:</abbr> (123) 456-7890
                                </address>
                            </div>
                            <div class="col-md-6">
                                <address>
                                    <strong>Twitter, Inc.</strong><br>
                                    795 Folsom Ave, Suite 600<br>
                                    San Francisco, CA 94107<br>
                                    <abbr title="Phone">P:</abbr> (123) 456-7890
                                </address>
                            </div>
                        </div>
                        <h1>S&iacute;guenos</h1>
                        <div class="row">
                            <div class="col-md-6">
                                <ul class="social">
                                    <li><a href="#"><i class="icon-facebook icon-social"></i> Facebook</a></li>
                                    <li><a href="#"><i class="icon-google-plus icon-social"></i> Google Plus</a></li>
                                    <li><a href="#"><i class="icon-pinterest icon-social"></i> Pinterest</a></li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="social">
                                    <li><a href="#"><i class="icon-linkedin icon-social"></i> Linkedin</a></li>
                                    <li><a href="#"><i class="icon-twitter icon-social"></i> Twitter</a></li>
                                    <li><a href="#"><i class="icon-youtube icon-social"></i> Youtube</a></li>
                                </ul>
                            </div>
                        </div>
                    </div><!--/.col-sm-6-->
                </div><!--/.row-->
            </div><!--/.box-->
        </div><!--/.container-->
    </section><!--/#contact-->
	
<?php include ('../layouts/footer.php'); ?>