import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
import Swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

const EliminarDonacion = props =>{
    const {id} = props.match.params;
    ax(id);
    return(
        <div class="content">
                <div class="container">
                    <div class="row">
                        <div class="col-12" >
                            <h2 align="center">Eliminar Donación</h2>
                            <h4 align="center">ATENCIÓN: ESTA ES UNA ACCIÓN PERMANENTE</h4>

                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                        <p className="font-weight-bold">FECHA EN QUE SE REALIZÓ: </p>
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
                                        <p className="font-weight-bold">TIPO DONACIÓN: </p>
                                        <Input
                                                id="tipo"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                       
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                
                                    <div class="col-4">
                                        <FormGroup id="monto">
                                        <p id="monto" className="font-weight-bold">MONTO: </p>
                                        <Input
                                                id="monto"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-4">
                                        <FormGroup>
                                        <p className="font-weight-bold">DESCRIPCIÓN: </p>
                                        <Input
                                                id="descripcion"
                                                
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
    axios.get("http://localhost:8000/api/donations/delete/"+idC)
          .then(function (resp){
            console.log(resp.data);
           //document.getElementById("tipo").value = resp.data[0].idTipoDonacion;
           document.getElementById("fecha").value = resp.data[0].fechaDonacion;
           document.getElementById("descripcion").value = resp.data[0].descripcion;
           document.getElementById("monto").value = resp.data[0].monto;
           document.getElementById("valorId").value = idC;
          } );
}

function eliminar(){
    var idD = document.getElementById("valorId").value;
    console.log(idD);
        axios.delete('http://localhost:8000/api/donations/delete/'+idD)

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

export default EliminarDonacion;