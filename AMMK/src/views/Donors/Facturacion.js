import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';

//COMPONENTS
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Col";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Alert, Progress, CardHeader, CardBody, Label } from "reactstrap";

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

//API
import axios from 'axios';

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validRFC = RegExp(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$/);
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/); //Solo letras al menos 3 caracteres
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+$/); //acepta numeros y letras y saltos de linea
const validPostalCode = RegExp(/^([0-9]{5})([\-]{1}[0-9]{4})?$/);

class Facturacion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      RazonSocial: null,
      RFC: null,
      calle: null,
      noInterior: null,
      noExterior: null,
      codigoPostal: null,
      colonia: null,
      ciudad: null,
      municipio: null,
      estado: null,
      pais: null,
      correo: null,
      errors: {
        RazonSocial: '',
        RFC: '',
        calle: '',
        noInterior: '',
        noExterior: '',
        codigoPostal: '',
        colonia: '',
        ciudad: '',
        municipio: '',
        estado: '',
        pais: '',
        correo: '',
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(e) {

    e.preventDefault()
    //agarrrar los valores con el id del forms
    var rsF = document.getElementById("razonSocialF").value;
    var rfcF = document.getElementById("RFCF").value;
    var calleF = document.getElementById("calleFacturacion").value;
    var noIF = document.getElementById("noIFacturacion").value;
    var noEF = document.getElementById("noEFacturacion").value;
    var cpF = document.getElementById("cpFacturacion").value;
    var colF = document.getElementById("coloniaFacturacion").value;
    var ciudadF = document.getElementById("ciudadFacturacion").value;
    var muniF = document.getElementById("municipioFacturacion").value;
    var estadoF = document.getElementById("estadoFacturacion").value;
    var paisFact = document.getElementById("paisFacturacion").value;
    var correoFact = document.getElementById("correoFacturacion").value;

    if (rsF === '' || rfcF === '' || calleF === '' || noEF === '' || cpF === '' || colF === '' || ciudadF === '' || muniF === '' || paisFact === '' || estadoF === '' || correoFact === '') {
      Swal.fire({
        icon: 'error',
        title: '¡ERROR!',
        text: 'Verifica que todos los campos obligatorios estén completos.',
      })
    } else {
      const donantePatronato = {
        RazonSocial: rsF,
        RFC: rfcF,
        calle: calleF,
        noInterior: noIF,
        noExterior: noEF,
        codigoPostal: cpF,
        colonia: colF,
        ciudad: ciudadF,
        municipio: muniF,
        estado: estadoF,
        pais: paisFact,
        correo: correoFact,
      };
      localStorage.setItem("facturacion", JSON.stringify(donantePatronato));
      var jsonArray0 = JSON.parse(localStorage.getItem("tipoDonante2"));
      var jsonArray1 = JSON.parse(localStorage.getItem("recurrencia"));
      var jsonArray2 = JSON.parse(localStorage.getItem("patronato"));
      var jsonArray3 = JSON.parse(localStorage.getItem("facturacion"));

      const jsonArray = { ...jsonArray0, ...jsonArray1, ...jsonArray2, ...jsonArray3 };
      console.log(jsonArray0);
      localStorage.clear();

      axios.post('http://localhost:8000/api/donantes/', jsonArray).then(res => { console.log(res) });

      //validacion
      Swal.fire(
        '¡Listo!',
        'Datos guardados',
        'success'
      ).then(function () {
        window.location = "http://localhost:3000/admin/ViewDonors";
      });
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'RazonSocial':
        errors.RazonSocial =
          value.length < 8
            ? ''
            : '';
        break;
      case 'RFC':
        errors.RFC =
          validRFC.test(value)
            ? ''
            : 'El RFC no es válido.';
        break;
      case 'calle':
        errors.calle =
          validTextInput.test(value)
            ? ''
            : 'El campo solo permite letras.';
        break;
      case 'noInterior':
        errors.noInterior =
          validAlphanumericInput.test(value)
            ? ''
            : 'El campo solo permite letras y números.';
        break;
      case 'noExterior':
        errors.noExterior =
          validAlphanumericInput.test(value)
            ? ''
            : 'El campo solo permite letras y números.';
        break;
      case 'codigoPostal':
        errors.codigoPostal =
          validPostalCode.test(value)
            ? ''
            : 'El código postal ingresado no es válido.';
        break;
      case 'colonia':
        errors.colonia =
          validTextInput.test(value)
            ? ''
            : 'El campo solo permite letras.';
        break;
      case 'ciudad':
        errors.ciudad =
          validTextInput.test(value)
            ? ''
            : 'El campo solo permite letras.';
        break;
      case 'municipio':
        errors.municipio =
          validTextInput.test(value)
            ? ''
            : 'El campo solo permite letras.';
        break;
      case 'estado':
        errors.estado =
          validTextInput.test(value)
            ? ''
            : 'El campo solo permite letras.';
        break;
      case 'pais':
        errors.pais =
          validTextInput.test(value)
            ? ''
            : 'El campo solo permite letras.';
        break;
      case 'correo':
        errors.correo =
          validEmailRegex.test(value)
            ? ''
            : 'El correo no es válido.';
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
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    /*if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }*/
    const { errors } = this.state;

    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          <Card>
            <CardHeader>
              <h3 align="center" className="title">Datos de Facturación</h3>
              <Progress striped color="primary" value="100"></Progress>
              <br></br>
              <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
              <br />
            </CardHeader>
            <CardBody>
              <div class="container"></div>
              <Form onSubmit={this.onSubmit}>
                <Form.Row>
                  <Form.Group as={Row} controlId="razonSocialF">
                    <Form.Label>* Razón social:</Form.Label>
                    <Form.Control type="text" name='RazonSocial' placeholder="Ejemplo S.A.S" onChange={this.handleChange} />{errors.RazonSocial.length > 0 &&
                      <span className='error'>{errors.RazonSocial}</span>}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Row} controlId="RFCF">
                    <Form.Label>* RFC:</Form.Label>
                    <Form.Control name='RFC' type="text" placeholder="AAHA950104DFE" onChange={this.handleChange} />
                    {errors.RFC.length > 0 &&
                      <span className='error'>{errors.RFC}</span>}
                  </Form.Group>
                </Form.Row>

                <Label><FontAwesomeIcon icon={['fas', 'directions']} />&nbsp;Dirección:</Label>
                <Form.Row>
                  <Form.Group as={Row} controlId="calleFacturacion">
                    <Form.Label>* Calle:</Form.Label>
                    <Form.Control type="text" name='calle' placeholder="Boulevard de la nación" onChange={this.handleChange} />{errors.calle.length > 0 &&
                      <span className='error'>{errors.calle}</span>}
                  </Form.Group>

                  <Form.Group controlId="noIFacturacion">
                    <Form.Label>No. interior:</Form.Label>
                    <Form.Control type="text" name='noInterior' placeholder="135-A" onChange={this.handleChange} />{errors.noInterior.length > 0 &&
                      <span className='error'>{errors.noInterior}</span>}
                  </Form.Group>

                  <Form.Group controlId="noEFacturacion">
                    <Form.Label>* No. exterior:</Form.Label>
                    <Form.Control type="text" name='noExterior' placeholder="213" onChange={this.handleChange} />{errors.noExterior.length > 0 &&
                      <span className='error'>{errors.noExterior}</span>}
                  </Form.Group>

                  <Form.Group controlId="cpFacturacion">
                    <Form.Label>* C.P.</Form.Label>
                    <Form.Control type="text" name='codigoPostal' placeholder="76803" onChange={this.handleChange} />{errors.codigoPostal.length > 0 &&
                      <span className='error'>{errors.codigoPostal}</span>}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Row} controlId="coloniaFacturacion">
                    <Form.Label>* Colonia:</Form.Label>
                    <Form.Control type="text" name='colonia' placeholder="Bosques de San Juan" onChange={this.handleChange} />{errors.colonia.length > 0 &&
                      <span className='error'>{errors.colonia}</span>}
                  </Form.Group>

                  <Form.Group as={Row} controlId="ciudadFacturacion">
                    <Form.Label>* Ciudad:</Form.Label>
                    <Form.Control type="text" name='ciudad' placeholder="San Juan del Río" onChange={this.handleChange} />{errors.ciudad.length > 0 &&
                      <span className='error'>{errors.ciudad}</span>}
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Row} controlId="municipioFacturacion">
                    <Form.Label>* Municipio:</Form.Label>
                    <Form.Control type="text" name='municipio' placeholder="Querétaro" onChange={this.handleChange} />{errors.municipio.length > 0 &&
                      <span className='error'>{errors.municipio}</span>}
                  </Form.Group>

                  <Form.Group as={Row} controlId="estadoFacturacion">
                    <Form.Label>* Estado:</Form.Label>
                    <Form.Control type="text" name='estado' placeholder="Querétaro" onChange={this.handleChange} />{errors.estado.length > 0 &&
                      <span className='error'>{errors.estado}</span>}
                  </Form.Group>

                  <Form.Group as={Row} controlId="paisFacturacion">
                    <Form.Label>* País:</Form.Label>
                    <Form.Control type="text" name='pais' placeholder="México" onChange={this.handleChange} />{errors.pais.length > 0 &&
                      <span className='error'>{errors.pais}</span>}
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Row} controlId="correoFacturacion">
                    <Form.Label>*&nbsp;<FontAwesomeIcon icon={['fas', 'envelope']} />&nbsp;Correo:</Form.Label>
                    <Form.Control name='correo' type="text" placeholder="mariaSandoval@ejemplo.com" />
                    {errors.correo.length > 0 && <span className='error'>{errors.correo}</span>}
                  </Form.Group>
                </Form.Row>
                <Form.Row></Form.Row>
                <Form.Row>
                  <Col md="6" align="left">
                    <Link to='/admin/RegistroDonante1'>
                      <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Anterior</Button>
                    </Link>
                  </Col>
                  <Col md="6" align="right">
                    <Button type="submit">Registrar</Button>
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
export default Facturacion;
