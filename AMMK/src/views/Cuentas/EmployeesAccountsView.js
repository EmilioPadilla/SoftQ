import React from "react";


import { Link } from "react-router-dom";
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// reactstrap components
import {
  Button,
  Input,
  Row,
  Col,
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
    var tabla='<thead> <tr> <th> Nombre </th> <th> Username </th> <th> Rol </th> <th> Acciones </th> </tr> </thead> <tbody>';
    const num=1;
    axios.get("http://localhost:8000/api/account/table/all")
      .then(function (resp){
        respuesta = respuesta.concat(resp.data);
        document.getElementById("tablaCE").innerHTML = respuesta;
      } );
  }


  render() {
    this.crearTabla();
    return (
        <div className="content">
          <h2>
            Cuentas de Empleados
          </h2>
        <Row>
          <Col>
            <FormGroup>
            <label>Búsqueda por nombre:</label>
             <InputGroup>
                 <InputGroupAddon addonType="prepend">
                   <InputGroupText id="busqNombre">
                     <FontAwesomeIcon icon={['fas', 'search']} />
                   </InputGroupText>
                 </InputGroupAddon>
                 <Input placeholder="Juan Artal Gonzalez"/>
             </InputGroup>      
           </FormGroup>
         </Col>
         <Col className="text-right">
              <br/>
              <Link to='/admin/Cuentas/CrearCuentaEmp'>
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
           <Label for="statusSelect">Búsqueda por rol</Label>
               <Input type="select" name="select" id="statusSelect">
               <option disabled selected >Rol...</option>
               <option >Empleado General</option>
               <option>Enfermera</option>
               <option>Administrador</option>
               </Input>
           </FormGroup>
         </Col>
        </Row>
        <Row>
            <Col md="12">
              <Table hover id="tablaCE">
              </Table>
            </Col>
          </Row>
        </div>
  
    );
  }
}
export default EmployeesAccountView;
