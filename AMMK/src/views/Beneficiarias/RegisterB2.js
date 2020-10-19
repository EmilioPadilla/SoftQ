import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Badge, Button, Card, CardHeader, CardBody, Form, Row, Progress, Alert, Col, FormGroup, Label, Input, CustomInput} from 'reactstrap';

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
                        <Progress striped color="primary" value="66.66"></Progress>
                        <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                    <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                    <Label for="fechaIngreso">&nbsp;Fecha de ingreso:</Label>
                                    <Input type="date" id="fechaIngreso"></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                    <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                    <Label for="cargaIngreso">&nbsp;Carga de hoja de ingreso:</Label>
                                    <CustomInput id="cargaIngreso" type="file" label="Seleccionar archivo...">
                                    </CustomInput>
                                    <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'notes-medical']} />
                                <Label for="dxMedico">&nbsp;Diagnóstico médico:</Label>
                                <Input maxlength="125" id="dxMedico" placeholder="Parálisis cerebral"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="edadMental">Edad mental:</Label>
                                <Input id="edadMental" type="number" min="1" max="100"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="canalizador">Canalizador:</Label>
                                <Input maxlength="100" id="canalizador" placeholder="Estefanía Ortíz"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="vinculosFam">Vínculos familiares:</Label>
                                <Input id="vinculosFam" type="textarea"></Input>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/Beneficiarias/RegisterB1'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link to='/admin/Beneficiarias/RegisterB3'>
                    <Button>Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}