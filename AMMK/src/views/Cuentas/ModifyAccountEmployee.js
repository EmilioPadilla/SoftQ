import React, { Component } from 'react';
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';


const ModifyAccountEmp = props =>{
    const {id} = props.match.params;
    ax(id);
    return(
        <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Modificar Cuenta de Empleado</h2>
                            <Form /*onSubmit={this.onSubmit}*/>
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
                                        <Button className="btn-fill" color="primary" type="submit">
                                            Guardar cambios
                                        </Button>
                                    </div>
                                </div>
                                
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
    )
}

function ax(idC){
    console.log(idC);
    axios.get("http://localhost:8000/api/account/"+idC)
          .then(function (resp){
            console.log(resp.data);
           document.getElementById("usernameModify").value = resp.data[0].username;
           document.getElementById("passwordModify").value = resp.data[0].password;
           document.getElementById("confpassModify").value = resp.data[0].password;
          } );
}

export default ModifyAccountEmp;