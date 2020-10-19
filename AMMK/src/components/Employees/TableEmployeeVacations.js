/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 19, 2020

*/

import React from "react";

import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import SimpleTooltip from "../../views/General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// reactstrap components
import {
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  Row,
  Button,
  Col
  } from "reactstrap";

  class TableEmployeeVacations extends React.Component {
    render() {
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Fecha de registro</th>
                        <th>Fecha de salida</th>
                        <th>Días</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>10 de junio de 2020</td>
                      <td>22 de Diciembre de 2020</td>
                      <td>8</td>
                      <td className="text-center">
                        <Row>
                          <Col md="4">
                            <a href="/admin/view-employee">
                              <button id="editar" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'edit']} />
                              </button>
                              <SimpleTooltip placement="top" target="editar">Editar registro</SimpleTooltip>
                            </a>

                          </Col>
                          <Col md="4">
                            <Button color="danger" size="sm" id="eliminar">
                            <FontAwesomeIcon icon={['fas', 'trash-alt']} /> </Button>
                            <SimpleTooltip placement="top" target="eliminar" >Elimina registro</SimpleTooltip>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <td>10 de junio de 2020</td>
                      <td>3 de Febrero de 2021</td>
                      <td>8</td>
                      <td className="text-center">
                        <Row>
                          <Col md="4">
                            <a href="/admin/view-employee">
                              <button id="editar" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'edit']} />
                              </button>
                              <SimpleTooltip placement="top" target="editar">Editar registro</SimpleTooltip>
                            </a>

                          </Col>
                          <Col md="4">
                            <Button color="danger" size="sm" id="eliminar">
                            <FontAwesomeIcon icon={['fas', 'trash-alt']} /> </Button>
                            <SimpleTooltip placement="top" target="eliminar" >Elimina registro</SimpleTooltip>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                    </tbody>
              </Table>
            </Col>
          </Row>
        );
    }
  }

  export default TableEmployeeVacations;
