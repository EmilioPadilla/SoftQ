/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import { Link } from "react-router-dom";

import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';

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
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Empleados Activos</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Nombre</th>
                      <th>RFC</th>
                      <th>Puesto</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Enfermero</td>
                      <td className="text-center">
                          <button type="button" class="btn btn-info btn-sm"><AccountSearchIcon/></button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-danger btn-sm"><DeleteIcon/></button>
                      </td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Chofer</td>
                      <td className="text-center">
                        <button type="button" class="btn btn-info btn-sm"><AccountSearchIcon/></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-danger btn-sm"><DeleteIcon/></button>
                      </td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Administrador</td>
                      <td className="text-center">
                        <button type="button" class="btn btn-info btn-sm"><AccountSearchIcon/></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-danger btn-sm"><DeleteIcon/></button>
                      </td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Cocinero</td>
                      <td className="text-center">
                        <button type="button" class="btn btn-info btn-sm"><AccountSearchIcon/></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-danger btn-sm"><DeleteIcon/></button>
                      </td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Cuidadora</td>
                      <td className="text-center">
                        <button type="button" class="btn btn-info btn-sm"><AccountSearchIcon/></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-danger btn-sm"><DeleteIcon/></button>
                      </td>
                    </tr>
                    <tr>
                      <td>Mason Porter</td>
                      <td>Chile</td>
                      <td>Enfermera</td>
                      <td className="text-center">
                        <button type="button" class="btn btn-info btn-sm"><AccountSearchIcon/></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-danger btn-sm"><DeleteIcon/></button>
                      </td>
                    </tr>
                    <tr>
                      <td>Jon Porter</td>
                      <td>Portugal</td>
                      <td>Enfermera</td>
                      <td className="text-center">
                        <button type="button" class="btn btn-info btn-sm"><AccountSearchIcon/></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button type="button" class="btn btn-danger btn-sm"><DeleteIcon/></button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>


        </div>
    </>
    );
  }
}
export default ViewEmployee;
