/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import { Link } from "react-router-dom";

import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';


import ViewEmployeeTable from "components/Employees/ViewEmployeeTable.js";

// reactstrap components
import {
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
  Table
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
            <button className="btn btn-info btn-block">
              <AccountPlusIcon/>
              Registrar nuevo empleado
            </button>
          </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
             <Label for="exampleSearch">Search</Label>
             <Input
               type="search"
               name="search"
               id="exampleSearch"
               placeholder="search placeholder"
             />
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