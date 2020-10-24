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
      sel = sel.concat('<option value="'+ element.id + ' " > '+ element.nombre+'</option>');
      //console.log(element.nombre);
    });
    document.getElementById("selectRecurrencia").innerHTML=sel; 
  });
  }
  //POST DONANTE

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
}



onSubmit(e) {
  e.preventDefault()
  var tipoDonante=document.getElementById("selectTipoDonante").value;
  var recurrencia= document.getElementById("selectRecurrencia").value;

  const donantePatronato={
    idRecurrencia: recurrencia,
    idTipoDonante: tipoDonante,
    
  }
localStorage.setItem("generales", JSON.stringify(donantePatronato));

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
       <Form onSubmit={this.onSubmit}>
        <FormGroup>
         <label>*Seleccione Tipo de Donante:</label>
         <Form.Control as="select" id="selectTipoDonante" required></Form.Control>
       </FormGroup>
       <FormGroup>
         <label>*Seleccione Recurrencia de Donante:</label>
         <Form.Control as="select" id="selectRecurrencia" required></Form.Control>
        </FormGroup>
       <Col align="right">
            <a href="/admin/RegistroDonante1">
            <Button  type="submit">BD&nbsp;</Button>

                    <Button className="btn btn-outline-primary" onClick={() => { this.handleClick() }}>Siguiente</Button>
                  </a>
                  </Col> 
                  </Form>
        </div>
      </div>
    );
  }
}

export default GeneralDonantes;
