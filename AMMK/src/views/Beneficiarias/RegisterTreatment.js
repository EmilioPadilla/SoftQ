import React, { Component } from 'react';

// reactstrap components
import { Card, CardBody, Form, Row, Alert, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge, Button} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterTreatment extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">REGISTRAR TRATAMIENTO</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form>
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'preescription']} />
                                <Label for="medicamento">&nbsp;Nombre del medicamento:</Label>
                                <Input id="medicamento" placeholder="Cefalexina 500 MG" maxLength=""></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="funcion">Función del medicamento:</Label>
                                <Input id="funcion" placeholder="Aliviar migraña" maxLength=""></Input>
                            </FormGroup>

                            <Row>
                                <Col md="12">
                                        <FontAwesomeIcon icon={['fas', 'pills']} />
                                        <Label for="dosis" maxLength="">&nbsp;Dosis:</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="2">
                                    <FormGroup>
                                        <Input id="dosis" type="number" min="1" max="50" placeholder="1"></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                <Input type="select">
                                    <option>Seleccionar modo...</option>
                                    <option>Tableta(s)</option>
                                    <option>Cápsula(s)</option>
                                </Input>
                                </Col>
                            </Row>


                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'clock']} />
                                <Label for="lapso">&nbsp;Lapso:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Cada</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="lapso" type="number" min="1" max="24" placeholder="8"></Input>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>hrs</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                <Label>&nbsp;Duración:</Label>
                                <Row>
                                    <Col md="6">
                                        <Badge color="primary">Fecha de inicio:</Badge>
                                        <Input type="date" id="fechaInicio"></Input>
                                    </Col>
                                    <Col med="6">
                                        <Badge color="primary">Fecha de término:</Badge>
                                        <Input type="date" id="fechaTermino"></Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                            </Form> 
                        </CardBody>
                    </Card>
                    <Row className="text-center">
                        <Col md="12">
                            <Button>Registrar</Button>
                        </Col>
                    </Row>
            </div>
        );
    }
}