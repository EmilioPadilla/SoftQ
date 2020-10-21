import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Row, Table, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText, Modal} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import TakeOutD from "../Donors/TakeOutD";
import ReenterD from "../Donors/ReenterD";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ModalRegistrarDonacion from './ModalRegistrarDonacion';


import TakeOutB from "../Donors/TakeOutD";


library.add(fas)

export default class GeneralViewAdmin extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">DONANTES</h1>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label for="statusSelect">Estatus</Label>
                            <Input type="select">
                            <option> Estatus...</option>
                            <option >Activos</option>
                            <option>Inactivos</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col>
                        <Link to='/admin/GeneralRegistroD'>
                        <Button className="btn btn-primary float-right"><FontAwesomeIcon icon={['fas', 'user-plus']} /> Registrar Donante</Button>
                        </Link>
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label>Búsqueda por nombre:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                <InputGroupText><FontAwesomeIcon icon={['fas', 'search']} /></InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col md="4">
                        <FormGroup>
                            <Label>Filtrar por Tipo:</Label>
                            <Input type="select">
                            <option>Tipo de Donante...</option>
                            <option>Particular</option>
                            <option >Patronato</option>
                            <option>Gobierno</option>
                            <option>Empresa</option>
                            <option>Fundación</option>


                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Table hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Recurrencia</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                        <tr>
                            <td>Maria Sandoval Arrieta</td>
                            <td>Particular</td>
                            <td>Mensual</td>
                            <td>
                                <Row>
                                <ModalRegistrarDonacion/>
                                <Col md="2">
                                <Link to='/admin/VistaDonante'>
                                <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                </Link>
                                </Col>
                                <Col md="2">

                                <TakeOutD/>
                                  </Col>
                                  <Col md="2"> <ReenterD/></Col>
                                
                                </Row>
                            </td>
                        </tr>
                </Table>
            </div>
        )
    }
}




