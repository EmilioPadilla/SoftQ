import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import {Button, Input, InputGroupText, InputGroupAddon, InputGroup, Label, FormGroup, Row, Col, Table, Card, CardBody} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import NurseTable from "../../components/Beneficiarias/NurseTable";

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
                        <NurseTable/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
