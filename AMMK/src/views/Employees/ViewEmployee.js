/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
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
  FormGroup,
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


class ViewEmployee extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <h2>
            Empleados
          </h2>
          <Row>
            <Col>
              <FormGroup>
              <Label for="statusSelect">Estatus</Label>
                  <Input type="select" name="select" id="statusSelect">
                  <option selected="1">Estatus...</option>
                  <option >Activos</option>
                  <option>Inactivos</option>
                  </Input>
              </FormGroup>
            </Col>
            <Col className="text-right">
              <br/>
              <Link to='/admin/register-employee'>
              <Button className="btn btn-primary ">
                <AccountPlusIcon/> &nbsp;
                Registrar nuevo empleado
              </Button>
            </Link>
            </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
             <Label for="exampleSearch">Search</Label>
             <InputGroup>
                 <InputGroupAddon addonType="prepend">
                   <InputGroupText>
                     <FontAwesomeIcon icon={['fas', 'search']} />
                   </InputGroupText>
                 </InputGroupAddon>
                 <Input placeholder="Juan Artal Gonzalez"/>
             </InputGroup>
           </FormGroup>
         </Col>
         <Col>
           <FormGroup>
           <Label for="statusSelect">Puesto</Label>
               <Input type="select" name="select" id="statusSelect">
               <option selected="1">Puesto...</option>
               <option >Empleado General</option>
               <option>Chofer</option>
               <option>Administrador</option>
               <option>Enfermera</option>
               </Input>
           </FormGroup>
         </Col>
        </Row>
        <ViewEmployeeTable/>
        <div>

        </div>
        </div>

    </>
    );
  }
}
export default ViewEmployee;
