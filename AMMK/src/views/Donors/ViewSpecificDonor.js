import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ViewDonations from 'views/Donors/ViewDonations'

// reactstrap components
import { DropdownItem, Input, Row, Table, Col, Alert, Button, Badge } from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ResponsiveEmbed } from 'react-bootstrap';

import axios from 'axios';
import Swal from 'sweetalert2';

library.add(fas)

const ViewSpecificDonor = props =>{

    const {id}= props.match.params;
    ax(id);

    return(
<div className="content">
                <h1 className="title">DETALLE DONANTE</h1>
                
                <Row>
                   
                    <Col>
                        <h3 className="title" id="nombreDonante"></h3>
                        

                        <Badge color="primary">DATOS GENERALES</Badge>
                        <Col >
                        <br></br>

                        <Button  className="float-right" size="sm" id="editar"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                        <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
                        </Col >
                            <Col >
                                <p className="font-weight-bold">FECHA DE CUMPLEAÑOS: </p>
                                <p id="fechaCumple"></p>
                                
                                                                      </Col>
                            <Col >
                                <p className="font-weight-bold" >RFC:</p>
                                <p id="RFC1"></p>

                            </Col>
                           
                            <Col >
                                <p className="font-weight-bold" >TELEFONO:</p>
                                <p id="tel"></p>

                            </Col>
                            <Col >
                                <p className="font-weight-bold">CELULAR:</p>
                                <p id="cel"></p>

                            </Col>
                            <Col >
                                <p className="font-weight-bold">CORREO:</p>
                                <p id="correo1"></p>

                            </Col>
                            <br></br>

                        
                            <Badge color="primary">DATOS DE FACTURACIÓN</Badge>
                        <Col >
                        <br></br>

                        <Button  className="float-right" size="sm" id="editar"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                        <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
                        </Col >
                            <Col >
                                <p className="font-weight-bold">RAZÓN SOCIAL:</p>
                                <p id="razonSocial"></p>

                            </Col>
                            <Col >
                                <p className="font-weight-bold">RFC:</p>
                                <p id="RFC2"></p>

                            </Col>

                        
                            <Col >
                            <p className="font-weight-bold">CALLE:</p>
                            <p id="calle"></p>

                            </Col>
                            <Col >
                            <p className="font-weight-bold"># Interior:</p>
                            <p id="interior"></p>

                            </Col>
                            <Col >
                            <p className="font-weight-bold"># Exterior:</p>
                            <p id="exterior"></p>

                            </Col>
                            <Col >
                            <p className="font-weight-bold">C.P. :</p>
                            <p id="cp"></p>

                            </Col>
                            <Col >
                            <p className="font-weight-bold">COLONIA:</p>
                            <p id="colonia"></p>
                            </Col>
                           
                            <Col >
                            <p className="font-weight-bold">CIUDAD:</p>
                            <p id="ciudad"></p>

                            </Col>
                            <Col >
                            <p className="font-weight-bold">MUNICIPIO:</p>
                            <p id="municipio"></p>

                            </Col>
                            <Col >
                            <p className="font-weight-bold">ESTADO:</p>
                            <p id="estado"></p>

                            </Col>
                            <Col >
                            <p className="font-weight-bold">PAÍS:</p>
                            <p id="pais"></p>

                            </Col>
                            <Col >
                            <p className="font-weight-bold">CORREO:</p>
                            <p id="correo"></p>

                            </Col>
                            <ViewDonations/> 
                        
                    </Col>
                </Row>
                
          <br></br>
                
        
                <div>
                                <Input type="text" id="valorId" style={{display: "none"}}>

                                </Input>
                            </div>
            </div>

    )

}


function ax(idD){
    axios.get("http://localhost:8000/api/donantes/"+idD)
    .then(function (resp){
      console.log(resp.data);
     document.getElementById("nombreDonante").innerHTML = resp.data[0].nombreCompleto1;
     document.getElementById("fechaCumple").innerHTML = resp.data[0].fechaCumpleaños1;
     document.getElementById("RFC1").innerHTML = resp.data[0].RFC1;
     document.getElementById("correo1").innerHTML = resp.data[0].correo1;
     document.getElementById("tel").innerHTML = resp.data[0].telefono1;
     document.getElementById("cel").innerHTML = resp.data[0].celular1;
     document.getElementById("razonSocial").innerHTML= resp.data[0].RazonSocial;
     document.getElementById("RFC2").innerHTML = resp.data[0].RFC;
     document.getElementById("calle").innerHTML = resp.data[0].calle;
     document.getElementById("interior").innerHTML = resp.data[0].noInterior;
     document.getElementById("exterior").innerHTML = resp.data[0].noExterior;
     document.getElementById("cp").innerHTML = resp.data[0].codigoPostal;
     document.getElementById("colonia").innerHTML = resp.data[0].colonia;
     document.getElementById("ciudad").innerHTML = resp.data[0].ciudad;
     document.getElementById("municipio").innerHTML = resp.data[0].municipio;
     document.getElementById("estado").innerHTML = resp.data[0].estado;
     document.getElementById("pais").innerHTML = resp.data[0].pais;
     document.getElementById("correo").innerHTML = resp.data[0].correo;
     document.getElementById("valorId").innerHTML = idD;

    } );
}
export default ViewSpecificDonor;