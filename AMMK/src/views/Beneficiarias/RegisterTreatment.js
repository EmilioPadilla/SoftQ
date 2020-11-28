import React, { Component } from 'react';
import { Prompt } from 'react-router';
import { Link } from "react-router-dom";

//COMPONENTS
import Form from "react-bootstrap/Form";
import { Card, CardBody, Row, Alert, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge, Button } from 'reactstrap';
import Swal from 'sweetalert2';

//API CALLS
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

// REGEX FOR VALIDATIONS
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+$/);
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/);
const validAge = RegExp(/^[0-9]{1,2}$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

function parseMode(modes) {
  return modes.map((mode) => {
    return { label: mode.nombre, value: mode.id };
  })
}

export default class RegisterTreatment extends Component {

  getModes() {
    axios.get(API_BASE_URL + 'modes')
      .then(res => this.setState({ modes: parseMode(res.data) }));
  }

  constructor(props) {
    super(props);
    this.state = {
      modes: [],
      nombreMed: null,
      funcionMed: null,
      dosis: null,
      lapso: null,
      fechaInicio: null,
      fechaTermino: null,
      errors: {
        nombreMed: '',
        funcionMed: '',
        dosis: '',
        lapso: '',
        fechaInicio: '',
        fechaTermino: '',
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
      case 'nombreMed':
        errors.nombreMed =
          value.length < 1
            ? "El nombre del medicamento es requerido."
            : "" || value.length > 70
              ? "El campo permite máximo 70 caracteres."
              : "" || validAlphanumericInput.test(value)
                ? ""
                : "El campo solo acepta letras y números.";
        break;
      case 'funcionMed':
        errors.funcionMed =
          value.length === 0
            ? ""
            : "" ||
              value.length > 100
              ? "El campo permite máximo 100 caracteres."
              : "" || value.length < 3
                ? "El campo debe contener al menos 3 caracteres."
                : "" || validTextInput.test(value)
                  ? ""
                  : "El campo solo acepta letras.";
        break;
      case 'dosis':
        errors.dosis =
          value.length < 1
            ? "La dosis del medicamento es requerida."
            : "" ||
              value.length > 2
              ? "El campo permite un número de hasta 2 cifras."
              : "" ||
                validAge.test(value)
                ? ""
                : "El campo solo acepta números.";
        break;
      case 'lapso':
        errors.lapso =
          value.length < 1
            ? "El lapso del medicamento es requerido."
            : "" ||
              value.length > 2
              ? "El campo permite un número de hasta 2 cifras."
              : "" ||
                validAge.test(value)
                ? ""
                : "El campo solo acepta números.";
        break;
      case 'fechaInicio':
        errors.fechaInicio =
          value.length < 1
            ? "La fecha de inicio del tratamiento es requerida."
            : "" ||
              validDate.test(value)
              ? "La fecha ingresada no es válida."
              : "";
        break;
      case 'fechaTermino':
        errors.fechaTermino =
          value.length < 1
            ? "La fecha de termino del tratamiento es requerida."
            : "" ||
              validDate.test(value)
              ? "La fecha ingresada no es válida."
              : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  onSubmit(e) {

    e.preventDefault()

    //Agarrar los valores 
    let nombreMed = document.getElementById("nombreMed").value;
    let funcionMed = document.getElementById("funcionMed").value;
    let dosis = document.getElementById("dosis").value;
    let lapso = document.getElementById("lapso").value;
    let fechaInicio = document.getElementById("fechaInicio").value;
    let fechaTermino = document.getElementById("fechaTermino").value;
    let mode_id = document.getElementById("mode").value;
    let beneficiary_id = document.getElementById("beneficiary_id").value;

    if (nombreMed === '' || dosis === '' || lapso === '' || fechaInicio === '' || fechaTermino === '' || mode_id === 0) {
      Swal.fire(
        '!ERROR!',
        'Verifica que todos los campos obligatorios estén completos.',
        'error'
      )
    } else {
      const tratamiento = {
        nombreMed: nombreMed,
        funcionMed: funcionMed,
        dosis: dosis,
        lapso: lapso,
        fechaInicio: fechaInicio,
        fechaTermino: fechaTermino,
        mode_id: mode_id,
        beneficiary_id: beneficiary_id,
      };
      axios.post(API_BASE_URL + "treatments/", tratamiento).then(res => { console.log(res) });

      Swal.fire(
        '¡Listo!',
        'Tratamiento registrado de manera exitosa.',
        'success',
      ).then(function () {
        window.location = FRONT_BASE_URL + "admin/Beneficiarias/MedicalRecordView/" + beneficiary_id;
      });
    }

  }

  componentDidMount() {
    this.getModes();
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
    const { errors } = this.state;

    const { id } = this.props.match.params;
    console.log(id);

    return (
      <div className="content">
        <Prompt
          when={true}
          message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
        />
        <h1 className="title">REGISTRAR TRATAMIENTO</h1>
        <Card>
          <CardBody>
            <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
            <Form onSubmit={this.onSubmit} autocomplete="off">
              <Input id="beneficiary_id" name="beneficiary_id" value={id} hidden></Input>

              <FormGroup>
                <Label for="nombreMed">*&nbsp;<FontAwesomeIcon icon={['fas', 'prescription']} />&nbsp;Nombre del medicamento:</Label>
                <Input id="nombreMed" name="nombreMed" placeholder="Cefalexina 500 MG" onChange={this.handleChange}></Input>
                {errors.nombreMed.length > 0 && <span className='error'>{errors.nombreMed}</span>
                  ||
                  errors.nombreMed.length == 0 && <span className='error'>{errors.nombreMed}</span>}
              </FormGroup>

              <FormGroup>
                <Label for="funcionMed">Función del medicamento:</Label>
                <Input id="funcionMed" name="funcionMed" placeholder="Aliviar migraña" onChange={this.handleChange}></Input>
                {errors.funcionMed.length > 0 && <span className='error'>{errors.funcionMed}</span>
                  ||
                  errors.funcionMed.length == 0 && <span className='error'>{errors.funcionMed}</span>}
              </FormGroup>

              <Row>
                <Col md="12">
                  <Label for="dosis">*&nbsp;<FontAwesomeIcon icon={['fas', 'pills']} />&nbsp;Dosis:</Label>
                </Col>
              </Row>

              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input id="dosis" name="dosis" type="number" placeholder="8" onChange={this.handleChange}></Input>
                    {errors.dosis.length > 0 && <span className='error'>{errors.dosis}</span>
                      ||
                      errors.dosis.length == 0 && <span className='error'>{errors.dosis}</span>}
                  </FormGroup>
                </Col>
                <Col md="6">

                  <FormGroup>
                    <Input type="select" name="mode" id="mode" value={this.state.value} onChange={this.onChange}>
                      <option value="0" selected>Selecciona una opción...</option>
                      {this.state.modes.map((mode) => <option key={mode.value} value={mode.value}>{mode.label}</option>)}
                    </Input>
                  </FormGroup>
                </Col>
              </Row>

              <div className="lapso">
                <FormGroup>
                  <Label htmlFor="lapso">*&nbsp;<FontAwesomeIcon icon={['fas', 'clock']} />&nbsp;Lapso:</Label>
                  <Row>
                    <Col md="2">
                      <Input disabled placeholder="Cada"></Input>
                    </Col>
                    <Col md="8">
                      <Input id="lapso" name="lapso" type="number" placeholder="8" onChange={this.handleChange}></Input>
                      {errors.lapso.length > 0 && <span className='error'>{errors.lapso}</span>
                        ||
                        errors.lapso.length == 0 && <span className='error'>{errors.lapso}</span>}
                    </Col>
                    <Col md="2">
                      <Input disabled placeholder="hrs"></Input>
                    </Col>
                  </Row>
                </FormGroup>
              </div>

              <FormGroup>
                <Row>
                  <Col md="6">
                    <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                    <Label>&nbsp;Fecha de inicio:</Label>

                    <Input type="date" id="fechaInicio" name="fechaInicio" onChange={this.handleChange}></Input>
                    {errors.fechaInicio.length > 0 && <span className='error'>{errors.fechaInicio}</span>
                      ||
                      errors.fechaInicio.length == 0 && <span className='error'>{errors.fechaInicio}</span>}
                  </Col>
                  <Col med="6">
                    <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                    <Label>&nbsp;Fecha de termino:</Label>
                    <Input type="date" id="fechaTermino" name="fechaTermino" onChange={this.handleChange}></Input>
                    {errors.fechaTermino.length > 0 && <span className='error'>{errors.fechaTermino}</span>
                      ||
                      errors.fechaTermino.length == 0 && <span className='error'>{errors.fechaTermino}</span>}
                  </Col>
                </Row>
              </FormGroup>

              <Row className="text-center">
                <Col md="12">
                  <Button type="submit">Registrar</Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <div class="fixed-bottom" style={{ margin: '15px' }}>
          <Link to={{
            pathname: '../MedicalRecordView/' + id,
            state: id
          }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button color="primary" id="regresar"><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Regresar</Button>
          </Link>
        </div>
      </div>
    );
  }
}