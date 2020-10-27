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

    constructor(props){
        super(props)
        this.onSubmit= this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault()

        //Agarrar los valores 
        let nombreCompleto = document.getElementById("nombreCompleto").value;
        let apodo = document.getElementById("apodo").value;
        let fechaNacimiento = document.getElementById("fechaNacimiento").value;
        let curp = document.getElementById("curp").value;

        const datosPersonales = {
            nombreCompleto: nombreCompleto,
            apodo: apodo,
            fechaNacimiento: fechaNacimiento,
            curp: curp,
        };
        localStorage.setItem("personal", JSON.stringify(datosPersonales));
    }

    render() {
        return (
            <div className="content">
                <h2 className="title">Registrar Beneficiaria</h2>
                <Form onSubmit={this.onSubmit}>
                <Card>
                    <CardHeader>
                        <h3 className="title">Datos personales</h3>
                        <Progress striped color="primary" value="33.33"></Progress>
                        <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                    </CardHeader>
                    <CardBody>
                        <FormGroup>
                            <Label htmlFor="nombreCompleto">*&nbsp;<FontAwesomeIcon icon={['fas', 'user']} />&nbsp;Nombre completo:</Label>
                            <Input id="nombreCompleto" placeholder="Maria Sandoval Arrieta"></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="apodo">Apodo:</Label>
                            <Input id="apodo" placeholder="Mary"></Input>
                        </FormGroup>

                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <Label htmlFor="fechaNacimiento">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de nacimiento:</Label>
                            <Input type="date" id="fechaNacimiento"></Input>
                        </FormGroup>
                        </Col>

                        <Col md="6">
                        <FormGroup>
                            <Label htmlFor="actaNacimiento"><FontAwesomeIcon icon={['fas', 'file-upload']} />&nbsp;Carga de acta de nacimiento:</Label>
                            <CustomInput id="actaNacimiento" type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                        </FormGroup>
                        </Col>
                        </Row>

                        <Row>
                        <Col md="6">
                        <FormGroup>
                            <Label htmlFor="curp">CURP:</Label>
                            <Input id="curp" placeholder="XEXX010101HNEXXXA4"></Input>
                        </FormGroup>
                        </Col>

                        <Col md="6">
                        <FormGroup>
                            <Label htmlFor="cargaCurp"><FontAwesomeIcon icon={['fas', 'file-upload']} />&nbsp;Carga de CURP:</Label>
                            <CustomInput id="cargaCurp" type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                        </FormGroup>
                        </Col>
                        </Row>

                        <FormGroup>
                            <Label htmlFor="cargaIne"><FontAwesomeIcon icon={['fas', 'file-upload']} />&nbsp;Carga de INE:</Label>
                            <CustomInput id="cargaIne" type="file" label="Seleccionar archivo...">
                            </CustomInput>
                            <Badge id="cargaIne" color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                        </FormGroup>
                    </CardBody>
                </Card>
                <Col  md="12" align="right">
                  <Link to='/admin/Beneficiarias/RegisterB2'>
                  <Button type="submit">Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']} /></Button>
                  </Link>
                </Col>
                </Form>
            </div>
        );
    }
}
