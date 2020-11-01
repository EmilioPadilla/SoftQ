import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import axios from 'axios';
import Index from "@material-ui/core/styles/zIndex";
//import Swal from 'sweetalert2';
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
class RDonantesPatronato extends Component {

  
  constructor(props){
    super(props)
    this.state={
      fullname:null,
      birthday:null,
      rfc:null,
      email:null,
      telefono:null,
      celular:null,

      errors:{
        fullname:'',
        birthday:'',
        rfc:'',
        email:'',
        telefono:'',
        celular:'',
      }

    };
   
   

  this.onSubmit= this.onSubmit.bind(this);
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



    const donantePatronato = {
     // nombreCompleto1: x,
      fechaCumpleaños1: y,
      RFC1: z,
      correo1: c,
      telefono1: t,
      celular1: cel,
    
    };
    
    localStorage.setItem("patronato", JSON.stringify(donantePatronato));

    //axios.post('http://localhost:8000/api/donantes/', donantePatronato).then(res => {console.log(res.data)});
    //Swal.fire(
    //  'Good job!',
    //  'Pokemon Added Successfully',
    //  'success'
   // )
   this.setState({nombreCompleto1: ''})

  }
  
  
    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
    
      switch (name) {
        case 'fullname': 
          errors.fullname = 
            value.length < 8
              ? 'Recuerde que debe ingresar nombre completo'
              : '';
          break;
          case 'rfc': 
          errors.rfc = 
            value.length < 12
              ? 'El RFC debe de tener al menos 12 caracteres'
              : '';
          break;
        case 'email': 
          errors.email = 
            validEmailRegex.test(value)
              ? ''
              : 'El correo no es valido';
          break;
        case 'telefono': 
          errors.telefono = 
            value.length < 9
              ? 'El telefono debe de contener 8 digitos'
              : '';
          break;
          case 'celular': 
          errors.celular = 
            value.length < 11
              ? 'El celular debe de contener 10 digitos'
              : '';
          break;
        default:
          break;
      }
      this.setState({errors, [name]: value});

     
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
    
    const {errors} = this.state;

    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          
           <h3 align="center">(Particular/Patronato)</h3>
           <ProgressBar now={50} />

                  <br/>
          <div class="container"></div>
          <Form onClick={this.onSubmit}>
         

          <div className='fullname'>
          
         
          
            <Form.Row>
              <Form.Group as={Row} controlId="namePatronato">
                <Form.Label>Nombre Completo:</Form.Label>
                <Form.Control
                  type="text" name='fullname'
                  placeholder="Maria Sandoval Arrieto" onChange={this.handleChange} 
                /> 
                {errors.fullname.length > 0 && 
               <span className='error'>{errors.fullname}</span>}
              </Form.Group>
             
            </Form.Row>
            </div>
           
            <Form.Row>
              <Form.Group as={Row} controlId="birthdayPatronato">
                <Form.Label>Fecha de Cumpleaños:</Form.Label>
                <Form.Control type="date" placeholder=" / / " noValidate/>
              </Form.Group>
            </Form.Row>
           
            <div className='birthday'>
            <Form.Row>
              <Form.Group as={Row} controlId="RFCPatronato">
                <Form.Label>RFC:</Form.Label>
                <Form.Control type="text" placeholder="VECJ880326 XXX"  />
              </Form.Group>
            </Form.Row>
            </div>

            <div className='email'>
            <Form.Row>
              <Form.Group as={Row} controlId="emailPatronato">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@ejemplo.com" />
              </Form.Group>
            </Form.Row>
            </div>

            <div className=''>
            <Form.Row>
            <Form.Group as={Row} controlId="telefonoPatronato">
                <Form.Label>Telefono:</Form.Label>
                <Form.Control type="text" placeholder="234 3344" />
              </Form.Group>
              </Form.Row>
              &nbsp;&nbsp;&nbsp;
              </div>
              <Form.Group as={Row} controlId="celularPatronato">
                <Form.Label>Celular:</Form.Label>
                <Form.Control type="text" placeholder="442 343 3233" />
              </Form.Group>
              
           
            <Form.Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/GeneralRegistroD'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">

                    <Link to='/admin/RegistroDonante2'>
                    <Button onClick="onSubmit()">Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>
                    </Link>
                    </Col>
                </Form.Row>
          </Form>
          
        </div>
      </div>
    );
  }
}

export default RDonantesPatronato;
