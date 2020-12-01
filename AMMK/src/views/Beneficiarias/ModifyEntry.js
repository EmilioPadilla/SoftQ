import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';

//COMPONENTS
import Form from "react-bootstrap/Form";
import { Badge, Button, Card, CardHeader, CardBody, Row, Progress, Alert, Col, FormGroup, Label, Input, CustomInput, CardFooter } from 'reactstrap';
import Swal from 'sweetalert2';

//API CALLS
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// REGEX FOR VALIDATIONS
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validAge = RegExp(/^[0-9]{1,2}$/);
const validTextArea = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ _:\0-9@]+$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

function parseHeadquarters(headquarters) {
  return headquarters.map((headquarter) => {
    return { label: headquarter.nombre, value: headquarter.id };
  });
}

export default class ModifyEntry extends Component {
  fillData() {
    let urlElements = window.location.href.split('/');
    console.log(API_BASE_URL + 'beneficiaries/' + urlElements[6]);
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
        document.getElementById("headquarters").value = res.data[0].headquarter_id;
      })
  }

  getSede() {
    axios.get(API_BASE_URL + 'headquarters')
      .then(res => this.setState({ headquarters: parseHeadquarters(res.data) }));
  }


  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      edadMental: null,
      fechaIngreso: null,
      canalizador: null,
      dxMedico: null,
      vinculosFam: null,
      beneficiaries: [],
      headquarters: [],
      errors: {
        edadMental: '',
        fechaIngreso: '',
        canalizador: '',
        dxMedico: '',
        vinculosFam: '',
        motivoIngreso: '',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //ERROR VALIDATION IN INPUTS
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fechaIngreso':
        errors.fechaIngreso =
          value.length < 1
            ? "La fecha de ingreso de la beneficiaria es requerida."
            : "" ||
              validDate.test(value)
              ? "La fecha ingresada no es válida."
              : "";
        break;
      case 'canalizador':
        errors.canalizador =
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
      case 'dxMedico':
        errors.dxMedico =
          value.length < 1
            ? "El diagnóstico médico de la beneficiaria es requerido."
            : "" || value.length > 125
              ? "El campo permite máximo 125 caracteres."
              : "" || value.length < 3
                ? "El campo debe contener al menos 3 caracteres."
                : "" || validTextInput.test(value)
                  ? ""
                  : "El campo solo acepta letras.";
        break;
      case 'edadMental':
        errors.edadMental =
          value.length === 0
            ? ""
            : "" ||
              value.length > 2
              ? "El campo permite un número de hasta 2 cifras"
              : "" ||
                validAge.test(value)
                ? ""
                : "El campo solo acepta números.";
        break;
      case 'motivoIngreso':
        errors.motivoIngreso =
          value.length === 0
            ? ""
            : "" ||
              validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  onSubmit(e) {

    e.preventDefault()

    //Agarrar los valores 
    let id = document.getElementById("id").value;
    let sede = document.getElementById("headquarters").value;
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

    if (fechaIngreso === '' || dxMedico === '' || sede === '0') {
      Swal.fire({
        icon: 'error',
        title: '¡ERROR!',
        text: 'Verifica que todos los campos obligatorios estén completos.',
      })
    } else {
      const beneficiary = {
        id: id,
        status_id: 1,
        headquarter_id: sede,
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
        'Egreso registrado de manera exitosa',
        'success',
      ).then(function () {
        this.props.history.push("admin/Beneficiarias/SpecificView/" + id);
      });
    }

  }

  componentDidMount() {
    this.getSede();
    this.fillData();
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
    const { errors } = this.state;
    let urlElements = window.location.href.split('/');

    return (
      <div className="content">
        <Prompt
          when={true}
          message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
        />
        <Form onSubmit={this.onSubmit} autocomplete="off">
          <h2 className="title">Modificar Beneficiaria</h2>
          <Card>
            <CardHeader>
              <h3 className="title" align="center">Datos de ingreso</h3>
              <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
            </CardHeader>
            <CardBody>
              <Input type="text" id="id" name="id" value={urlElements[6]} hidden></Input>
              <Input type="text" id="nombreCompleto" name="nombreCompleto" hidden></Input>
              <Input type="text" id="apodo" name="apodo" hidden></Input>
              <Input type="text" id="numCurp" name="numCurp" hidden></Input>
              <Input type="text" id="fechaNacimiento" name="fechaNacimiento" hidden></Input>
              <Input type="text" id="vinculosFam" name="vinculosFam" hidden></Input>

              <FormGroup>
                <Label htmlFor="headquarters">* Sede: </Label>
                <Input type="select" name="headquarters" id="headquarters" value={this.state.value} onChange={this.onChange}>
                  <option value="0" selected>Selecciona una opción...</option>
                  {this.state.headquarters.map((headquarter) => <option key={headquarter.value} value={headquarter.value}>{headquarter.label}</option>)}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="fechaIngreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de ingreso:</Label>
                <Input type="date" id="fechaIngreso" name="fechaIngreso" onChange={this.handleChange}></Input>
                {errors.fechaIngreso.length > 0 && <span className='error'>{errors.fechaIngreso}</span>
                  ||
                  errors.fechaIngreso.length == 0 && <span className='error'>{errors.fechaIngreso}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="dxMedico">*&nbsp;<FontAwesomeIcon icon={['fas', 'notes-medical']} />&nbsp;Diagnóstico médico:</Label>
                <Input maxLength="125" id="dxMedico" placeholder="Parálisis cerebral" name="dxMedico" onChange={this.handleChange}></Input>
                {errors.dxMedico.length > 0 && <span className='error'>{errors.dxMedico}</span>
                  ||
                  errors.dxMedico.length == 0 && <span className='error'>{errors.dxMedico}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="motivoIngreso">*&nbsp;Motivo de ingreso:</Label>
                <Input type="textarea" id="motivoIngreso" placeholder="Sufría de violencia familiar." name="motivoIngreso" onChange={this.handleChange}></Input>
                {errors.motivoIngreso.length > 0 && <span className='error'>{errors.motivoIngreso}</span>
                  ||
                  errors.motivoIngreso.length == 0 && <span className='error'>{errors.motivoIngreso}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edadMental">Edad mental:</Label>
                <Input id="edadMental" type="number" min="1" max="100" name="edadMental" onChange={this.handleChange}></Input>
                {errors.edadMental.length > 0 && <span className='error'>{errors.edadMental}</span>
                  ||
                  errors.edadMental.length == 0 && <span className='error'>{errors.edadMental}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="canalizador">Canalizador:</Label>
                <Input id="canalizador" placeholder="DIF Estatal" name="canalizador" onChange={this.handleChange}></Input>
                {errors.canalizador.length > 0 && <span className='error'>{errors.canalizador}</span>
                  ||
                  errors.canalizador.length == 0 && <span className='error'>{errors.canalizador}</span>}
              </FormGroup>
            </CardBody>
            <CardFooter>
              <Row>
                <Col md="12" align="center">
                  <Button type="submit" >Modificar</Button>
                </Col>
              </Row>
            </CardFooter>
          </Card>
        </Form>
        <div class="fixed-bottom" style={{ margin: '15px' }}>
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