import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {FormGroup, Form, Input, Button} from "reactstrap"
import axios from 'axios';
import { Progress, Alert, Col, Card, CardBody, CardHeader } from "reactstrap";
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

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
                            <h2>Eliminar Donación</h2>
                            <Card>
          <CardHeader>
          <h3 align="center" className="title">ATENCIÓN: ESTA ES UNA ACCIÓN PERMANENTE </h3>
          </CardHeader>
          <CardBody>
                            <Form>
                                <div class="row justify-content-center">
                                    <div class="col-4" >
                                        <FormGroup>
                                        <label className="font-weight-bold">FECHA EN QUE SE REALIZÓ: </label>
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
                                        <label className="font-weight-bold">TIPO DONACIÓN: </label>
                                        <Input
                                                id="tipo"
                                                
                                                type="text"
                                            /> 
                                        </FormGroup>
                                       
                                    </div>
                                </div>
                                <div class="row justify-content-center">
                                
                                    <div class="col-4">
                                        <FormGroup>
                                        <label className="font-weight-bold">MONTO: </label>
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
                                        <label className="font-weight-bold">DESCRIPCIÓN: </label>
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
    axios.get( API_BASE_URL+"donaciones/"+idC)
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
        axios.delete( API_BASE_URL+"donaciones/"+idD)
              .then(function (resp){
                console.log(resp.data);
              } );
         Swal.fire(
          '¡Listo!',
           'Se ha eliminado la donación!',
           'success'
           ).then(function() {
               this.props.history.push("/admin/ViewSpecificDonor"+localStorage.getItem("idD"));
        });
}

export default EliminarDonacion;