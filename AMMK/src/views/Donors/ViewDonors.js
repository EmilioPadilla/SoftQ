import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Row, Table, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText, Modal } from 'reactstrap';
//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';


var respuesta = "";
function setValorId(params) {
  console.log('Hola');
}
var numTipo=0;
var numStatus=1;
class ViewDonors extends Component {


  crearTabla() {

    axios.get(API_BASE_URL+"donors/table/all/"+localStorage.getItem("numS")+"/"+localStorage.getItem("tipo"))
    .then(function (resp) {
      respuesta = resp.data;
      document.getElementById("tablaD").innerHTML = respuesta;
    });




  }
  componentDidMount(){
    localStorage.setItem("numS",numStatus);
    localStorage.setItem("tipo",numTipo);

  }

  //Busqueda tipo de donante
  sortD() {
    var tipo = document.getElementById('tipoSelect').value;
    var status = document.getElementById('statusSelect').value;
    if (status === "Activos") {
      numStatus = 1;
    } else if (status === "Inactivos") {
      numStatus = 2;
    }else if(status === "Selecciona estatus donante..."){
      numStatus = 1;

    }
    localStorage.setItem("numS",numStatus);

  if(tipo === "Seleccione una opción..."){
    numTipo=0;
  }else if (tipo === "Particular") {
      numTipo = 1;
    } else if (tipo === "Patronato") {
      numTipo = 2;
    } else if (tipo === "Gobierno") {
      numTipo = 3;
    } else if (tipo === "Empresa") {
      numTipo = 4;
    } else if (tipo === "Fundación") {
      numTipo = 5;
    }
    localStorage.setItem("tipo",numTipo);
      axios.get(API_BASE_URL+"donors/table/all/"+localStorage.getItem("numS")+"/"+localStorage.getItem("tipo"))
        .then(function (resp) {
          respuesta = resp.data;
          document.getElementById("tablaD").innerHTML = respuesta;
        });
    
  }



  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
        if (!login ) {
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
    }
    this.crearTabla();

    return (
      <div className="content">
        <h1 className="title">DONANTES</h1>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="statusSelect">Filtrar por estatus:</Label>
              <Input type="select" name="select" id="statusSelect" onChange={this.sortD} >
              <option valaue={1}>Selecciona estatus donante...</option>
                <option valaue={2}>Activos</option>
                <option valaue={3}>Inactivos</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <Link to='/admin/GeneralRegistroD'>
              <Button className="btn btn-primary float-right"><FontAwesomeIcon icon={['fas', 'user-plus']} /> Registrar Donante</Button>
            </Link>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col md="8">
            <FormGroup>
              <Label>Búsqueda por nombre:</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id="buscarDonante"><FontAwesomeIcon icon={['fas', 'search']} /></InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Maria Sandoval Arrieta" id="buscar" onInput={this.searchDonor} />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <Label for="tipoSelect" >Filtrar por tipo de donante:</Label>
              <Input type="select" name="select" id="tipoSelect" onChange={this.sortD}>
                <option valaue={0}>Seleccione una opción...</option>
                <option valaue={1}>Particular</option>
                <option valaue={2}>Patronato</option>
                <option valaue={3}>Gobierno</option>
                <option valaue={4}>Empresa</option>
                <option valaue={5}>Fundación</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Col md="12">
        <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
          <Table  id="tablaD">
          </Table>
          </div>
        </Col>
      </div>
    );
  }
}
export default ViewDonors;
