import React from "react";
import { Link } from "react-router-dom";
import { Prompt } from 'react-router'
import {FormGroup, Form, Input} from "react-bootstrap";
import {Alert, Button} from "reactstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

class CreateAccEmp extends React.Component{

    crearSelect(){
        var sel='<option value="-1" disabled selected>Selecciona una opción</option>';
        const num=1;
        axios.get(API_BASE_URL+"account/")
          .then(function (resp){
            console.log(resp.data);
            //Ciclo for para obtener cada uno de los elementos
            resp.data.forEach(element => {
              sel = sel.concat('<option value="' + element.id + '"> ' + element.nombreCompleto + '</option> ');
            });
            //sel = sel.concat('</Form.Control> </FormGroup>');
            //insertar el select en el html
           document.getElementById("selectEmpleado").innerHTML = sel;
           document.getElementById('spnCirc').style.display = 'none';
          } );
      }


    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onSubmit = this.onSubmit.bind(this);
    
        
    }
    


    onSubmit(e) {
        e.preventDefault()
        var x = document.getElementById("passwd").value;
        var y = document.getElementById("username").value;
        var z = document.getElementById("selectEmpleado").value; 
        var w = document.getElementById("confPasswd").value;
        var v = document.getElementById("selectRol").value;
        var iguales = x.localeCompare(w);


        if(x.length < 8 && x.length > 0){
            Swal.fire(
                'ERROR!',
                'La contraseña debe tener al menos 8 caracteres',
                'error'
            )
        }else if (y==""){
            Swal.fire(
                'ERROR!',
                'Verifica que todos los campos obligatorios estén completos',
                'error'
            )
        }else if(iguales==0 && parseInt(z) > 0 && y!="" && x!=""){
            if (x.match(/[A-Z]/) == null){
                Swal.fire(
                    'ERROR!',
                    'La contraseña debe tener al menos una letra mayúscula',
                    'error'
                )
            }else{
                const cuenta = {
                    user: y,
                    pass: x,
                    idEmp: z,
                    rol: v,
                  };
                  axios.post(API_BASE_URL+'account/', cuenta)
                    .then(function (resp){
                      if(resp.data==1){
                          setTimeout(function(){
                              Swal.fire(
                                  '¡Listo!',
                                  'Datos guardados',
                                  'success'
                                  ).then(function() {
                                      this.props.history.push("admin/Cuentas/CrearCuentaEmp");
                                  });
                          },(1000));
                      }else{
                          Swal.fire(
                              'ERROR!',
                              'Hubo un error al tratar de crear la cuenta, intentalo con un Nombre de Usuario distinto',
                              'error'
                          )
                      }
                    });          
            }
        }else if(iguales != 0){
            Swal.fire(
                'ERROR!',
                'Las contraseñas no coinciden',
                'error'
            )
        }else{
            Swal.fire(
                'ERROR!',
                'Verifica que todos los campos obligatorios estén completos',
                'error'
            )
        }
  }



    render(){
        const login = localStorage.getItem("isLoggedIn");;
        const idRol = localStorage.getItem("idRol");
        // Redirect in case of wrong role or no login
            if (!login ) {
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
    }
        this.crearSelect();
        return(
            <div class="content">
                <Prompt
            when={true}
            message="Te encuentras en proceso de registro                                                ¿Estás seguro de querer salir?"
          />
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center" className="title">Registrar Cuenta</h2>
                            <div class="row justify-content-center">
                                <Alert color="primary">Todos los datos son obligatorios.</Alert>
                            </div>
                            <Form onSubmit={this.onSubmit}>
                                <div class="row justify-content-center">
                                    <div class="col-4" >  
                                    <FormGroup> 
                                        <label>*Seleccione un Empleado:</label> 
                                            <Form.Control as="select" id="selectEmpleado"> 
                                            
                                            </Form.Control> 
                                    </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>*Nombre de usuario:</label>
                                            <Form.Control type="text" placeholder="juanP1" 
                                            id="username"
                                            />
                                            
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>*Contraseña:</label>
                                            <Form.Control type="password"  
                                                id="passwd"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>*Confirmar contraseña:</label>
                                            <Form.Control type="password"  id="confPasswd"/>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>*Seleccione un Rol:</label>
                                            <Form.Control as="select" id="selectRol">
                                                <option value="1">General</option>
                                                <option value="2">Enfermero</option>
                                                <option value="3">Administrador</option>
                                            </Form.Control>   
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-1">
                                        <div class="spinner-border" role="status" id="spnCirc" align="center">
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                <div class="row justify-content-center">
                                    <div class="col-4" align="center">
                                    <Link to="/admin/Cuentas/PrincipalEmp">
                                            <Button className="btn-fill" color="primary" >
                                                Regresar
                                            </Button>
                                    </Link>
                                    </div>
                                    <div class="col-4" align="center">
                                        <Button className="btn-fill" color="success" type="submit">
                                            Registrar
                                        </Button>
                                    </div>
                                </div>
                                
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default CreateAccEmp;