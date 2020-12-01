import React, { Component } from 'react';
import {FormGroup, Form, Input, Button, Alert} from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { Prompt } from 'react-router'
import { API_BASE_URL, FRONT_BASE_URL } from 'index';


const ModifyAccountEmp = props =>{
    
   const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
        if (!login ) {
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
    }

    const {id} = props.match.params;
    ax(id);
    return(
        <div class="content">
            <Prompt
            when={true}
            message="Te encuentras en proceso de edición                                                ¿Estás seguro de querer salir?"
          />
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center" className="title">Modificar Cuenta de Empleado</h2>
                            <div class="row justify-content-center">
                                <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                            </div>
                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>*Nombre de usuario:</label>
                                            <Input
                                                id="usernameModify"
                                                
                                                type="text"
                                            
                                            /> 
                                        </FormGroup>
                                        <FormGroup style={{display: "none"}}>
                                            <label>Nueva Contraseña:</label>
                                            <Input
                                                id="ogUsername"
                                                type="text"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Contraseña:</label>
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
                                        <Button className="btn-fill" color="success" onClick={guardar}>
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
    axios.get(API_BASE_URL+"account/"+idC)
          .then(function (resp){
           document.getElementById("usernameModify").value = resp.data[0].username;
           document.getElementById("valorId").value = idC;
           document.getElementById("ogUsername").value = resp.data[0].username;
           document.getElementById('spnCirc').style.display = 'none';
          } );
}

function guardar(){
    var user = document.getElementById("usernameModify").value;
    var passwrd = document.getElementById("passwordModify").value;
    var confPass = document.getElementById("confpassModify").value;
    var idCuenta = document.getElementById("valorId").value;
    var iguales = passwrd.localeCompare(confPass);
    if(passwrd.length < 8 && passwrd.length > 0){
        Swal.fire(
            'ERROR!',
            'La contraseña debe tener al menos 8 caracteres',
            'error'
        )
    }else if (user == ""){
        Swal.fire(
            'ERROR!',
            'Verifica que todos los campos obligatorios estén completos',
            'error'
        )
    }else if((passwrd!="" && iguales==0) || user.localeCompare(document.getElementById("ogUsername").value) != 0){
        if (passwrd.match(/[A-Z]/) == null){
                Swal.fire(
                    'ERROR!',
                    'La contraseña debe tener al menos una letra mayúscula',
                    'error'
                )
            }else{
                const cuentaEditar = {
                    username: user,
                    password: passwrd,
                }
                axios.put(API_BASE_URL+'account/'+idCuenta, cuentaEditar)
                      .then(function (resp){
                      } );
        
                 Swal.fire(
                  '¡Listo!',
                   'Cambios guardados',
                   'success'
                   ).then(function() {
                       this.props.history.push('/admin/Cuentas/PrincipalEmp');
                });
            }
        
    }else if(iguales != 0){
        Swal.fire(
            'ERROR!',
            'Las contraseñas no coinciden',
            'error'
        )
    }else if(passwrd == ""){
        Swal.fire(
            'Atención!',
            'No hay cambios que guardar',
            'info'
        )
    }
}

export default ModifyAccountEmp;