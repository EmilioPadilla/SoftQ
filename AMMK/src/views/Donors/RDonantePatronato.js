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


class RDonantesPatronato extends Component {

  constructor(props){
    super(props)


 

  this.onSubmit= this.onSubmit.bind(this);
  
 
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
      nombreCompleto1: x,
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


  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          
           <h3 align="center">(Particular/Patronato)</h3>
           <ProgressBar now={50} />

                  <br/>
          <div class="container"></div>
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Row} controlId="namePatronato">
                <Form.Label>Nombre Completo:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Maria Sandoval Arrieto" 
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Row} controlId="birthdayPatronato">
                <Form.Label>Fecha de Cumpleaños:</Form.Label>
                <Form.Control type="date" placeholder=" / / "  />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Row} controlId="RFCPatronato">
                <Form.Label>RFC:</Form.Label>
                <Form.Control type="text" placeholder="VECJ880326 XXX"  />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Row} controlId="emailPatronato">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@ejemplo.com" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Row} controlId="telefonoPatronato">
                <Form.Label>Telefono:</Form.Label>
                <Form.Control type="text" placeholder="234 3344" />
              </Form.Group>
              &nbsp;&nbsp;&nbsp;

              <Form.Group as={Row} controlId="celularPatronato">
                <Form.Label>Celular:</Form.Label>
                <Form.Control type="text" placeholder="442 343 3233" />
              </Form.Group>
              
            </Form.Row>
            <Form.Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/GeneralRegistroD'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Button  type="submit">BD&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>

                    <Link to='/admin/RegistroDonante2'>
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

export default RDonantesPatronato;
