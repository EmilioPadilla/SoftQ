import React, { Component } from "react";
import { Prompt } from 'react-router';
import { Link } from "react-router-dom";

import { Row, Modal, Form, FormGroup,  Dropdown,Button, Col } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';
import { Progress, Alert,  Card, CardBody, CardHeader } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { API_BASE_URL } from "index";
import { FRONT_BASE_URL } from "index";
library.add(fas)

const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/); //Fechas válidas
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/); //Solo letras al menos 3 caracteres
const validPhoneNumber = RegExp(/^([0-9]{10})?$/); 
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {  let valid = true;  Object.values(errors).forEach(    (val) => val.length > 0 && (valid = false)  );  return valid;}


class RegistroContactoDonante extends Component {
    
    constructor(props){
        super(props)
        this.state = {
          nombre: null,
          cargo: null,
          cumple: null,
          correo: null,
          telefono: null,
          celular: null,
          errors: {
            nombre: '',
            cargo: '',
            cumple: '',
            correo: '',
            telefono: '',
            celular: '',
          }
        };
      this.onSubmit= this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);

    }
    onSubmit(e){

        e.preventDefault()
      //agarrrar los valores con el id del forms
        var nombre = document.getElementById("nombre").value;
        var  cargo= document.getElementById("cargo").value;
        var cumple = document.getElementById("cumple").value;
        var correo = document.getElementById("correo").value;
        var telefono = document.getElementById("telefono").value;
        var celular = document.getElementById("celular").value;
        
        if(validateForm(this.state.errors)) {

        if (nombre!="" && cargo !="" && correo !=""  && celular!=""){

      
      //nombre + F de facturacion
        const donacion = {
          nombreCompleto: nombre,
          cargo: cargo,
          fechaCumpleaño: cumple,
          correo1:correo,
          telefono1:telefono,
          celular1:celular,


        };
        
        
        localStorage.setItem("contacto", JSON.stringify(donacion));
        var jsonArray0 = JSON.parse(localStorage.getItem("donante"));
        var jsonArray1 = JSON.parse(localStorage.getItem("contacto"));
        const jsonArray= {...jsonArray0,...jsonArray1};
        console.log(jsonArray0);
        localStorage.clear();

       // var jsonArray3=  JSON.parse(localStorage.getItem("prueba"));

      

        axios.post(API_BASE_URL+'contactoDonante', jsonArray).then(res => {console.log(res)});
        
       //validacion
      
       Swal.fire(
        '¡Listo!',
        'Datos guardados',
        'success'
        ).then(function() {
            window.location = FRONT_BASE_URL+"admin/ViewDonors";
        });
        
        }else{
          Swal.fire( {
            icon: 'error',
            title: '¡ERROR!',
            text: 'Verifica que todos los campos obligatorios estén completos.',
          })
     
        }
      }else{    Swal.fire(      '!ERROR!',      'Verifica que todos los campos sean correctos.',      'error'    )  }

      
    }
    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
  
      switch (name) {
        case 'nombre':
          errors.nombre =
            value.length < 3
            ? 'Recuerda ingresar el nombre completo.'
            : '' ||  validTextInput.test(value)
            ? ""
            : "El campo solo acepta letras.";
        break;
         
          case 'cargo': 
              errors.cargo =
              value.length < 3
              ? 'Recuerda ingresar el nombre completo del cargo.'
              : '' ||  validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
              break;
        case 'correo':
          errors.correo =
          validEmailRegex.test(value)
            ? ''
            : 'El correo ingresado no es válido.';
        
          break;
          case 'cumple':
            errors.fecha =
                        validDate.test(value)
                        ? "La fecha no es valida."
                        : "";
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
        default:
          break;
      }
      this.setState({ errors, [name]: value });
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      if (validateForm(this.state.errors)) {
        console.info('Valid Form')
      } else {
        console.error('Invalid Form')
      }
    }
    render() { 
      const { errors } = this.state;

        return ( 
<div className="content">
<Prompt
            when={true}
            message="Te encuentras en proceso de modificación... ¿Estás segur@ de querer salir?"
          />
        <div class="container-fluid">
          <h1 className="title">Registrar Contacto</h1>
          <Card>
          <CardHeader>
          <h3 align="center" className="title">Datos Contacto</h3>
          <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
            <div class="container">
            <Form autoComplete="off">
              
            <Form.Row>
              <FormGroup as={Col}>
              <Form.Label>* Nombre del Contacto:</Form.Label>
         <Form.Control id="nombre" name="nombre" placeholder="Maria Sandoval" onChange={this.handleChange} ></Form.Control>{errors.nombre.length > 0 &&
                    <span className='error'>{errors.nombre}</span>}
       </FormGroup>
                <Form.Group as={Col} controlId="cargo">
                  <Form.Label>* Cargo:</Form.Label>
                  <Form.Control name="cargo" type="text" id="cargo" placeholder="Gerente Comercial" onChange={this.handleChange} />{errors.cargo.length > 0 &&
                    <span className='error'>{errors.cargo}</span>}
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="cumple">
                  <Form.Label><FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de Cumpleaños:</Form.Label>
                  <Form.Control type="date" name="cumple"id="cumple" placeholder=" / / " onChange={this.handleChange}/>{errors.cumple.length > 0 &&
                    <span className='error'>{errors.cumple}</span>}
                </Form.Group>
              
                
              <Form.Group as={Col} controlId="correo">
                <Form.Label>*&nbsp;<FontAwesomeIcon icon={['fas', 'envelope']} />&nbsp;Correo:</Form.Label>
                <Form.Control type="email" id="correo" name="correo" placeholder="ejemplo@ejemplo.com"onChange={this.handleChange} />
                {errors.correo.length > 0 &&
                    <span className='error'>{errors.correo}</span>}</Form.Group>
              </Form.Row>

              
              

            <Form.Row>
              <Form.Group as={Col} controlId="telefono" name="telefono">
                <Form.Label><FontAwesomeIcon icon={['fas', 'phone-alt']} />&nbsp;Telefono:</Form.Label>
                <Form.Control  name="telefono"type="text" id="telefono" placeholder="223 3333"onChange={this.handleChange} />{errors.telefono.length > 0 &&
                    <span className='error'>{errors.telefono}</span>}
              </Form.Group>
             
              <Form.Group as={Col} controlId="celular">
                <Form.Label>*&nbsp;<FontAwesomeIcon icon={['fas', 'mobile-alt']} />&nbsp;Celular:</Form.Label>
                <Form.Control type="text" id="celular" name="celular"placeholder="442 434 7652" onChange={this.handleChange} />
                {errors.celular.length > 0 &&
                    <span className='error'>{errors.celular}</span>}</Form.Group>
              </Form.Row>
              
              <Form.Row>
                  <Col md="6" align="left">
                    <Link to='/admin/ViewDonors'>
                      <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Regresar</Button>
                    </Link>
                  </Col>
                  <Col md="6" align="right">
                  <Button onClick={this.onSubmit} type="submit">Registrar</Button>
                  </Col>
                </Form.Row>
              
          
          </Form>
         
            </div>
            </CardBody>
         </Card>
            </div>
            </div>


        );
    }
}
 
export default RegistroContactoDonante;