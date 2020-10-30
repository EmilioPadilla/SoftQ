import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';


const DeleteAccountEmp = props =>{
    const {id} = props.match.params;
    ax(id);
    return(
        <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Eliminar Cuenta de Empleado</h2>
                            <h4 align="center">ATENCIÓN: ELIMINAR UNA CUENTA ES UNA ACCIÓN PERMANENTE</h4>
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
                                <br/>
                                <div class="row justify-content-center">
                                    <div class="col-4" align="center">
                                    <Link to="/admin/Cuentas/PrincipalEmp">
                                            <Button className="btn-fill" color="primary" /*onClick={guardar}*/>
                                                Regresar
                                            </Button>
                                        </Link>
                                    </div>
                                    <div class="col-4" align="center">
                                            <Button className="btn-fill" color="danger" onClick={eliminar}>
                                                Eliminar
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
            console.log(resp.data);
           document.getElementById("usernameModify").value = resp.data[0].username;
           document.getElementById("passwordModify").value = resp.data[0].password;
           document.getElementById("confpassModify").value = resp.data[0].password;
           document.getElementById("valorId").value = idC;
          } );
}

function eliminar(){
    var idCuenta = document.getElementById("valorId").value;
        axios.delete('http://localhost:8000/api/account/'+idCuenta)
              .then(function (resp){
                console.log(resp.data);
              } );
         Swal.fire(
          '¡Listo!',
           'Se eliminó la cuenta',
           'success'
           ).then(function() {
               window.location = "http://localhost:3000/admin/Cuentas/PrincipalEmp";
        });
}

export default DeleteAccountEmp;