import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Card, CardHeader, CardBody, Form, Row, Progress, Alert, Col, FormGroup, Label, CustomInput} from 'reactstrap';

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
                        <Progress striped color="primary" value="100"></Progress>
                        <br></br>
                        <Alert color="primary">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Alert>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="cargaBautismo">&nbsp;Carga de fe de bautismo:</Label>
                                <CustomInput id="cargaBautismo" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="cargaConfirmacion">&nbsp;Carga de boleta de confirmación:</Label>
                                <CustomInput id="cargaConfirmacion" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="cargaComunion">&nbsp;Carga de primera comunión:</Label>
                                <CustomInput id="cargaComunion" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/Beneficiarias/RegisterB2'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link>
                    <Button>Registrar</Button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}