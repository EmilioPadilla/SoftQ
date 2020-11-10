import React, { Component } from 'react';
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";


const ModifyAccountEmp = props =>{
    
   /* const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }*/

    const {id} = props.match.params;
    ax(id);
    return(
        <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Modificar Cuenta de Empleado</h2>
                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Nombre de usuario:</label>
                                            <Input
                                                id="usernameModify"
                                                
                                                type="text"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Nueva Contraseña:</label>
                                            <Input
                                                id="passwordModify"
                                                
                                                type="password"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Confirmar contraseña:</label>
                                            <Input
                                                id="confpassModify"
                                                type="password"
                                            
                                            /> 
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
                                        <Button className="btn-fill" color="primary" onClick={guardar}>
                                            Guardar cambios
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                            <div>
                                <Input type="text" id="valorId" style={{display: "none"}}>

                                </Input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

function ax(idC){
    axios.get("http://localhost:8000/api/account/"+idC)
          .then(function (resp){
           document.getElementById("usernameModify").value = resp.data[0].username;
           document.getElementById("valorId").value = idC;
          } );
}

function guardar(){
    var user = document.getElementById("usernameModify").value;
    var passwrd = document.getElementById("passwordModify").value;
    var confPass = document.getElementById("confpassModify").value;
    var idCuenta = document.getElementById("valorId").value;
    var iguales = passwrd.localeCompare(confPass);
    if(user!="" && iguales==0){
        const cuentaEditar = {
            username: user,
            password: passwrd,
        }
        axios.put('http://localhost:8000/api/account/'+idCuenta, cuentaEditar)
              .then(function (resp){
              } );

         Swal.fire(
          '¡Listo!',
           'Cambios guardados',
           'success'
           ).then(function() {
               window.location = "http://localhost:3000/admin/Cuentas/PrincipalEmp";
        });
    }else{
        Swal.fire(
            '¡Error!',
             'Las contraseñas no coinciden o alguno de los campos está vacío',
             'error'
             )
    }
}

export default ModifyAccountEmp;