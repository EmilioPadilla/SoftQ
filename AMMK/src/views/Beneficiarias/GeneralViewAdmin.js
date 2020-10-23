import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Row, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import AdminTable from "../../components/Beneficiarias/AdminTable";

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
                                <Input type="text" class="form-control" placeholder="Maria Sandoval Arrieta" aria-label="busquedaNombre" aria-describedby="magGlass"></Input>
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
                
                <AdminTable/>

            </div>
        )
    }
}
