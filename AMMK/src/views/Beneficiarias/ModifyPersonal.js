import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';

//COMPONENTS
import { Button, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, CustomInput, Progress, Col, Alert, Row, Badge } from "reactstrap";

//API CALLS
import axios from "axios";
import { API_BASE_URL, FRONT_BASE_URL } from '../../index';
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
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+$/); //acepta numeros y letras y saltos de linea

const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

export default class ModifyPersonal extends Component {

    fillData() {
        let urlElements = window.location.href.split('/');
        axios.get(API_BASE_URL + 'beneficiaries/' + urlElements[6])
            .then(function (res) {
                document.getElementById("nombreCompleto").value = res.data[0].nombreCompleto;
                document.getElementById("apodo").value = res.data[0].apodo;
                document.getElementById("fechaNacimiento").value = res.data[0].fechaNacimiento;
                document.getElementById("numCurp").value = res.data[0].numCurp;
                document.getElementById("fechaIngreso").value = res.data[0].fechaIngreso;
                document.getElementById("edadMental").value = res.data[0].edadMental;
                document.getElementById("motivoIngreso").value = res.data[0].motivoIngreso;
                document.getElementById("canalizador").value = res.data[0].canalizador;
                document.getElementById("dxMedico").value = res.data[0].dxMedico;
                document.getElementById("vinculosFam").value = res.data[0].vinculosFam;
                document.getElementById("headquarter_id").value = res.data[0].headquarter_id;
            })
    }

