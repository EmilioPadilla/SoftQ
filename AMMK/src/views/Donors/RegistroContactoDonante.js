import React, { Component } from "react";

import { Row, Modal, Form, FormGroup,  Dropdown,Button, Col } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2';

class RegistroContactoDonante extends Component {
    
    constructor(props){
        super(props)
      this.onSubmit= this.onSubmit.bind(this);
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

      

        axios.post('http://localhost:8000/api/contactoDonante', jsonArray).then(res => {console.log(res)});
        
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
          <h1 className="title">Registrar Contacto</h1>
            <div class="container">
            <Form onSubmit={this.onSubmit}>
              
            <Form.Row>
              <FormGroup as={Row}>
              <Form.Label>Nombre del Contacto:</Form.Label>
         <Form.Control id="nombre" placeholder="Maria Sandoval" ></Form.Control>
       </FormGroup>

       </Form.Row>
              
       <Form.Row>
                <Form.Group as={Row} controlId="cargo">
                  <Form.Label>Cargo:</Form.Label>
                  <Form.Control type="text" id="cargo" placeholder="Gerente Comercial" />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Row} controlId="cumple">
                  <Form.Label>Fecha de Cumpleaños:</Form.Label>
                  <Form.Control type="date" id="cumple" placeholder=" / / " />
                </Form.Group>
              
                </Form.Row>
                
               
              
              

            <Form.Row>
              <Form.Group as={Row} controlId="telefono">
                <Form.Label>Telefono:</Form.Label>
                <Form.Control type="text" id="telefono" placeholder="223 3333" />
              </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group as={Row} controlId="celular">
                <Form.Label>Celular:</Form.Label>
                <Form.Control type="text" id="celular" placeholder="442 434 7652" />
              </Form.Group>
              </Form.Row>
              <Form.Row>
              <Form.Group as={Row} controlId="correo">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="email" id="correo" placeholder="ejemplo@ejemplo.com" />
              </Form.Group>
              </Form.Row>

              <Col align="left">

              <Button type="submit">Registrar</Button>


          </Col>
          
          </Form>
         
            </div>
            </div>
            </div>


        );
    }
}
 
export default RegistroContactoDonante;