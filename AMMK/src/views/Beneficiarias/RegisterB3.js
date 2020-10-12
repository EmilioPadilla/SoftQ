import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardHeader, CardBody, Form, Row, Progress, Alert, Col, FormGroup, Label, CustomInput} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterB3 extends Component {
    render() {
        return (
            <div className="content">
                <h2 className="title">Registrar Beneficiaria</h2>
                <Card>
                    <CardHeader>
                        <h3 className="title">Carga de archivos religiosos</h3>
                        <Progress striped color="info" value="100"></Progress>
                        <br></br>
                        <Alert color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Alert>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="exampleInputEmail1">&nbsp;Carga de fe de bautismo:</Label>
                                <CustomInput type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="exampleInputEmail1">&nbsp;Carga de boleta de confirmación:</Label>
                                <CustomInput type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="exampleInputEmail1">&nbsp;Carga de primera comunión:</Label>
                                <CustomInput type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/Beneficiarias/RegisterB2'>
                    <button type="submit" className="btn btn-primary">Anterior <i class="fas fa-arrow-circle-left"></i></button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}