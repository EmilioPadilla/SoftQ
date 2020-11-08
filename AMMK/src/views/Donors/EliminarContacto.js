import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
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
                            <h2 align="center">Eliminar Contacto Donante</h2>
                            <h4 align="center">ATENCIÓN: ESTA ES UNA ACCIÓN PERMANENTE</h4>

                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                        <p className="font-weight-bold">NOMBRE: </p>
                                        <Input
                                                id="nombre"
                                                
                                                type="text"
                                            />    
                                 </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                        <p className="font-weight-bold">CARGO: </p>
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
                                        <p id="monto" className="font-weight-bold">FECHA DE CUMPLEAÑOS: </p>
                                        <Input
                                                id="fecha"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                        <p className="font-weight-bold">CORREO: </p>
                                        <Input
                                                id="correo"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                        <p className="font-weight-bold">TELEFONO: </p>
                                        <Input
                                                id="tel"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                        <p className="font-weight-bold">CELULAR: </p>
                                        <Input
                                                id="cel"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <br/>
                                <div class="row justify-content-center">
                                    <div class="col-4" align="center">
                                    <Link to="/admin/ViewDonors">
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
                        </div>
                    </div>
                </div>
            </div>
    )
}

function ax(idC){
    axios.get("http://localhost:8000/api/donorContacts/delete/"+idC)
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
        axios.delete('http://localhost:8000/api/contactoDonante/'+idD)
              .then(function (resp){
                console.log(resp.data);
              } );
         Swal.fire(
          '¡Listo!',
           'Se ha eliminado la donación!',
           'success'
           ).then(function() {
               window.location = "http://localhost:3000/admin/ViewDonors";
        });
}

export default EliminarContacto;