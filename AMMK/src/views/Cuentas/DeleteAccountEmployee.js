import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {FormGroup, Form, Input, Button, Alert, Modal, ModalBody, ModalFooter} from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

var open = false;

const DeleteAccountEmp = props =>{
    
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
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center" className="title">Eliminar Cuenta de Empleado</h2>
                            <div class="row justify-content-center">
                                <Alert color="danger">ATENCIÓN: ELIMINAR UNA CUENTA ES UNA ACCIÓN PERMANENTE</Alert>
                            </div>
                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                            <label>Nombre de usuario:</label>
                                            <Input
                                                id="usernameModify"
                                                disabled
                                                type="text"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Nombre completo:</label>
                                            <Input
                                                id="nombreModify"
                                                disabled
                                                type="text"
                                            
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                            <label>Rol:</label>
                                            <Input
                                                disabled
                                                id="rolModify"
                                                type="text"
                                            
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
                            <div align="center"  >
                                <Modal id="modalAcc" isOpen={false} >
                                    <ModalBody>
                                       ¿Estás segur@ que deseas eliminar la cuenta?
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button color="primary"onClick={()=>hideModal()}>No</Button>
                                      <Button color="danger" onClick={()=>eliminar()}>Sí</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}



function ax(idC){
    axios.get(API_BASE_URL+"account/delete/information/"+idC)
          .then(function (resp){
            console.log(resp.data);
           document.getElementById("usernameModify").value = resp.data[0].username;
           document.getElementById("nombreModify").value = resp.data[0].nombreCompleto;
           document.getElementById("rolModify").value = resp.data[0].nombreRol;
           document.getElementById("valorId").value = idC;
           document.getElementById('spnCirc').style.display = 'none';
          } );
}

function displayModal(){
    console.log(open);
    open = true;
    
}

function hideModal(){
    open = false;
    
}

function eliminar(){
    var idCuenta = document.getElementById("valorId").value;
        axios.delete(API_BASE_URL+'account/'+idCuenta)
              .then(function (resp){
                console.log(resp.data);
              } );
         Swal.fire(
          '¡Listo!',
           'Se eliminó la cuenta',
           'success'
           ).then(function() {
               this.props.history.push("admin/Cuentas/PrincipalEmp");
        });
}

export default DeleteAccountEmp;