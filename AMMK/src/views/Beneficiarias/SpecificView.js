import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Row, Table, Col, Alert, Button, Badge } from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class SpecificView extends Component {
    render() {
        return (
            <div class="content">
                <h3>DETALLE BENEFICIARIA</h3>
                <Alert color="primary">
                    <h4>BENEFICIARIA ACTIVA</h4>
                </Alert>
                <Alert color="primary">
                    <h4>BENEFICIARIA INACTIVA</h4>
                </Alert>
                
                <Row>
                    <Col md="4">
                        <img src="archivosBeneficiarias/<?php echo obtenerImagen($idBeneficiaria.'_imagenIngreso_')?>" width="250" class="img-fluid" alt="Imagen de Ingreso" id="fotoBenef" onerror="this.onerror=null; this.src='avatar.jpg';"></img>
                    </Col>
                    <Col md="8">
                        <h2>Maria Sandoval Arrieta</h2>
                        <div class="dropdown-divider"></div>
                        <Badge>DATOS PERSONALES</Badge>
                        <Button  className="btn btn-primary float-right" size="sm" id="editar" data-toggle="tooltip" data-placement="top" title="Modificar"><i class="fas fa-pencil-alt"></i></Button>
                        <Row>
                            <Col md="6">
                                <p class="font-weight-bold">Fecha de nacimiento:</p>
                            </Col>
                            <Col md="6">
                                <p class="font-weight-bold">Edad:</p>
                            </Col>
                        </Row>

                        <Row>
                            <Col md="6">
                                <p class="font-weight-bold">CURP:</p>
                            </Col>
                            <Col md="6">
                                <p class="font-weight-bold">Edad mental:</p>
                            </Col>
                        </Row>

                        <Row class="text-center">
                            <Col md="12">
                                <Link to='/admin/Beneficiarias/RegisterB1'>
                                <Button className="btn btn-primary" id="historialMedico" type="button"  data-toggle="tooltip" data-placement="top" title="Ver historia médica">
                                <FontAwesomeIcon icon={['fas', 'notes-medical']} /> HISTORIAL MÉDICO
                                </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md="6">
                        <Badge>DATOS DE INGRESO</Badge>
                    </Col>
                    <Col md="6">
                        <Button className="btn btn-primary float-right" size="sm" id="editar" data-toggle="tooltip" data-placement="top" title="Modificar"><i class="fas fa-pencil-alt"></i></Button>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col md="6">
                        <Badge>ARCHIVOS DE REGISTRO</Badge>
                    </Col>
                    <Col md="6">
                        <Button className="btn btn-primary float-right" size="sm" id="editar" data-toggle="tooltip" data-placement="top" title="Modificar"><i class="fas fa-pencil-alt"></i></Button>
                    </Col>
                </Row>
                
                <Table class="table table-hover">
                    <thead class="thead-light">
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
                                <Button className="btn btn-primary float-right" size="sm" data-toggle="tooltip" data-placement="top" title="Ver"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                <Button className="btn btn-primary float-right" size="sm" data-toggle="tooltip" data-placement="top" title= "Descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                                <Button className="btn btn-primary float-right" size="sm" data-toggle="tooltip" data-placement="top" title="Eliminar"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                            </td>
                        </tr>
                </Table>
            </div>
        )
    }
}
