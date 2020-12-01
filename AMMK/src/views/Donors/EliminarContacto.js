import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Progress, Alert, Col, Card, CardBody, CardHeader } from "reactstrap";
import Swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

const EliminarContacto = props =>{
    const {id} = props.match.params;
    ax(id);
    return(
        <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 >Eliminar Contacto Donante</h2>
                            <Card>
          <CardHeader>
          <h3 align="center" className="title">ATENCIÓN: ESTA ES UNA ACCIÓN PERMANENTE </h3>
          </CardHeader>
          <CardBody>
                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                        <label className="font-weight-bold">* NOMBRE: </label>
                                        <Input
                                                id="nombre"
                                                
                                                type="text"
                                            />    
                                 </FormGroup>
                                    </div>
                                
                                    <div class="col-4">
                                        <FormGroup>
                                        <label className="font-weight-bold">* CARGO: </label>
                                        <Input
                                                id="cargo"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                       
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                
                                    <div class="col-4">
                                        <FormGroup id="monto">
                                        <label id="monto" className="font-weight-bold"><FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;FECHA DE CUMPLEAÑOS: </label>
                                        <Input
                                                id="fecha"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                               
                                    <div class="col-4">
                                        <FormGroup>
                                        <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'envelope']} />&nbsp;CORREO: </label>
                                        <Input
                                                id="correo"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                        <label className="font-weight-bold"><FontAwesomeIcon icon={['fas', 'phone-alt']} />&nbsp;TELÉFONO: </label>
                                        <Input
                                                id="tel"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                                
                                    <div class="col-4">
                                        <FormGroup>
                                        <label className="font-weight-bold">*&nbsp;<FontAwesomeIcon icon={['fas', 'mobile-alt']} />&nbsp;CELULAR: </label>
                                        <Input
                                                id="cel"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4" align="center">
                                    <Link to={`/admin/ViewSpecificDonor/${localStorage.getItem("idD")}`}>
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
                            </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
    )
}

function ax(idC){
    axios.get(API_BASE_URL+"donorContacts/delete/"+idC)
          .then(function (resp){
            console.log(resp.data);
           document.getElementById("nombre").value = resp.data[0].nombreCompleto;
           document.getElementById("cargo").value = resp.data[0].cargo;
           document.getElementById("fecha").value = resp.data[0].fechaCumpleaño;
           document.getElementById("correo").value = resp.data[0].correo1;
           document.getElementById("tel").value = resp.data[0].telefono1;
           document.getElementById("cel").value = resp.data[0].celular1;

           document.getElementById("valorId").value = idC;
          } );
}

function eliminar(){
    var idD = document.getElementById("valorId").value;
    console.log(idD);
        axios.delete(API_BASE_URL+'contactoDonante/'+idD)
              .then(function (resp){
                console.log(resp.data);
              } );
         Swal.fire(
          '¡Listo!',
           'Se ha eliminado la donación!',
           'success'
           ).then(function() {
               this.props.history.push("admin/ViewSpecificDonor"+localStorage.getItem("idD"));
        });
}

export default EliminarContacto;