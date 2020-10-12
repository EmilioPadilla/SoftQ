import React, { Component } from 'react';

// reactstrap components
import { Card, CardHeader, CardBody, Form, Row, Progress, Alert, Col, FormGroup, Label, CustomInput, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterTreatment extends Component {
    render() {
        return (
            <div className="content">
                <h1>REGISTRAR TRATAMIENTO</h1>
                <Alert color="light">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                <Form>
                    <FormGroup>
                        <FontAwesomeIcon icon={['fas', 'preescription']} />
                        <Label for="exampleInputEmail1">&nbsp;Nombre del medicamento:</Label>
                        <Input type="text"  placeholder="Cefalexina 500 MG"></Input>
                    </FormGroup>

                    <FormGroup>
                        <Label for="exampleInputEmail1">Función del medicamento:</Label>
                        <Input type="text" placeholder="Aliviar migraña"></Input>
                    </FormGroup>

                    <Row>
                        <Col md="12">
                                <FontAwesomeIcon icon={['fas', 'pills']} />
                                <Label for="exampleInputEmail1">&nbsp;Dosis:</Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2">
                            <FormGroup>
                                <Input type="number" placeholder="1"></Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                        <Input type="select" name="select" id="statusSelect">
                            <option selected="1">Seleccionar modo...</option>
                            <option >Tableta(s)</option>
                            <option>Cápsula(s)</option>
                        </Input>
                        </Col>
                    </Row>


                    <FormGroup>
                        <FontAwesomeIcon icon={['fas', 'clock']} />
                        <Label for="exampleInputEmail1">&nbsp;Lapso:</Label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>Cada</InputGroupText>
                            </InputGroupAddon>
                            <Input type="number" min="1" max="72" class="form-control" placeholder="8" aria-label="busquedaNombre" aria-describedby="magGlass"></Input>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>hrs</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                        <Label for="exampleInputEmail1">&nbsp;Duración:</Label>
                        <Row>
                            <Col md="6">
                                <span class="badge badge-light">Fecha de inicio:</span>
                                <Input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""></Input>
                            </Col>
                            <Col med="6">
                                <span class="badge badge-light">Fecha de término:</span>
                                <Input type="date" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder=""></Input>
                            </Col>
                        </Row>
                    </FormGroup>

                    <Row>
                        <Col md="12">
                            <button type="submit" class="btn btn-primary">Registrar</button>
                        </Col>
                    </Row>
                </Form> 
            </div>
        );
    }
}