import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Button,Card, CardHeader, CardBody, Form, FormGroup, Label, Input, CustomInput, Progress, Col, Alert, Row, Badge} from "reactstrap";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default class RegisterB1 extends Component {
    render() {
        return (
            <div className="content">
                <h2 className="title">Registrar Beneficiaria</h2>
                <Card>
                    <CardHeader>
                        <h3 className="title">Datos personales</h3>
                        <Progress striped color="primary" value="33.33"></Progress>
                        <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'user']} />
                            <Label for="nombreCompleto">&nbsp;Nombre completo:</Label>
                            <Input id="nombreCompleto" placeholder="Maria Sandoval Arrieta"></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="apodo">Apodo:</Label>
                            <Input id="apodo" placeholder="Mary"></Input>
                        </FormGroup>

                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                            <Label for="fechaNacimiento">&nbsp;Fecha de nacimiento:</Label>
                            <Input type="date" id="fechaNacimiento"></Input>
                        </FormGroup>
                        </Col>

                        <Col md="6">
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-upload']} />
                            <Label for="actaNacimiento">&nbsp;Carga de acta de nacimiento:</Label>
                            <CustomInput id="actaNacimiento" type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                        </FormGroup>
                        </Col>
                        </Row>

                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <Label for="curp">CURP:</Label>
                            <Input id="curp" placeholder="XEXX010101HNEXXXA4"></Input>
                        </FormGroup>
                        </Col>

                        <Col md="6">
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-upload']} />
                            <Label for="cargaCurp">&nbsp;Carga de CURP:</Label>
                            <CustomInput id="cargaCurp" type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                        </FormGroup>
                        </Col>
                        </Row>
                        
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-upload']} />
                            <Label for="cargaIne">&nbsp;Carga de INE:</Label>
                            <CustomInput id="cargaIne" type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <Badge color="cargaIne">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                        </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <Col  md="12" align="right">
                  <Link to='/admin/Beneficiarias/RegisterB2'>
                  <Button>Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']} /></Button>
                  </Link>
                </Col>
            </div>
        );
    }
}