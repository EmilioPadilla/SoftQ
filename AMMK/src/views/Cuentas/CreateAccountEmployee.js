import React from "react";
import { Link } from "react-router-dom";
import {FormGroup, Form, Input, Button} from "react-bootstrap"
import axios from 'axios';
import Swal from 'sweetalert2';

class CreateAccEmp extends React.Component{

    crearSelect(){
        var sel='<option value="-1" disabled selected>Selecciona una opción</option>';
        const num=1;
        axios.get("http://localhost:8000/api/account/")
          .then(function (resp){
            console.log(resp.data);
            //Ciclo for para obtener cada uno de los elementos
            resp.data.forEach(element => {
              sel = sel.concat('<option value="' + element.id + '"> ' + element.nombreCompleto + '</option> ');
            });
            //sel = sel.concat('</Form.Control> </FormGroup>');
            //insertar el select en el html
           document.getElementById("selectEmpleado").innerHTML = sel;
          } );
      }


    constructor(props) {
        super(props)
    
        // Setting up functions
        this.onSubmit = this.onSubmit.bind(this);
    
        
    }
    


    onSubmit(e) {
        e.preventDefault()
        var idCuenta = 0;
        var x = document.getElementById("passwd").value;
        var y = document.getElementById("username").value;
        var z = document.getElementById("selectEmpleado").value; 
        var w = document.getElementById("confPasswd").value;
        var v = document.getElementById("selectRol").value;
        var iguales = x.localeCompare(w);
 
        if(iguales==0 && parseInt(z) > 0 && y!="" && x!=""){
         const cuenta = {
          user: y,
          pass: x,
          idEmp: z,
          rol: v,
        };
        axios.post('http://localhost:8000/api/account/', cuenta)
          .then(function (resp){
            if(resp.data==1){
                setTimeout(function(){
                    Swal.fire(
                        '¡Listo!',
                        'Datos guardados',
                        'success'
                        ).then(function() {
                            window.location = "http://localhost:3000/admin/Cuentas/CrearCuentaEmp";
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
       
        
        
        }else{
            Swal.fire(
                'ERROR!',
                'Las contraseñas no coinciden o no has llenado algun valor',
                'error'
            )
        }
  }



    render(){
        const login = localStorage.getItem("isLoggedIn");
        if (!login) {
            window.location = "http://localhost:3000/login";
        }
        this.crearSelect();
        return(
            <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Registrar Cuenta</h2>
                            <Form onSubmit={this.onSubmit}>
                                <div class="row justify-content-center">
                                    <div class="col-4" >  
                                    <FormGroup> 
                                        <label>Seleccione un Empleado:</label> 
                                            <Form.Control as="select" id="selectEmpleado"> 
                                            
                                            </Form.Control> 
                                    </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Nombre de usuario:</label>
                                            <Form.Control type="text" placeholder="juanP1" 
                                            id="username"
                                            />
                                            
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Contraseña:</label>
                                            <Form.Control type="password"  
                                                id="passwd"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Confirmar contraseña:</label>
                                            <Form.Control type="password"  id="confPasswd"/>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Seleccione un Rol:</label>
                                            <Form.Control as="select" id="selectRol">
                                                <option value="1">General</option>
                                                <option value="2">Enfermero</option>
                                                <option value="3">Administrador</option>
                                            </Form.Control>   
                                        </FormGroup>
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
                                        <Button className="btn-fill" color="info" type="submit">
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