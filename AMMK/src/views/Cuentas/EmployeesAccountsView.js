import React from "react";


import { Link } from "react-router-dom";
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import LinkButton from "components/Cuentas/LinkButton";
import LinkButtonDel from "components/Cuentas/LinkButtonDel";

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

class EmployeesAccountView extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      info:[]
    }
    // Setting up functions
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault()
    Swal.fire(
      '¡Listo!',
      'Datos guardados',
      'success'
      )
  }

  componentDidMount(){
    this.crearTabla();
  }
  

  crearTabla(){
    axios.get(API_BASE_URL+"account/table/all")
      .then(resp =>{
        resp.data.forEach(element => {  
          this.setState({
            info: this.state.info.concat(element)
         });
        });
        
        document.getElementById('spnCirc').style.display = 'none';
      } );
  }

  searchBar(){
    var rol = document.getElementById('roleSelect').value;
    var numRol;
    var palabra = document.getElementById('busq').value;
    if (rol === "Empleado General"){
     numRol=1;
    }else if (rol ==="Enfermera"){
     numRol=2;
    }else if (rol === "Administrador"){
     numRol=3;
    }else{
      numRol=0;
    }
    if(palabra == ""){
      palabra = "allOfEm";
    }
    this.setState({
      info: []
   });
    axios.get(API_BASE_URL+"account/table/search/"+palabra+"/"+numRol)
    .then(resp=>{
      if(resp.data){
     resp.data.forEach(element => {  
      this.setState({
        info: this.state.info.concat(element)
     });
    });
    }} );
    }

  sortByRole(){
   var rol = document.getElementById('roleSelect').value;
   var numRol;
   if (rol === "Empleado General"){
    numRol=1;
   }else if (rol ==="Enfermera"){
    numRol=2;
   }else if (rol === "Administrador"){
    numRol=3;
   }else{
     numRol=0;
   }
   
    axios.get(API_BASE_URL+"account/table/roles/"+numRol)
      .then(resp=>{
        this.setState({
          info: this.state.info.splice(0,this.state.info.length)
       });
       resp.data.forEach(element => {  
        this.setState({
          info: this.state.info.concat(element)
       });
      });
      } );
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


  
    return (
        <div className="content">
          <h2 className="title">
            Cuentas de Empleados
          </h2>
        <Row>
          <Col>
            <FormGroup>
            <label>Búsqueda por nombre de usuario:</label>
             <InputGroup>
                 <InputGroupAddon addonType="prepend">
                   <InputGroupText id="busqNombre" >
                     <FontAwesomeIcon icon={['fas', 'search']} />
                   </InputGroupText>
                 </InputGroupAddon>
                 <Input placeholder="Admin123"  id="busq" onInput={()=>this.searchBar()}/>
             </InputGroup>      
           </FormGroup>
         </Col>
         <Col className="text-right">
              <br/>
              <Link to="/admin/Cuentas/CrearCuentaEmp" hist={this.props.history}>
              <Button className="btn btn-primary ">
                <AccountPlusIcon/> &nbsp;
                Registrar nueva cuenta
              </Button>
              </Link>
         </Col>
        </Row>
        <Row>
         <Col>
           <FormGroup>
           <Label for="roleSelect">Búsqueda por rol</Label>
               <Input type="select" name="select" id="roleSelect" onChange={()=>this.searchBar()}>
               <option disabled selected >Rol...</option>
               <option value={0}>Todos</option>
               <option valaue={1}>Empleado General</option>
               <option valaue={2}>Enfermera</option>
               <option valaue={3}>Administrador</option>
               </Input>
           </FormGroup>
         </Col>
        </Row>
        <div class="row justify-content-center">
          <div class="col-1">
            <div class="spinner-border" role="status" id="spnCirc" align="center">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
        <div >
          <Row>
            <Col md="12">
            <div  style={ { maxHeight: '300px', overflowY:'auto' } }>
              <Table hover id="tablaCE">
              <thead> <tr> <th> Nombre </th> <th> Nombre de Usuario </th> <th> Rol </th> <th> Acciones </th> </tr> </thead> <tbody>
              {this.state.info.map((inf)=>(    
                <tr key={inf.username}> <td>{inf.nombreCompleto}</td>
                <td>{inf.username}</td>
                <td>{inf.nombreRol}</td>
                <td> <div class="row"> <div class="col"> <LinkButton id={inf.id}></LinkButton></div> <div class="col" ><LinkButtonDel id={inf.id}></LinkButtonDel> </div> </div> </td> </tr>
              ))}
              </tbody>
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
