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
    constructor(props){
        super(props)
        this.onSubmit= this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault()

        //Agarrar los valores 
        let fechaIngreso = document.getElementById("fechaIngreso").value;
        let edadMental = document.getElementById("edadMental").value;
        let canalizador = document.getElementById("canalizador").value;
        let vinculosFam = document.getElementById("vinculosFam").value;
        let dxMedico = document.getElementById("dxMedico").value;

        const datosIngreso = {
            fechaIngreso: fechaIngreso,
            edadMental: edadMental,
            canalizador: canalizador,
            vinculosFam: vinculosFam,
            dxMedico: dxMedico,
        };
        localStorage.setItem("ingreso", JSON.stringify(datosIngreso));
    }

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
                        <Form onSubmit={this.onSubmit}>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                    <Label htmlFor="fechaIngreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de ingreso:</Label>
                                    <Input type="date" id="fechaIngreso"></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                    <Label htmlFor="cargaIngreso"><FontAwesomeIcon icon={['fas', 'file-upload']} />&nbsp;Carga de hoja de ingreso:</Label>
                                    <CustomInput id="cargaIngreso" type="file" label="Seleccionar archivo...">
                                    </CustomInput>
                                    <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label htmlFor="dxMedico"><FontAwesomeIcon icon={['fas', 'notes-medical']} />&nbsp;Diagnóstico médico:</Label>
                                <Input maxLength="125" id="dxMedico" placeholder="Parálisis cerebral"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="edadMental">Edad mental:</Label>
                                <Input id="edadMental" type="number" min="1" max="100"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="canalizador">Canalizador:</Label>
                                <Input maxLength="100" id="canalizador" placeholder="Estefanía Ortíz"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="vinculosFam">Vínculos familiares:</Label>
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
                    <Button type="submit">Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}