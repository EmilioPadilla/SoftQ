import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
    FormGroup,
    Input,
    Label,
  } from "reactstrap";
import Row from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";



class GeneralRegistroD extends Component {
    $selectedDonor=0;
  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          
           <h3 align="center">Datos Generales</h3>
        
          <ProgressBar now={20} />
                  <br/>
          <div class="container"></div>
          <Form>
            <Form.Row>
                <Form.Group as={Row}>
                  <Label for="tipoDonanteSelect">Tipo de Donante:</Label>
                  <Input type="select" name="select" id="tipoDonante">
                    <option selected="1">Selecciona el tipo de donante...</option>
                    <option>Particular</option>
                    <option>Empresa</option>
                    <option>Gobierno</option>
                    <option>Patronato</option>
                    <option>Fundación</option>
                  </Input>
                  <Label for="tipoDonanteSelect">Frecuencia de Donativos:</Label>
                  <Input type="select" name="select" id="tipoDonante">
                    <option selected="1">Selecciona la frecuencia de donativos...</option>
                    <option>Semanal</option>
                    <option>Quincenal</option>
                    <option>Mensual</option>
                    <option>Semestral</option>
                    <option>Otro</option>
                  </Input>
                
           
              </Form.Group>
            </Form.Row>

          
            
            <br />


      
  <br />
             
          </Form>
          <Col align="right">
            <a href="/admin/RegistroDonante1">
                    <Button className="btn btn-outline-primary" onClick={() => { this.handleClick() }}>Siguiente</Button>
                  </a>
                  </Col> 
        </div>
      </div>
    );
  }
}

export default GeneralRegistroD;