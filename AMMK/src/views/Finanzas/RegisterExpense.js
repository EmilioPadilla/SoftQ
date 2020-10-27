import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, Form, FormGroup, Input, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterExpense extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">REGISTRAR EGRESO</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label htmlFor="fechaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha:</Label>
                                <Input type="date" id="fechaConsulta"></Input>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label htmlFor="pagoA">*&nbsp;<FontAwesomeIcon icon={['fas', 'diagnoses']} />&nbsp;Pago a:</Label>
                                <Input id="pagoA" placeholder="CEA" maxLength=""></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="descripcion"><FontAwesomeIcon icon={['fas', 'map-marker-alt']} />&nbsp;Descripción:</Label>
                                <Input id="descripcion" placeholder="Pago de agua noviembre y octubre" maxLength=""></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="monto">*&nbsp;<FontAwesomeIcon icon={['fas', 'clock']} />&nbsp;Monto:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>$</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="monto" type="number" min="1" placeholder="2100"></Input>
                                </InputGroup>
                            </FormGroup>

                            <Row>
                                <Col md="10">
                                    clasificación select 
                                </Col>
                                <Col md="2">
                                    <Button>+</Button>
                                </Col>
                            </Row>


                                <Row className="text-center">
                                    <Col md="12">
                                        <Button type="submit">Registrar</Button>
                                    </Col>
                                </Row>
                            </Form> 
                        </CardBody>
                    </Card>
            </div>
        )
    }
}