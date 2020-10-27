import React, { Component } from 'react';
import { Button, Badge, Card, CardBody, Form, FormGroup, Input, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterMedApp extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">REGISTRAR CONSULTA MÉDICA</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                <Label for="fechaConsulta">&nbsp;Fecha de consulta médica:</Label>
                                <Input type="date" id="fechaConsulta"></Input>
                            </FormGroup>
                            
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'diagnoses']} />
                                <Label for="diagnostico">&nbsp;Diagnóstico:</Label>
                                <Input id="diagnostico" placeholder="Amigdalitis" maxLength=""></Input>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                                <Label for="direccion">&nbsp;Dirección:</Label>
                                <Input id="direccion" placeholder="Calle Ignacio Allende 203, Querétero, Querétaro" maxLength="120"></Input>
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <FontAwesomeIcon icon={['fas', 'hospital']} />
                                        <Label for="hospital">&nbsp;Hospital:</Label>
                                        <Input id="hospital" placeholder="Star Medica" maxLength=""></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <FontAwesomeIcon icon={['fas', 'person-booth']} />
                                        <Label>&nbsp;Consultorio:</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon icon={['fas', 'hashtag']} /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="238" maxLength=""></Input>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <FormGroup>
                                    <FontAwesomeIcon icon={['fas', 'stethoscope']} />
                                    <Label for="especialidad">&nbsp;Especialidad:</Label>
                                    <CustomInput type="select" id="especialidad" name="especialidad">
                                    <option value="">Seleccionar especialidad...</option>
                                    <option>Value 1</option>
                                    <option>Value 2</option>
                                    </CustomInput>
                                </FormGroup>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'comment']} />
                                <Label for="comentarios">&nbsp;Comentarios:</Label>
                                <Input type="textarea" id="comentarios"></Input>
                            </FormGroup>

                            <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-prescription']} />
                            <Label for="cargaReceta">Carga de receta médica:</Label>
                                <CustomInput id="cargaReceta" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                                <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                            </FormGroup>
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
