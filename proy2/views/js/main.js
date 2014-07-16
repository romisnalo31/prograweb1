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
	  
	  	 $('#formContacto').bootstrapValidator({
        		message: 'Este valor no es válido.',
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
								message: 'El nombre no puede estar vacío.'
							},
							stringLength: {
								max: 50,
								message: 'El nombre solo puede contener 50 caracteres.'
							},
							regexp: {
								regexp: /^[A-Za-záéíóúñ]{2,}([\s][A-Za-záéíóúñ]{2,})*+$/,
								message: 'El nombre solo puede tener letras.'
							}
						}
					},
					email: {
						validators: {
							notEmpty: {
								message: 'El e-mail es un campo obligatorio.'
							},
							emailAddress: {
								message: 'El e-mail no es válido.'
							}
						}
					},
					message: {
						validators: {
							notEmpty: {
								message: 'Escriba un mensaje.'
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