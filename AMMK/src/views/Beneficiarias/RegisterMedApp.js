import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';

//COMPONENTS
import Form from "react-bootstrap/Form";
import { Button, Badge, Card, CardBody, FormGroup, Input, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup } from 'reactstrap';
import Swal from 'sweetalert2';

//API calls
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

// REGEX FOR VALIDATIONS
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+[\w]+$/);
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validAge = RegExp(/^[0-9]{1,3}$/);
const validTextArea = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ _:\0-9@]+$/);
const validTime = RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

function parseSpecialties(specialties) {
  return specialties.map((specialty) => {
    return { label: specialty.nombre, value: specialty.id };
  })
}

export default class RegisterMedApp extends Component {

  getSpecialty() {
    axios.get(API_BASE_URL + 'specialties')
      .then(res => this.setState({ specialties: parseSpecialties(res.data) }));
  }

  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      fechaConsulta: null,
      horaConsulta: null,
      direccion: null,
      diagnostico: null,
      hospital: null,
      consultorio: null,
      dxMedico: null,
      comentario: null,
      specialties: [],
      fileData: String,
      errors: {
        fechaConsulta: '',
        horaConsulta: '',
        direccion: '',
        diagnostico: '',
        hospital: '',
        consultorio: '',
        dxMedico: '',
        comentario: '',
      }
    };

    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //FileChange
  handleFile(file) {
    this.setState({
      fileData: file[0],
    })
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fechaConsulta':
        errors.fechaConsulta =
          value.length < 1
            ? "La fecha de la consulta es requerida."
            : "" ||
              validDate.test(value)
              ? "La fecha ingresada no es válida."
              : "";
        break;
      case 'horaConsulta':
        errors.horaConsulta =
          value.length < 1
            ? "La hora de la consulta es requerida."
            : "" ||
              validTime.test(value)
              ? ""
              : "La hora ingresada no es válida.";
        break;
      case 'diagnostico':
        errors.diagnostico =
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
      case 'direccion':
        errors.direccion =
          value.length < 1
            ? "La dirección es un campo requerido."
            : "" || value.length > 150
              ? "El campo permite máximo 150 caracteres."
              : "" || validAlphanumericInput.test(value)
                ? ""
                : "El campo solo acepta letras y números.";
        break;
      case 'hospital':
        errors.hospital =
          value.length > 100
            ? "El campo permite máximo 100 caracteres."
            : "" || validAlphanumericInput.test(value)
              ? ""
              : "El campo solo acepta letras y números.";
        break;
      case 'consultorio':
        errors.consultorio =
          value.length > 3
            ? "El campo permite un número de hasta 3 cifras."
            : "" ||
              validAge.test(value)
              ? ""
              : "El campo solo acepta números.";
        break;
      case 'comentario':
        errors.comentario =
          validTextArea.test(value)
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
    let fechaConsulta = document.getElementById("fechaConsulta").value;
    let horaConsulta = document.getElementById("horaConsulta").value;
    let diagnostico = document.getElementById("diagnostico").value;
    let direccion = document.getElementById("direccion").value;
    let hospital = document.getElementById("hospital").value;
    let consultorio = document.getElementById("consultorio").value;
    let especialidad = document.getElementById("specialty").value;
    let comentario = document.getElementById("comentarios").value;
    let beneficiary_id = document.getElementById("beneficiary_id").value;

    if (fechaConsulta === '' || horaConsulta === '' || direccion === '' || especialidad === '0') {
      Swal.fire(
        '¡ERROR!',
        'Verifica que todos los campos obligatorios estén completos.',
        'error')
    } else {
      const consulta = {
        fechaConsulta: fechaConsulta,
        horaConsulta: horaConsulta,
        diagnostico: diagnostico,
        direccion: direccion,
        hospital: hospital,
        consultorio: consultorio,
        specialty_id: especialidad,
        comentario: comentario,
        beneficiary_id: beneficiary_id,
      };

      axios.post(API_BASE_URL + "medical_appointments/", consulta).then(res => { console.log(res) });
      Swal.fire(
        '¡Listo!',
        'Consulta médica registrada de manera exitosa',
        'success'
      ).then(function () {
        this.props.history.push("admin/Beneficiarias/MedicalRecordView/" + beneficiary_id);
      });
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
    this.getSpecialty();
  }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
        if (!login ) {
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
    }

    const { id } = this.props.match.params;
    console.log(id);


    const { errors } = this.state;

    return (
      <div className="content">
        <Prompt
          when={true}
          message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
        />
        <h1 className="title">REGISTRAR CONSULTA MÉDICA</h1>
        <Card>
          <CardBody>
            <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
            <Form onSubmit={this.onSubmit} autocomplete="off">

              <Input id="beneficiary_id" name="beneficiary_id" value={id} hidden></Input>

              <FormGroup>
                <Label for="fechaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de consulta médica:</Label>
                <Input type="date" id="fechaConsulta" name="fechaConsulta" onChange={this.handleChange}></Input>
                {errors.fechaConsulta.length > 0 && <span className='error'>{errors.fechaConsulta}</span>
                  ||
                  errors.fechaConsulta.length == 0 && <span className='error'>{errors.fechaConsulta}</span>}
              </FormGroup>

              <FormGroup>
                <Label for="horaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'clock']} />&nbsp;Hora de consulta médica:</Label>
                <Input type="time" id="horaConsulta" name="horaConsulta" onChange={this.handleChange}></Input>
                {errors.horaConsulta.length > 0 && <span className='error'>{errors.horaConsulta}</span>
                  ||
                  errors.horaConsulta.length == 0 && <span className='error'>{errors.horaConsulta}</span>}
              </FormGroup>

              <FormGroup>
                <Label for="diagnostico"><FontAwesomeIcon icon={['fas', 'diagnoses']} />&nbsp;Diagnóstico:</Label>
                <Input id="diagnostico" name="diagnostico" placeholder="Amigdalitis" onChange={this.handleChange}></Input>
                {errors.diagnostico.length > 0 && <span className='error'>{errors.diagnostico}</span>
                  ||
                  errors.diagnostico.length == 0 && <span className='error'>{errors.diagnostico}</span>}
              </FormGroup>

              <FormGroup>
                <Label for="direccion">*&nbsp;<FontAwesomeIcon icon={['fas', 'map-marker-alt']} />&nbsp;Dirección:</Label>
                <Input id="direccion" name="direccion" placeholder="Calle Ignacio Allende 203, Querétero, Querétaro" onChange={this.handleChange}></Input>
                {errors.direccion.length > 0 && <span className='error'>{errors.direccion}</span>
                  ||
                  errors.direccion.length == 0 && <span className='error'>{errors.direccion}</span>}
              </FormGroup>

              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label for="hospital"><FontAwesomeIcon icon={['fas', 'hospital']} />&nbsp;Hospital:</Label>
                    <Input id="hospital" name="hospital" placeholder="Star Medica" onChange={this.handleChange}></Input>
                    {errors.hospital.length > 0 && <span className='error'>{errors.hospital}</span>
                      ||
                      errors.hospital.length == 0 && <span className='error'>{errors.hospital}</span>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label><FontAwesomeIcon icon={['fas', 'person-booth']} />&nbsp;Consultorio:</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><FontAwesomeIcon icon={['fas', 'hashtag']} /></InputGroupText>
                      </InputGroupAddon>
                      <Input id="consultorio" name="consultorio" placeholder="238" onChange={this.handleChange}></Input>
                      {errors.consultorio.length > 0 && <span className='error'>{errors.consultorio}</span>
                        ||
                        errors.consultorio.length == 0 && <span className='error'>{errors.consultorio}</span>}
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label htmlFor="specialty">* Especialidad: </Label>
                <Input type="select" name="specialty" id="specialty" value={this.state.value} onChange={this.onChange}>
                  <option value="0" selected>Selecciona una opción...</option>
                  {this.state.specialties.map((specialty) => <option key={specialty.value} value={specialty.value}>{specialty.label}</option>)}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="comentarios">Comentarios:</Label>
                <Input type="textarea" id="comentarios" name="comentarios" onChange={this.handleChange}></Input>
                {errors.comentario.length > 0 && <span className='error'>{errors.comentario}</span>
                  ||
                  errors.comentario.length == 0 && <span className='error'>{errors.comentario}</span>}
              </FormGroup>
              <Row className="text-center">
                <Col md="12">
                  <Button type="submit">Registrar</Button>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
        <div class="static-bottom">
          <Link to={{
            pathname: '../MedicalRecordView/' + id,
            state: id
          }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button color="primary" id="regresar"><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Regresar</Button>
          </Link>
        </div>
      </div>
    )
  }
}
