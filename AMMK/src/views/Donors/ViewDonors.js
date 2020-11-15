import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Row, Table, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText, Modal} from 'reactstrap';
//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


import ViewEmployeeTable from "components/Employees/ViewEmployeeTable.js";

// reactstrap components


import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import { func } from "prop-types";

//Importing Icon library

var respuesta = "";
function setValorId(params) {
    console.log('Hola');
}

var status=1;
class  ViewDonors extends Component {
   
   
    crearTabla(){
       
            axios.get("http://localhost:8000/api/donors/table/all")
            .then(function (resp){
              respuesta = respuesta.concat(resp.data);
              document.getElementById("tablaD").innerHTML = respuesta;
            } );
        
           
        
        
      } 
      //filtro Activos e Inactivos
      sortByStatus(){
        var status = document.getElementById('statusSelect').value;
        var numStatus;
        if (status === "Activos"){
         numStatus=1;
        }else if (status ==="Inactivos"){
         numStatus=2;
        }
        if(numStatus==1){
            axios.get("http://localhost:8000/api/donors/table/all")
            .then(function (resp){
              respuesta = resp.data;
              document.getElementById("tablaD").innerHTML = respuesta;
            } );
        }else if(numStatus==2){
            axios.get("http://localhost:8000/api/donors/tableI/all")
            .then(function (resp){
              respuesta = resp.data;
              document.getElementById("tablaD").innerHTML = respuesta;
            } );
        }
       
         
       }
      
      //Busqueda tipo de donante
      sortByTipo(){
        var tipo = document.getElementById('tipoSelect').value;
        var numTipo;
        if (tipo === "Particular"){
         numTipo=1;
        }else if (tipo ==="Patronato"){
         numTipo=2;
        }else if (tipo ==="Gobierno"){
         numTipo=3;
        }else if (tipo ==="Empresa"){
            numTipo=4;
        }else if (tipo ==="Fundación"){
            numTipo=5;
        }
       
         axios.get("http://localhost:8000/api/donors/table/tipoDonante/"+numTipo)
           .then(function (resp){
             respuesta = resp.data;
             document.getElementById("tablaD").innerHTML = respuesta;
           } );
       }
       //busqueda por el input
       searchDonor(){
        var palabra = document.getElementById('buscar').value;
        if(palabra == ""){
          palabra = "allOfEm";
        }
        axios.get("http://localhost:8000/api/donors/table/buscar/"+palabra)
          .then(function (resp){
            respuesta = resp.data;
            document.getElementById("tablaD").innerHTML = respuesta;
          } );
        }
      //sort where id sea igual al id que le mando
      /*sortStatus(){

         status= document.getElementById("selectStatus").value;
        
        if(status==1){
            axios.get("http://localhost:8000/api/donors/table/all")
            .then(function (resp){
              respuesta = respuesta.concat(resp.data);
              document.getElementById("tablaD").innerHTML = respuesta;
            } );
        }else if(status==2){
            axios.get("http://localhost:8000/api/donors/table/all/inactive")
            .then(function (resp){
              respuesta = respuesta.concat(resp.data);
              document.getElementById("tablaD").innerHTML = respuesta;
            } );
        }
      }
      */
      
      
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
          this.crearTabla();
          
        return ( 

<div className="content">
                <h1 className="title">DONANTES</h1>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label for="statusSelect">Estatus</Label>
                            <Input type="select" name="select"id="statusSelect"  onChange={this.sortByStatus} >
                            <option valaue={1}>Activos</option>
                            <option valaue={2}>Inactivos</option>
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
                                <Input placeholder="Maria Sandoval"  id="buscar" onInput={this.searchDonor} />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col md="4">
                        <FormGroup>
                            <Label for="tipoSelect" >Filtrar por Tipo:</Label>
                            <Input type="select" name="select" id="tipoSelect" onChange={this.sortByTipo}>
                            <option disabled selected>Tipo de Donante...</option>
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
              <Table hover id="tablaD">
              
              </Table>
            </Col>
               
            </div>

         );
    }
}



 
export default ViewDonors ;
