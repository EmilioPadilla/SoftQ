import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import {Button, Input, InputGroupText, InputGroupAddon, InputGroup, Label, FormGroup, Row, Col, Table, Card, CardBody} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class GeneralViewNurse extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">BENEFICIARIAS</h1>

                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label for="busquedaNombre">Búsqueda por nombre:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText><FontAwesomeIcon icon={['fas', 'search']} /></InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Maria Sandoval Arrieta"  id="busquedaNombre"></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col md="4">
                        <FormGroup>
                            <Label>Filtrar por sede:</Label>
                            <Input type="select">
                            <option>Sede...</option>
                            <option >Asoc. MMK</option>
                            <option>Granja Betanía</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                
                <Card>
                    <CardBody>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Edad</th>
                                    <th>Diagnóstico Médico</th>
                                    <th>Sede</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                                <tr>
                                    <td>Maria Sandoval Arrieta</td>
                                    <td>25</td>
                                    <td>Parálisis cerebral</td>
                                    <td>Granja Betanía</td>
                                    <td>
                                        <Link to='/admin/Beneficiarias/RegisterTreatment'>
                                        <Button color="primary" size="sm" id="registrarTratamiento"><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
                                        <SimpleTooltip placement="top" target="registrarTratamiento">Registrar tratamiento</SimpleTooltip>
                                        </Link>

                                        <Link to='/admin/Beneficiarias/MedicalRecordView'>
                                        <Button color="warning" size="sm" id="verHistorial"><FontAwesomeIcon icon={['fas', 'notes-medical']} /></Button>
                                        <SimpleTooltip placement="top" target="verHistorial" >Ver historial médico</SimpleTooltip>
                                        </Link>

                                        <Link to='/admin/Beneficiarias/SpecificView'>
                                        <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                        <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                        </Link>
                                    </td>
                                </tr>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
