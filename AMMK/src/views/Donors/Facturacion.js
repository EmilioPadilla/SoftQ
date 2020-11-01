import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import axios from 'axios';
import { convertCompilerOptionsFromJson, parseConfigFileTextToJson } from "typescript";

class Facturacion extends Component {

  constructor(props){
    super(props)

  this.onSubmit= this.onSubmit.bind(this);
  
 
}

onSubmit(e){

  e.preventDefault()
//agarrrar los valores con el id del forms
  var rsF = document.getElementById("razonSocialF").value;
  var  rfcF= document.getElementById("RFCF").value;
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

//nombre + F de facturacion
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
 var jsonArray3=  JSON.parse(localStorage.getItem("facturacion"));

const jsonArray= {...jsonArray0,...jsonArray1,...jsonArray2,...jsonArray3};
console.log(jsonArray0);
localStorage.clear();

  axios.post('http://localhost:8000/api/donantes/', jsonArray).then(res => {console.log(res)});
  
 //validacion

 Swal.fire(
  '¡Listo!',
  'Datos guardados',
  'success'
  ).then(function() {
      window.location = "http://localhost:3000/admin/ViewDonors";
  });
  


}
  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>

          <h3 align="center">Datos de Facturación</h3>

          <ProgressBar now={100} />
          <br />
          <div class="container"></div>
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Row} controlId="razonSocialF">
                <Form.Label>Razón Social:</Form.Label>
                
                <Form.Control type="text" placeholder="Ejemplo S.A.S" />
              </Form.Group>

              <Form.Group as={Row} controlId="RFCF">
                <Form.Label>RFC:</Form.Label>
                <Form.Control type="text" placeholder="VECJ880326 XXX" />
              </Form.Group>
            </Form.Row>

            <br />

            <Card>
              <Card.Header>Dirección: </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Row>
                    <Form.Group as={Row} controlId="calleFacturacion">
                      <Form.Label>Calle</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group controlId="noIFacturacion">
                      <Form.Label># Interior</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group controlId="noEFacturacion">
                      <Form.Label># Exterior </Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group controlId="cpFacturacion">
                      <Form.Label>C.P. </Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Row} controlId="coloniaFacturacion">
                      <Form.Label>Colonia</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group as={Row} controlId="ciudadFacturacion">
                      <Form.Label>Ciudad:</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Row} controlId="municipioFacturacion">
                      <Form.Label>Municipio</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group as={Row} controlId="estadoFacturacion">
                      <Form.Label>Estado:</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group as={Row} controlId="paisFacturacion">
                      <Form.Label>País:</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Form.Row>
                </Card.Text>
              </Card.Body>
            </Card>

            <Form.Row>
              <Form.Group as={Row} controlId="correoFacturacion">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@ejemplo.com" />
              </Form.Group>
            </Form.Row>
            <Form.Row></Form.Row>
          <Form.Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/RegistroDonante1'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">

                    <Button type="submit">Registrar</Button>
                    </Col>
                </Form.Row>
                </Form>

        </div>
      </div>
    );
  }
}

export default Facturacion;
