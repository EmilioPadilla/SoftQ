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
import axios from "axios";



class GeneralDonantes extends Component {

  crearSelect(){
    var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
    const num=1;
    axios.get("http://localhost:8000/api/Tipodonante/").then(function(resp){
      
    console.log(resp.data);
    resp.data.forEach(element =>{
      sel = sel.concat('<option value="'+ element.id + ' " > '+ element.nombre+'</option>');
      console.log(element.nombre);
    });
    document.getElementById("selectTipoDonante").innerHTML=sel; 
  });
  }

  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          
           <h3 align="center">Datos Generales</h3>
        
          <ProgressBar now={10} />
                  <br/>
          <div class="container"></div>
       
       <FormGroup>
         <label>Seleccione Tipo de Donante:</label>
         <Form.Control as="select" id="selectTipoDonante">



         </Form.Control>
       </FormGroup>
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

export default GeneralDonantes;
