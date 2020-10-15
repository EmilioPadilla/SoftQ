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

export default class SpecificView extends Component {
    render() {
        return (
            <div className="content">
                <h3 className="title">DETALLE BENEFICIARIA</h3>
                <Alert color="light">BENEFICIARIA ACTIVA</Alert>
                <Alert color="light">BENEFICIARIA INACTIVA</Alert>
                
                <Row>
                    <Col md="4">
                        <img src="archivosBeneficiarias/<?php echo obtenerImagen($idBeneficiaria.'_imagenIngreso_')?>" width="250" class="img-fluid" alt="Imagen de Ingreso" id="fotoBenef" onerror="this.onerror=null; this.src='avatar.jpg';"></img>
                    </Col>
                    <Col md="8">
                        <h1 className="title">Maria Sandoval Arrieta</h1>
                        <DropdownItem divider />
                        <Badge color="primary">DATOS PERSONALES</Badge>
                        <Button  className="float-right" size="sm" id="editar"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                        <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
                        <Row>
                            <Col md="6">
                                <p className="font-weight-bold">Fecha de nacimiento:</p>
                            </Col>
                            <Col md="6">
                                <p className="font-weight-bold">Edad:</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6">
                                <p className="font-weight-bold">CURP:</p>
                            </Col>
                            <Col md="6">
                                <p className="font-weight-bold">Edad mental:</p>
                            </Col>
                        </Row>

                        <Row className="text-center">
                            <Col md="12">
                                <Link to='/admin/Beneficiarias/MedicalRecordView'>
                                <Button id="historialMedico" color="warning" className=""><FontAwesomeIcon icon={['fas', 'notes-medical']} />&nbsp;HISTORIAL MÉDICO</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md="6">
                        <Badge color="primary">DATOS DE INGRESO</Badge>
                    </Col>
                    <Col md="6">
                        <Button  className="float-right" size="sm" id="editar"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                        <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md="6">
                        <Badge color="primary">ARCHIVOS DE REGISTRO</Badge>
                    </Col>
                    <Col md="6">
                        <Button  className="float-right" size="sm" id="editar"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                        <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
                    </Col>
                </Row>
                
                <Table hover>
                    <thead>
                        <tr>
                            <th>Nombre de archivo</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Button color="info" size="sm" id="verArchivo"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                <SimpleTooltip placement="top" target="verArchivo" >Ver archivo</SimpleTooltip>

                                <Button color="primary" size="sm" id="descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                                <SimpleTooltip placement="top" target="descargar" >Descargar</SimpleTooltip>

                                <Button color="danger" size="sm" id="eliminar"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                                <SimpleTooltip placement="top" target="eliminar" >Eliminar</SimpleTooltip>
                            </td>
                        </tr>
                </Table>
            </div>
        )
    }
}
