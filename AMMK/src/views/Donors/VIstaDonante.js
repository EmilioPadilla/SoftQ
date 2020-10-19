import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { DropdownItem, Row, Table, Col, Alert, Button, Badge } from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class VIstaDonante extends Component {
    render() {
        return (
            <div className="content">
                <h3 className="title">DETALLE DONANTE</h3>
                
                
                <Row>
                   
                    <Col>
                        <h1 className="title">Maria Sandoval Arrieta</h1>
                        <DropdownItem divider />
                        <Badge color="primary">DATOS GENERALES</Badge>
                        <Col >
                        <br></br>

                        <Button  className="float-right" size="sm" id="editar"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                        <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
                        </Col >
                            <Col >
                                <p className="font-weight-bold">FECHA DE CUMPLEAÑOS:</p>
                            </Col>
                            <Col >
                                <p className="font-weight-bold">RFC:</p>
                            </Col>
                           
                        
                            <Col >
                                <p className="font-weight-bold">CURP:</p>
                            </Col>
                            <Col >
                                <p className="font-weight-bold">TELEFONO:</p>
                            </Col>
                            <Col >
                                <p className="font-weight-bold">CELULAR:</p>
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
                            </Col>
                            <Col >
                                <p className="font-weight-bold">RFC:</p>
                            </Col>

                        
                            <Col >
                            <p className="font-weight-bold">CALLE:</p>
                            </Col>
                            <Col >
                            <p className="font-weight-bold"># Interior:</p>
                            </Col>
                            <Col >
                            <p className="font-weight-bold"># Exterior:</p>
                            </Col>
                            <Col >
                            <p className="font-weight-bold">C.P. :</p>
                            </Col>
                            <Col >
                            <p className="font-weight-bold">COLONIA:</p>
                            </Col>
                           
                            <Col >
                            <p className="font-weight-bold">CIUDAD:</p>
                            </Col>
                            <Col >
                            <p className="font-weight-bold">MUNICIPIO:</p>
                            </Col>
                            <Col >
                            <p className="font-weight-bold">ESTADO:</p>
                            </Col>
                            <Col >
                            <p className="font-weight-bold">PAÍS:</p>
                            </Col>
                            <Col >
                            <p className="font-weight-bold">CORREO:</p>
                            </Col>
                            
                        
                    </Col>
                </Row>
          <br></br>
                
                <Table hover>
                    <thead>
                        <tr>
                            <th>FECHA DE DONACIÓN:</th>
                            <th>TIPO DE DONACIÓN:</th>
                            <th>MONTO:</th>
                            <th>DESCRIPCIÓN:</th>
                        </tr>
                    </thead>
                        <tr>
                            <td>18-10-2020</td>
                            <td>ESPECIE</td>
                            <td>$5000</td>
                            <td>CAJAS DE MEDICAMENTOS</td>
                        </tr>
                </Table>
            </div>
        )
    }
}
