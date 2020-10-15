import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Row, Table, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import TakeOutB from "../Beneficiarias/TakeOutB";
import ReenterB from "../Beneficiarias/ReenterB";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class GeneralViewAdmin extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">BENEFICIARIAS</h1>
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
                    
                    <Col md="6">
                        <Link to='/admin/Beneficiarias/RegisterB1'>
                        <Button className="btn btn-primary float-right"><FontAwesomeIcon icon={['fas', 'user-plus']} /> Registrar beneficiaria</Button>
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
                            <Input type="text" class="form-control" placeholder="Maria Sandoval Arrieta" aria-label="busquedaNombre" aria-describedby="magGlass"></Input>
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
                                <Row>
                                <Link to='/admin/Beneficiarias/SpecificView'>
                                <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                </Link>

                                <TakeOutB/>

                                <ReenterB/>
                                </Row>
                            </td>
                        </tr>
                </Table>
            </div>
        )
    }
}
