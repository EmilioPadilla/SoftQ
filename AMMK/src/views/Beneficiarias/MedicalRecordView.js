import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import {Card, CardBody, Row, Col, Table, Button} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class MedicalRecordView extends Component {

    render() {
        return (
            <div className="content">
                <h1 className="title">HISTORIAL MÉDICO</h1>
                <Row>
                    <Col md="12">
                        <h3 className="title text-center">TRATAMIENTOS</h3>
                        <Link to='/admin/Beneficiarias/RegisterTreatment'>
                        <Button className="float-right" size="sm" id="registrarTratamiento"><FontAwesomeIcon icon={['fas', 'plus']}/></Button>
                        <SimpleTooltip placement="right" target="registrarTratamiento" >Registrar tratamiento</SimpleTooltip>
                        </Link>
                    </Col>
                </Row>

                <Card>
                    <CardBody>
                        <Row>
                            <Col md="12">
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Nombre del medicamento</th>
                                            <th>Función</th>
                                            <th>Dosis</th>
                                            <th>Lapso</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <Button size="sm" id="editar" color=""><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                                                <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>

                                                <Button size="sm" id="eliminar" color="danger"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                                                <SimpleTooltip placement="top" target="eliminar" >Eliminar</SimpleTooltip>
                                            </td>
                                        </tr>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Row>
                    <Col md="12" className="text-center">
                        <h3 className="title">CONSULTAS MÉDICAS</h3>
                        <Link to='/admin/Beneficiarias/RegisterMedApp'>
                        <Button size="sm" id="registrarConsulta" className="float-right"><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
                        <SimpleTooltip placement="right" target="registrarConsulta" >Registrar consulta</SimpleTooltip>
                        </Link>
                    </Col>
                </Row>
                

                <Card>
                    <CardBody>
                        <Row>
                            <Col md="12">
                                <Table hover>
                                    <thead>
                                        <tr>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>Hospital/Consultorio</th>
                                            <th>Especialidad</th>
                                            <th>Diagnóstico</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                        <tr className="table-primary">
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <Button size="sm" id="verDetalle" color="info"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                                <SimpleTooltip placement="top" target="verDetalle" >Ver detalle</SimpleTooltip>

                                                <Button size="sm" id="editar" color=""><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>                      
                                                <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>

                                                <Button size="sm" id="eliminar" color="danger"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                                                <SimpleTooltip placement="top" target="eliminar">Eliminar</SimpleTooltip>
                                            </td>
                                        </tr>
                                </Table>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
