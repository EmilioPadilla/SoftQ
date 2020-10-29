/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import { Link } from "react-router-dom";

import AccountPlusIcon from 'mdi-react/AccountPlusIcon';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import ViewEmployeeTable from "components/Employees/ViewEmployeeTable.js";

// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  InputGroup,
  InputGroupText,
  InputGroupAddon
} from "reactstrap";


class SearchEmployee extends React.Component {
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
             <Label for="exampleSearch">Búsqueda por nombre</Label>
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
           <Label for="statusSelect">Búsqueda por puesto</Label>
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
export default SearchEmployee;
