$(document).ready(function() {
			$("#single_1").fancybox({
          		helpers: {
              		title : {
                  		type : 'float'
              		}
          		}	
      	 });
		 
		 $('#radioJugador').click(function()
						{
							$('#formJugador').show('slow');
							$('#formEntrenador').hide('slow'); 
						}
					);
					$('#radioEntrenador').click(function()
						{
							$('#formJugador').hide('slow');
							$('#formEntrenador').show('slow');
						}
					);
	  
	  	 $('#formEjemplo').bootstrapValidator({
        		message: 'This value is not valid',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					username: {
						message: 'The username is not valid',
						validators: {
							notEmpty: {
								message: 'The username is required and cannot be empty'
							},
							stringLength: {
								min: 6,
								max: 30,
								message: 'The username must be more than 6 and less than 30 characters long'
							},
							regexp: {
								regexp: /^[a-zA-Z0-9_]+$/,
								message: 'The username can only consist of alphabetical, number and underscore'
							}
						}
					},
					email: {
						validators: {
							notEmpty: {
								message: 'The email is required and cannot be empty'
							},
							emailAddress: {
								message: 'The input is not a valid email address'
							}
						}
					}
				}
			});
			
			$('#formContinente').bootstrapValidator({
        		message: 'This value is not valid',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					nombre: {
						message: 'El nombre no es válido.',
						validators: {
							notEmpty: {
								message: 'Debe llenar el campo Nombre.'
							},
							stringLength: {
								min: 1,
								max: 45,
								message: 'El nombre debe tener como mínimo 1 carácter y 45 máximo.'
							},
							regexp: {
								regexp: /^[a-zA-Z ]+$/,
								message: 'Solo se aceptan letras.'
							}
						}
					}
				}
			});
			
			$('#formPais').bootstrapValidator({
        		message: 'This value is not valid',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					nombre: {
						message: 'El nombre no es válido',
						validators: {
							notEmpty: {
								message: 'El campo Nombre es obligatorio'
							},
							stringLength: {
								min: 1,
								max: 100,
								message: 'El nombre debe tener como mínimo 1 carácter y 100 máximo.'
							},
							regexp: {
								regexp: /^[a-zA-Z ]+$/,
								message: 'Solo se aceptan letras'
							}
						}
					},
					idcontinente: {
						validators: {
							notEmpty: {
								message: 'El campo Continente es obligatorio.'
							}
						}
					}
				}
			});
			
			$('#formEstadio').bootstrapValidator({
        		message: 'This value is not valid',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					Nombre: {
						message: 'El nombre no es válido.',
						validators: {
							notEmpty: {
								message: 'Debe llenar el campo Nombre.'
							},
							stringLength: {
								min: 1,
								max: 45,
								message: 'El nombre debe tener como mínimo 1 carácter y 45 máximo.'
							},
							regexp: {
								regexp: /^[a-zA-Z ]+$/,
								message: 'Solo se aceptan letras.'
							}
						}
					}
				}
			});
			
			$('#formPosicion').bootstrapValidator({
        		message: 'This value is not valid',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					nombre: {
						message: 'El nombre no es válido',
						validators: {
							notEmpty: {
								message: 'El campo Nombre es obligatorio'
							},
							stringLength: {
								min: 1,
								max: 50,
								message: 'El nombre debe tener como mínimo 1 carácter y 50 máximo.'
							},
							regexp: {
								regexp: /^[a-zA-Z ]+$/,
								message: 'Solo se aceptan letras'
							}
						}
					},
					abreviatura: {
						message: 'La abreviatura no es válida',
						validators: {
							notEmpty: {
								message: 'El campo Abreviatura es obligatorio'
							},
							stringLength: {
								min: 1,
								max: 45,
								message: 'La abreviatura debe tener como mínimo 1 carácter y 45 máximo.'
							},
							regexp: {
								regexp: /^[a-zA-Z0-9 ]+$/,
								message: 'Solo se aceptan letras y números'
							}
						}
					}
				}
			});
			
			/*$('#formIntegrante').bootstrapValidator({
        		message: 'This value is not valid',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					nombre: {
						message: 'El nombre no es válido',
						validators: {
							notEmpty: {
								message: 'El campo Nombre es obligatorio'
							},
							stringLength: {
								min: 1,
								max: 45,
								message: 'El nombre debe tener como mínimo 1 carácter y 45 máximo.'
							},
							regexp: {
								regexp: /^[a-zA-Z ]+$/,
								message: 'Solo se aceptan letras'
							}
						}
					},
					apellido: {
						message: 'El apellido no es válida',
						validators: {
							notEmpty: {
								message: 'El campo Apellido es obligatorio'
							},
							stringLength: {
								min: 1,
								max: 100,
								message: 'El apellido debe tener como mínimo 1 carácter y 100 máximo.'
							},
							regexp: {
								regexp: /^[a-zA-Z ]+$/,
								message: 'Solo se aceptan letras'
							}
						}
					},
					peso: {
						validators: {
							notEmpty: {
								message: 'Debe llenarse el campo Peso'
							},
							regexp: {
								regexp: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/,
								message: 'Solo números'
							}
						}
					},
					estatura: {
						validators: {
							notEmpty: {
								message: 'Debe llenarse el campo Estatura'
							},
							regexp: {
								regexp: /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/,
								message: 'Solo números'
							}

						}
					},
					edad: {
						validators: {
							notEmpty: {
								message: 'Debe llenarse el campo Edad'
							},
							numeric: {
								message: 'La edad no es válido'
							}
						}
					},
					idequipo: {
						validators: {
							notEmpty: {
								message: 'Debe llenarse el campo Equipo'
							}
						}
					},
					numero: {
						validators: {
							notEmpty: {
								message: 'Debe llenarse el campo Número'
							},
							numeric: {
								message: 'El número no es válido'
							}
						}
					},
					idposicion: {
						validators: {
							notEmpty: {
								message: 'Debe llenarse el campo Posción'
							}
						}
					},
					idpais: {
						validators: {
							notEmpty: {
								message: 'Debe llenarse el campo País'
							}
						}
					}
				}
			});*/
			
			$('#formEquipo').bootstrapValidator({
        		message: 'This value is not valid',
				feedbackIcons: {
					valid: 'glyphicon glyphicon-ok',
					invalid: 'glyphicon glyphicon-remove',
					validating: 'glyphicon glyphicon-refresh'
				},
				fields: {
					nombre: {
						message: 'El nombre no es válido',
						validators: {
							notEmpty: {
								message: 'El campo Nombre es obligatorio'
							},
							stringLength: {
								min: 1,
								max: 45,
								message: 'El nombre debe tener como mínimo 1 carácter y 45 máximo.'
							},
							regexp: {
								regexp: /^[a-zA-Z ]+$/,
								message: 'Solo se aceptan letras'
							}
						}
					},
					idpais: {
						message: 'La abreviatura no es válida',
						validators: {
							notEmpty: {
								message: 'El campo País es obligatorio'
							}
						}
					}
				}
			});
			
			$('#datetimepicker10').datetimepicker({
                icons: {
                    time: "fa fa-clock-o",
                    date: "fa fa-calendar",
                    up: "fa fa-arrow-up",
                    down: "fa fa-arrow-down"
                }
            });
		});