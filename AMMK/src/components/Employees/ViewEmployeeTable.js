/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 12, 2020

*/

import React from "react";

import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';

// reactstrap components
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Col
  } from "reactstrap";

  class ViewEmployeeTable extends React.Component {
    render() {
        return (
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
        );
      }

  }

  export default ViewEmployeeTable;