    constructor(props) {
        super(props);
        this.state = {
            formValid: false,
            errorCount: null,
            id: '',
            beneficiaries: [],
            errors: {
                nombreCompleto: '',
                apodo: '',
                fechaNacimiento: '',
                curp: '',
                vinculosFam: '',
            }
        };

        //VALIDAR INPUTS
        this.handleChange = this.handleChange.bind(this);

        //ACTUALIZAR LA INFO MODIFICADA
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'nombreCompleto':
                errors.nombreCompleto =
                    value.length === 0
                        ? "El nombre de la beneficiaria es requerido."
                        : "" || value.length > 50
                            ? "El campo permite máximo 50 caracteres."
                            : "" || validName.test(value)
                                ? ""
                                : "El campo solo acepta letras y debe ser llenado de la forma: nombre apPaterno apMaterno.";
                break;
            case 'apodo':
                errors.apodo =
                    value.length === 0
                        ? ""
                        : "" ||
                            value.length > 50
                            ? "El campo permite máximo 50 caracteres."
                            : "" || value.length < 3
                                ? "El campo debe contener al menos 3 caracteres."
                                : "" || validTextInput.test(value)
                                    ? ""
                                    : "El campo solo acepta letras.";
                break;
            case 'fechaNacimiento':
                errors.fechaNacimiento =
                    value.length === 0
                        ? "La fecha de nacimiento de la beneficiaria es requerida."
                        : "" ||
                            validDate.test(value)
                            ? "La fecha no es correcta."
                            : "";
                break;
            case 'curp':
                errors.curp =
                    value.length === 0
                        ? ""
                        : "" ||
                            validCurp.test(value)
                            ? ""
                            : "La curp ingresada no es correcta.";
                break;

            case 'vinculosFam':
                errors.vinculosFam =
                    value.length === 0
                        ? ""
                        : "" ||
                            validAlphanumericInput.test(value)
                            ? ""
                            : "El texto ingresado es inválido.";
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    onSubmit(e) {

        e.preventDefault();

        if(validateForm(this.state.errors)) {
        //Agarrar los valores 
        let id = document.getElementById("id").value;
        let headquarter_id = document.getElementById("headquarter_id").value;
        let nombreCompleto = document.getElementById("nombreCompleto").value;
        let apodo = document.getElementById("apodo").value;
        let numCurp = document.getElementById("numCurp").value;
        let fechaNacimiento = document.getElementById("fechaNacimiento").value;
        let edadMental = document.getElementById("edadMental").value;
        let fechaIngreso = document.getElementById("fechaIngreso").value;
        let motivoIngreso = document.getElementById("motivoIngreso").value;
        let canalizador = document.getElementById("canalizador").value;
        let dxMedico = document.getElementById("dxMedico").value;
        let vinculosFam = document.getElementById("vinculosFam").value;

        if (nombreCompleto !== '' && fechaNacimiento !== '') {
            const beneficiary = {
                id: id,
                status_id: 1,
                headquarter_id: headquarter_id,
                nombreCompleto: nombreCompleto,
                apodo: apodo,
                numCurp: numCurp,
                canalizador: canalizador,
                fechaIngreso: fechaIngreso,
                dxMedico: dxMedico,
                fechaNacimiento: fechaNacimiento,
                vinculosFam: vinculosFam,
                edadMental: edadMental,
                motivoIngreso: motivoIngreso,
                fechaEgreso: "",
                motivoEgreso: "",
                destino: "",
            };
            axios.put(API_BASE_URL + "beneficiaries/" + id, beneficiary).then(res => { console.log(res) });

            Swal.fire(
                '¡Listo!',
                'Datos personales modificados de manera exitosa.',
                'success',
            ).then(function () {
                window.location = FRONT_BASE_URL + "admin/Beneficiarias/SpecificView/" + id;
            });
        } else {
            Swal.fire(
                'ERROR!',
                'Verifica que todos los campos obligatorios estén completos.',
                'error'
            )
        }
    }else{
        Swal.fire(
          '!ERROR!',
          'Verifica que todos los campos sean correctos.',
          'error'
        )
      }
    }

    componentDidMount() {
        this.fillData();
    }

    render() {
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login) {
            window.location = FRONT_BASE_URL + "login";
        } else if (idRol == 2) {
            window.location = FRONT_BASE_URL + "general/NurseIndex";
        } else if (idRol == 1) {
            window.location = FRONT_BASE_URL + "admin/Nomina/Nomina";
        }

        let urlElements = window.location.href.split('/');

        const { errors, formValid } = this.state;
        return (
            <div className="content">
                <Prompt
                    when={true}
                    message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
                />
                <h2 className="title">Modificar Beneficiaria</h2>
                <Form onSubmit={this.onSubmit} autocomplete="off">
                    <Card>
                        <CardHeader>
                            <h3 className="title">Datos personales</h3>
                            <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        </CardHeader>
                        <CardBody>
                            <Input type="text" id="id" name="id" value={urlElements[6]} hidden></Input>

                            <Input type="text" id="headquarter_id" name="headquarter_id" hidden></Input>
                            <Input type="text" id="edadMental" name="edadMental" hidden></Input>
                            <Input type="text" id="fechaIngreso" name="fechaIngreso" hidden></Input>
                            <Input type="text" id="motivoIngreso" name="motivoIngreso" hidden></Input>
                            <Input type="text" id="canalizador" name="canalizador" hidden></Input>
                            <Input type="text" id="dxMedico" name="dxMedico" hidden></Input>

                            <FormGroup>
                                <Label htmlFor="nombreCompleto">*&nbsp;<FontAwesomeIcon icon={['fas', 'user']} />&nbsp;Nombre completo:</Label>
                                <Input id="nombreCompleto" placeholder="Maria Sandoval Arrieta" name="nombreCompleto" onChange={this.handleChange} ></Input>
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

                            <FormGroup>
                                <Label htmlFor="fechaNacimiento">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de nacimiento:</Label>
                                <Input type="date" id="fechaNacimiento" name="fechaNacimiento" onChange={this.handleChange}></Input>
                                {errors.fechaNacimiento.length > 0 && <span className='error'>{errors.fechaNacimiento}</span>
                                    ||
                                    errors.fechaNacimiento.length == 0 && <span className='error'>{errors.fechaNacimiento}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="curp">CURP:</Label>
                                <Input id="numCurp" name="curp" placeholder="XEXX010101HNEXXXA4" onChange={this.handleChange}></Input>
                                {errors.curp.length > 0 && <span className='error'>{errors.curp}</span>
                                    ||
                                    errors.curp.length == 0 && <span className='error'>{errors.curp}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="vinculosFam">Vínculos familiares:</Label>
                                <Input id="vinculosFam" type="textarea" name="vinculosFam" placeholder="Recibe visitas esporádicas por parte de su prima." onChange={this.handleChange}></Input>
                                {errors.vinculosFam.length > 0 && <span className='error'>{errors.vinculosFam}</span>
                                    ||
                                    errors.vinculosFam.length == 0 && <span className='error'>{errors.vinculosFam}</span>}
                            </FormGroup>

                        </CardBody>
                    </Card>
                    <Col md="12" align="center">
                        <Button type="submit">Modificar</Button>

                    </Col>
                </Form>
                <div class="static-bottom">
                    <Link to={{
                        pathname: '../SpecificView/' + urlElements[6],
                        state: urlElements[6]
                    }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button color="primary" id="regresar"><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Regresar</Button>
                    </Link>
                </div>
            </div>
        );
    }
}