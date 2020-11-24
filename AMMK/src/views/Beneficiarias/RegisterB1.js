import React, { Component } from 'react';
import { Prompt } from 'react-router'

//COMPONENTS
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, CustomInput, Progress, Col, Alert, Row, Badge } from "reactstrap";
import Swal from 'sweetalert2';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// REGEX FOR VALIDATIONS
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/);
const validName = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/);
const validCurp = RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

export default class RegisterB1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formValid: false,
            errorCount: null,
            nombreCompleto: null,
            apodo: null,
            fechaNacimiento: null,
            curp: null,
            errors: {
                nombreCompleto: '',
                apodo: '',
                fechaNacimiento: '',
                curp: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'nombreCompleto':
                errors.nombreCompleto =
                    value.length < 1
                        ? "El nombre de la beneficiaria es requerido"
                        : "" || value.length > 50
                            ? "El campo permite máximo 50 caracteres"
                            : "" || validName.test(value)
                                ? ""
                                : "El campo solo acepta letras y debe ser llenado de la forma: nombre apPaterno apMaterno";
                break;
            case 'apodo':
                errors.apodo =
                    value.length > 50
                        ? "El campo permite máximo 50 caracteres"
                        : "" || value.length < 3
                            ? "El campo debe contener al menos 3 caracteres"
                            : "" || validTextInput.test(value)
                                ? ""
                                : "El campo solo acepta letras.";
                break;
            case 'fechaNacimiento':
                errors.fechaNacimiento =
                    value.length < 1
                        ? "La fecha de nacimiento de la beneficiaria es requerida"
                        : "" ||
                            validDate.test(value)
                            ? "La fecha no es correcta"
                            : "";
                break;
            case 'curp':
                errors.curp =
                    validCurp.test(value)
                        ? ""
                        : "La curp ingresada no es correcta.";
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    onSubmit(e) {
        e.preventDefault()

        //Agarrar los valores 
        let nombre = document.getElementById("nombreCompleto").value;
        let apodo = document.getElementById("apodo").value;
        let fechaNacimiento = document.getElementById("fechaNacimiento").value;
        let curp = document.getElementById("curp").value;

        if (nombre !== '' && fechaNacimiento !== '') {
            const datosPersonales = {
                nombreCompleto: nombre,
                apodo: apodo,
                fechaNacimiento: fechaNacimiento,
                numCurp: curp,
            };
            localStorage.setItem("personal", JSON.stringify(datosPersonales));
            window.location = "http://localhost:3000/admin/Beneficiarias/RegisterB2";
        } else {
            Swal.fire( {
                icon: 'error',
                title: '¡Error!',
                text: 'Verifica que todos los campos obligatorios estén completos.',
              })
        }
    }

    render() {
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login) {
            window.location = "http://localhost:3000/login";
        } else if (idRol == 2) {
            window.location = "http://localhost:3000/general/NurseIndex";
        } else if (idRol == 1) {
            window.location = "http://localhost:3000/admin/Nomina/Nomina";
        }
        const { errors } = this.state;
        return (
            <div className="content">
                <Prompt
                    when={true}
                    message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
                />

                <h2 className="title">Registrar Beneficiaria</h2>
                <Form autocomplete="off">
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
                                <Input id="nombreCompleto" placeholder="Maria Sandoval Arrieta" name="nombreCompleto" onChange={this.handleChange}></Input>
                                {errors.nombreCompleto.length > 0 && <span className='error'>{errors.nombreCompleto}</span>
                                    ||
                                    errors.nombreCompleto.length == 0 && <span className='error'>{errors.nombreCompleto}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="apodo">Apodo:</Label>
                                <Input id="apodo" placeholder="Mary" name="apodo" onChange={this.handleChange}></Input>
                                {errors.apodo.length > 0 && <span className='error'>{errors.apodo}</span>
                                    ||
                                    errors.apodo.length == 0 && <span className='error'>{errors.apodo}</span>}
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label htmlFor="fechaNacimiento">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de nacimiento:</Label>
                                        <Input type="date" id="fechaNacimiento" name="fechaNacimiento" onChange={this.handleChange}></Input>
                                        {errors.fechaNacimiento.length > 0 && <span className='error'>{errors.fechaNacimiento}</span>
                                            ||
                                            errors.fechaNacimiento.length == 0 && <span className='error'>{errors.fechaNacimiento}</span>}
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
                                        <Input id="curp" name="curp" placeholder="XEXX010101HNEXXXA4" onChange={this.handleChange}></Input>
                                        {errors.curp.length > 0 && <span className='error'>{errors.curp}</span>
                                            ||
                                            errors.curp.length == 0 && <span className='error'>{errors.curp}</span>}
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
                    <Col md="12" align="right">
                        <Button onClick={this.onSubmit}>Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']} /></Button>
                    </Col>
                </Form>
            </div>
        );
    }
}
