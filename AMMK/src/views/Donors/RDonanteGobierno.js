import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import axios from 'axios';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RDonanteGobierno extends Component {

  constructor(props){
    super(props)

 

  this.onSubmit= this.onSubmit.bind(this);
  
 
}

 

  onSubmit(e){

    e.preventDefault()
//agarrrar los valores
    var rs = document.getElementById("rs2").value;
    var n2 = document.getElementById("nombre2").value;
    var calle = document.getElementById("calleDonante").value;
    var noI2 = document.getElementById("donanteInterior").value;
    var noE2= document.getElementById("donanteExterior").value;
    var cp2 = document.getElementById("donanteCP").value;
    var co2 = document.getElementById("donanteColonia").value;
    var co2 = document.getElementById("donanteCiudad").value;


    const donantePatronato = {
      RazonSocial2: rs,
      Nombre2: n2,
      calle2: calle,
      noInterior2: noI2,
      noExterior2: noE2,
      codigoPostal2: cp2,
      colonia2: co2,
    
    };

    localStorage.setItem("step2", JSON.stringify(donantePatronato));
    //axios.post('http://localhost:8000/api/donantes/', donantePatronato).then(res => {console.log(res.data)});
    //Swal.fire(
    //  'Good job!',
    //  'Pokemon Added Successfully',
    //  'success'
   // )
   this.setState({nombreCompleto1: ''})

  }

  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          
           <h3 align="center">(Gobierno/Empresas/Fundaciones)</h3>
        
          <ProgressBar now={30} />
                  <br/>
          <div class="container"></div>
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Row} controlId="rs2">
                <Form.Label>Nombre de la empresa/asociación/fundación:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fundación Merced"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Row} controlId="nombre2">
                <Form.Label>Nombre del contacto de empresa/asociación/fundación:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Maria Sandoval Goméz"
                />
              </Form.Group>
            </Form.Row>
            
            <br />

            <Card>
  <Card.Header>Dirección: </Card.Header>
  <Card.Body>
    <Card.Text>
    <Form.Row>
    <Form.Group as={Row} controlId="calleDonante">
      <Form.Label>Calle</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group   controlId="donanteInterior">
      <Form.Label># Interior</Form.Label>
      <Form.Control />

    </Form.Group>

    <Form.Group   controlId="donanteExterior">
      <Form.Label># Exterior </Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group  controlId="donanteCP">
      <Form.Label>C.P. </Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Row} controlId="donanteColonia">
      <Form.Label>Colonia</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Row}  controlId="donanteCiudad">
      <Form.Label>Ciudad:</Form.Label>
      <Form.Control />

    </Form.Group>

    
  </Form.Row>
     </Card.Text>
    
  </Card.Body>
</Card>
      
  <br />
             
          
          <Form.Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/RegistroDonante1'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Button type="submit" >BD&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>

                    <Link to='/admin/Facturacion'>
                    <Button >Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>
                    </Link>
                    </Col>
                </Form.Row> 
                </Form>
        </div>
      </div>
    );
  }
}

export default RDonanteGobierno;


