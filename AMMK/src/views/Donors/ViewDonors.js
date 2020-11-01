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


class  ViewDonors extends Component {
   
   
    crearTabla(){
        var tabla='<thead> <tr> <th> Nombre </th> <th> Username </th> <th> Rol </th> <th> Acciones </th> </tr> </thead> <tbody>';
        const num=1;
        axios.get("http://localhost:8000/api/donors/table/all")
          .then(function (resp){
            respuesta = respuesta.concat(resp.data);
            document.getElementById("tablaD").innerHTML = respuesta;
          } );
      }    
      
      
      
      render() { 
          this.crearTabla();
        return ( 

<div className="content">
                <h1 className="title">DONANTES</h1>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <Label for="statusSelect">Estatus</Label>
                            <Input type="select">
                            <option> Estatus...</option>
                            <option >Activos</option>
                            <option>Inactivos</option>
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
                                <InputGroupText><FontAwesomeIcon icon={['fas', 'search']} /></InputGroupText>
                                </InputGroupAddon>
                                <Input />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col md="4">
                        <FormGroup>
                            <Label>Filtrar por Tipo:</Label>
                            <Input type="select">
                            <option>Tipo de Donante...</option>
                            <option>Particular</option>
                            <option >Patronato</option>
                            <option>Gobierno</option>
                            <option>Empresa</option>
                            <option>Fundación</option>


                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
               
               
            </div>

         );
    }
}
 
export default ViewDonors ;