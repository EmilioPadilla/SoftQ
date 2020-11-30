import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Progress, Alert, Col, Card, CardBody, CardHeader } from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Col";
import Swal from "sweetalert2";

import axios from 'axios';
import Index from "@material-ui/core/styles/zIndex";
//import Swal from 'sweetalert2';
library.add(fas)



//VALIDATIONS
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validRFC = RegExp(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/);
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/); //Solo letras al menos 3 caracteres
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+$/); //acepta numeros y letras y saltos de linea
const validPhoneNumber = RegExp(/^([0-9]{10})?$/); 
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

const validateForm = (errors) => {  let valid = true;  Object.values(errors).forEach(    (val) => val.length > 0 && (valid = false)  );  return valid;}
class RDonantesPatronato extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      fullname: null,
      birthday: null,
      rfc: null,
      email: null,
      telefono: null,
      celular: null,
      errors: {
        fullname: '',
        birthday: '',
        rfc: '',
        email: '',
        telefono: '',
        celular: '',
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }






  onSubmit(e){

    e.preventDefault()
//agarrrar los valores
    var x = document.getElementById("namePatronato").value;
    var y = document.getElementById("birthdayPatronato").value;
    var z = document.getElementById("RFCPatronato").value;
    var c = document.getElementById("emailPatronato").value;
    var t = document.getElementById("telefonoPatronato").value;
    var cel = document.getElementById("celularPatronato").value;
    if(validateForm(this.state.errors)) {
    if (x === '' || z === '' || c === '' || cel === ''){
      Swal.fire( {
        icon: 'error',
        title: '¡ERROR!',
        text: 'Verifica que todos los campos obligatorios estén completos.',
      })
    } else {

    const donantePatronato = {
      nombreCompleto1: x,
      fechaCumpleaños1: y,
      RFC1: z,
      correo1: c,
      telefono1: t,
      celular1: cel,
    
    };
  
    localStorage.setItem("patronato", JSON.stringify(donantePatronato));
    window.location = FRONT_BASE_URL+"admin/Facturacion";
  }
  }else{    Swal.fire(      '!ERROR!',      'Verifica que todos los campos sean correctos.',      'error'    )  }
   

  }
  
  
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fullname':
        errors.fullname =
          value.length < 6
            ? 'Recuerda ingresar el nombre completo.'
            : '' ||  validTextInput.test(value)
            ? ""
            : "El campo solo acepta letras..";
        break;
        case 'rfc': 
            errors.rfc =
            value.length > 9 && value.length < 13
              ? "El RFC debe contener al menos 13 dígitos."
              : "" ||  validRFC.test(value)
              ? ""
              : "El RFC ingresado no es válido.";
            break;
      case 'rfc':
        errors.rfc =
          validRFC.test(value)
            ? ''
            : 'El RFC ingresado no es válido.';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'El correo ingresado no es válido.';
        break;
      case 'telefono':
        errors.telefono =
          validPhoneNumber.test(value)
            ? ''
            : 'El teléfono debe de contener 10 dígitos.';
        break;
      case 'celular':
        errors.celular =
          validPhoneNumber.test(value)
            ? ''
            : 'El celular debe de contener 10 dígitos.';
        break;
        case 'birthday':
          errors.birthday =
               "" ||
                      validDate.test(value)
                      ? "La fecha no es correcta"
                      : "";
          break;
      default:
        break;
    }
    this.setState({ errors, [name]: value });
  }


    handleSubmit = (event) => {
      event.preventDefault();
      if(validateForm(this.state.errors)) {
        console.info('Valid Form')
      }else{
        console.error('Invalid Form')
      }
    }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
      window.location = FRONT_BASE_URL+"login";
  }else if(idRol==2){
      window.location = FRONT_BASE_URL+"general/NurseIndex";
  }else if (idRol==1){
      window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
  }
    const {errors} = this.state;

    return (
      <div className="content">
         <Prompt
            when={true}
            message="Te encuentras en proceso de modificación... ¿Estás segur@ de querer salir?"
          />
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          <Card>
          <CardHeader>
          <h3 align="center" className="title">Datos Particulares</h3>
          <Progress striped color="primary" value="50"></Progress>
          <br></br>
          <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
          <div class="container"></div>
          <Form autoComplete="off">
              <Form.Row>
                <Form.Group as={Row} controlId="namePatronato">
                  <Form.Label>* Nombre de la persona/empresa/asociación/fundación:</Form.Label>
                  <Form.Control
                    type="text" name='fullname'
                    placeholder="Maria Sandoval Arrieta" onChange={this.handleChange}
                  />
                  {errors.fullname.length > 0 &&
                    <span className='error'>{errors.fullname}</span>}
                </Form.Group>
              </Form.Row>

            <Form.Row>
              <Form.Group as={Row} controlId="birthdayPatronato">
                <Form.Label><FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de cumpleaños:</Form.Label>
                <Form.Control type="date" placeholder=" / / " onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>

              <Form.Row>
                <Form.Group as={Row} controlId="RFCPatronato">
                  <Form.Label>* RFC:</Form.Label>
                  <Form.Control type="text" name='rfc' placeholder="AAPA430998DFE" onChange={this.handleChange} />
                  {errors.rfc.length > 0 &&
                    <span className='error'>{errors.rfc}</span>}</Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Row} controlId="emailPatronato">
                  <Form.Label>*&nbsp;<FontAwesomeIcon icon={['fas', 'envelope']} />&nbsp; Correo:</Form.Label>
                  <Form.Control name='email' type="email" placeholder="mariaSandoval@gmail.com" onChange={this.handleChange} />
                  {errors.email.length > 0 &&
                    <span className='error'>{errors.email}</span>}</Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Row} controlId="telefonoPatronato">
                  <Form.Label><FontAwesomeIcon icon={['fas', 'phone-alt']} />&nbsp;Teléfono:</Form.Label>
                  <Form.Control type="text" name='telefono' placeholder="4422343344" onChange={this.handleChange} />{errors.telefono.length > 0 &&
                    <span className='error'>{errors.telefono}</span>}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Row} controlId="celularPatronato">
                  <Form.Label>*&nbsp;<FontAwesomeIcon icon={['fas', 'mobile-alt']} />&nbsp;Celular:</Form.Label>
                  <Form.Control name='celular' type="text" placeholder="4423433233" onChange={this.handleChange} />{errors.celular.length > 0 &&
                    <span className='error'>{errors.celular}</span>}
                </Form.Group>
              </Form.Row>

            <Form.Row>
              <Col md="6" align="left">
                <Link to='/admin/GeneralRegistroD'>
                  <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Anterior</Button>
                </Link>
              </Col>
              <Col md="6" align="right">
                  <Button onClick={this.onSubmit}>Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']} /></Button>
              </Col>
            </Form.Row>
          </Form>
          </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default RDonantesPatronato;
