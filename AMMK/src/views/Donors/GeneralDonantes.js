import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';

import axios from "axios";
import { Switch } from "@material-ui/core";



class GeneralDonantes extends Component {

  /***TIPO DE DONANTE */
  //-> Dropdowm
  crearSelectTipoDonante(){
    var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
    const num=1;
    axios.get("http://localhost:8000/api/tipodonante/").then(function(resp){
      
    console.log(resp.data);
    resp.data.forEach(element =>{
      sel = sel.concat('<option value="'+ element.id + ' " > '+ element.nombre+'</option>');
      //console.log(element.nombre);
    });
    document.getElementById("selectTipoDonante").innerHTML=sel; 
  });
  }
  

  /***TIPO DE RECURRENCIA */
  //-> Dropdowm

  crearSelectRecurrencia(){
    var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
    const num=1;
    axios.get("http://localhost:8000/api/recurrencia/").then(function(resp){
      
    console.log(resp.data);
    resp.data.forEach(element =>{
      sel = sel.concat('<option value="'+ element.id + ' " > '+ element.nombreR+'</option>');
      //console.log(element.nombre);
    });
    document.getElementById("selectRecurrencia").innerHTML=sel; 
  });
  }
  //POST DONANTE

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);

}
//validar campos 
handleInvalidSubmit(event, errors, values) {
  this.setState({errors, values});
}

onSubmit(e) {
  e.preventDefault()
  var tipoDonante=document.getElementById("selectTipoDonante").value;
  var recurrencia= document.getElementById("selectRecurrencia").value;

  const tipoDonante2={
    idTipoDonante: tipoDonante
    
  }
  const tipoRecurrencia={
    idRecurrencia: recurrencia
    
  }
localStorage.setItem("tipoDonante2", JSON.stringify(tipoDonante2));
localStorage.setItem("recurrencia", JSON.stringify(tipoRecurrencia));

}


  render() {
    this.crearSelectTipoDonante();
    this.crearSelectRecurrencia();


    return (
      <div className="content">
        <div class="container-fluid">

          <h1 className="title">Registrar Donante</h1>
          
           <h3 align="center">Datos Generales</h3>
           <h6 align="left">Los campos señalados con (*) son obligatorios</h6>

          <ProgressBar now={10} />
                  <br/>
          <div class="container"></div>
       <Form onClick={this.onSubmit}>
        <FormGroup>
         <label>*Seleccione Tipo de Donante:</label>
         <Form.Control as="select" id="selectTipoDonante" required></Form.Control>
       </FormGroup>
       <FormGroup>
         <label>*Seleccione Recurrencia de Donante:</label>
         <Form.Control as="select" id="selectRecurrencia" required></Form.Control>
        </FormGroup>
        

       <Col align="right">
         
      <>
            
       <Link to="/admin/RegistroDonante1">
       <Button onClick="onSubmit()">Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>

       </Link>
       

       </>

      
  
                
                  </Col> 
                  </Form>

        </div>
      </div>
    );
  }
}

export default GeneralDonantes;
