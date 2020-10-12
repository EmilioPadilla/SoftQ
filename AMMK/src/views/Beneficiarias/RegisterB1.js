import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardHeader, CardBody, Form, FormGroup, Label, Input, CustomInput, Progress, Col, Alert, Row} from "reactstrap";

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
                        <Progress striped color="info" value="33.33"></Progress>
                        <br></br>
                        <Alert color="light">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                    </CardHeader>
                    <CardBody>
                    <Form>
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'user']} />
                            <Label for="exampleInputEmail1">&nbsp;Nombre completo:</Label>
                            <Input type="text" className="form-control" id="nombreCompleto" placeholder="Maria Sandoval Arrieta"></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="apodo">Apodo:</Label>
                            <Input type="text" class="form-control" id="apodo" placeholder="Mary"></Input>
                        </FormGroup>

                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                            <Label for="fechaNacimiento">&nbsp;Fecha de nacimiento:</Label>
                            <Input type="date"></Input>
                        </FormGroup>
                        </Col>

                        <Col md="6">
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-upload']} />
                            <Label for="exampleInputEmail1">&nbsp;Carga de acta de nacimiento:</Label>
                            <CustomInput type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <span class="badge badge-light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</span>
                        </FormGroup>
                        </Col>
                        </Row>

                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <Label for="exampleInputEmail1">CURP:</Label>
                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="XEXX010101HNEXXXA4"></input>
                        </FormGroup>
                        </Col>

                        <Col md="6">
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-upload']} />
                            <Label for="exampleInputEmail1">&nbsp;Carga de CURP:</Label>
                            <CustomInput type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <span class="badge badge-light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</span>
                        </FormGroup>
                        </Col>
                        </Row>
                        
                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-upload']} />
                            <Label for="exampleInputEmail1">&nbsp;Carga de INE:</Label>
                            <CustomInput type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <span class="badge badge-light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</span>
                        </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <Col  md="12" align="right">
                  <Link to='/admin/Beneficiarias/RegisterB2'>
                  <button type="submit" class="btn btn-primary">Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']} /></button>
                  </Link>
                </Col>
            </div>
        );
    }
}