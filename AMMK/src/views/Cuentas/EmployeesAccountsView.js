import React from "react";


import { Link } from "react-router-dom";
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';


import ViewEmployeeTable from "components/Employees/ViewEmployeeTable.js";

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Row,
  Col,
  Progress,
  CustomInput,
  Label,
  Table,
  InputGroup,
  InputGroupText,
  InputGroupAddon
} from "reactstrap";

import {FormGroup, Form} from "react-bootstrap"
import TableEmpAccounts from "components/Cuentas/TableEmpAccounts"
import axios from 'axios';
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom';
import { func } from "prop-types";


var respuesta = "";
function setValorId(params) {
    console.log('Hola');
}
class EmployeesAccountView extends React.Component {

   idEmpleado = 1;
  constructor(props) {
    super(props)
    // Setting up functions
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault()
    console.log("Hola");
    Swal.fire(
      '¡Listo!',
      'Datos guardados',
      'success'
      )
  }


  

  crearTabla(){
    axios.get("http://localhost:8000/api/account/table/all")
      .then(function (resp){
        respuesta = respuesta.concat(resp.data);
        document.getElementById("tablaCE").innerHTML = respuesta;
      } );
  }

  searchBar(){
    var palabra = document.getElementById('busq').value;
    if(palabra == ""){
      palabra = "allOfEm";
    }
    axios.get("http://localhost:8000/api/account/table/search/"+palabra)
      .then(function (resp){
        respuesta = resp.data;
        document.getElementById("tablaCE").innerHTML = respuesta;
      } );
    }
  

  sortByRole(){
   var rol = document.getElementById('roleSelect').value;
   var numRol;
   if (rol === "Empleado General"){
    numRol=1;
   }else if (rol ==="Enfermera"){
    numRol=2;
   }else{
    numRol=3;
   }
  
    axios.get("http://localhost:8000/api/account/table/roles/"+numRol)
      .then(function (resp){
        respuesta = resp.data;
        document.getElementById("tablaCE").innerHTML = respuesta;
      } );
  }



  render() {
    /*const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
      window.location = "http://localhost:3000/login";
    }else if(idRol==2){
      window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
      window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }*/


    this.crearTabla();
    return (
        <div className="content">
          <h1 className="title">CUENTAS DE EMPLEADOS</h1>
        <Row>
          <Col>
            <FormGroup>
            <label>Búsqueda por nombre:</label>
             <InputGroup>
                 <InputGroupAddon addonType="prepend">
                   <InputGroupText id="busqNombre" >
                     <FontAwesomeIcon icon={['fas', 'search']} />
                   </InputGroupText>
                 </InputGroupAddon>
                 <Input placeholder="Juan Artal González"  id="busq" onInput={this.searchBar}/>
             </InputGroup>      
           </FormGroup>
         </Col>
         <Col className="text-right">
              <br/>
              <a href="/admin/Cuentas/CrearCuentaEmp">
              <Button className="btn btn-primary ">
                <AccountPlusIcon/> &nbsp;
                Registrar nueva cuenta
              </Button>
              </a>
         </Col>
        </Row>
        <Row>
         <Col>
           <FormGroup>
           <Label for="roleSelect">Búsqueda por rol:</Label>
               <Input type="select" name="select" id="roleSelect" onChange={this.sortByRole}>
               <option selected >Selecciona una opción...</option>
               <option valaue={1}>Empleado General</option>
               <option valaue={2}>Enfermera</option>
               <option valaue={3}>Administrador</option>
               </Input>
           </FormGroup>
         </Col>
        </Row>
        <div >
          <Row>
            <Col md="12">
            <div class="overflow-auto" style={ { height: 400 } }>
              <Table hover id="tablaCE">
              </Table>
              </div>
            </Col>
          </Row>
        </div>
        </div>
  
    );
  }
}
export default EmployeesAccountView;
