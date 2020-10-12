import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardHeader, CardBody, Form, Row, Progress, Alert, Col, FormGroup, Label, Input, CustomInput} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default class RegisterB2 extends Component {
    render() {
        return (
            <div className="content">
                <h2 className="title">Registrar Beneficiaria</h2>
                <Card>
                    <CardHeader>
                        <h3 className="title">Datos de ingreso</h3>
                        <Progress striped color="info" value="66.66"></Progress>
                        <br></br>
                        <Alert color="light">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                    <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                    <Label for="exampleInputEmail1">&nbsp;Fecha de ingreso:</Label>
                                    <Input type="date"></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                    <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                    <Label for="exampleInputEmail1">&nbsp;Carga de hoja de ingreso:</Label>
                                    <CustomInput type="file" label="Seleccionar archivo...">
                                    </CustomInput>
                                    <span class="badge badge-light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</span>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'notes-medical']} />
                                <Label for="exampleInputEmail1">&nbsp;Diagnóstico médico:</Label>
                                <Input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Parálisis cerebral"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleInputEmail1">Edad mental:</Label>
                                <Input type="number" min="1" max="100"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleInputEmail1">Canalizador:</Label>
                                <Input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Estefanía Ortíz"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label>Vínculos familiares:</Label>
                                <div class="input-group">
                                    <Input type="textarea" class="form-control" aria-label="With textarea"></Input>
                                </div>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/Beneficiarias/RegisterB1'>
                    <button type="submit" class="btn btn-primary">Anterior <i class="fas fa-arrow-circle-left"></i></button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link to='/admin/Beneficiarias/RegisterB3'>
                    <button type="submit" class="btn btn-primary">Siguiente <i class="fas fa-arrow-circle-right"></i></button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}