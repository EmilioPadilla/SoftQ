/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 12, 2020

*/

import React from "react";

import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import ModalExitEmployee from "components/Employees/ModalExitEmployee.js";
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

  class ViewEmployeeTable extends React.Component {
    render() {
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>RFC</th>
                        <th>Puesto</th>
                        <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Enfermero</td>
                      <td >
                        <Row>
                          <Col md="3">
                            <a href="/admin/view-employee">
                              <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'eye']} />
                              </button>
                              <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                            </a>

                        </Col>
                        <Col md="3">
                          <ModalExitEmployee buttonLabel={<FontAwesomeIcon icon={['fas', 'trash-alt']} />}/>
                        </Col>
                      </Row>
                      </td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Chofer</td>
                      <td className="text-center">
                        <Row>
                          <Col md="3">
                          <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                            <FontAwesomeIcon icon={['fas', 'eye']} />
                          </button>
                          <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                        </Col>
                        <Col md="3">
                          <ModalExitEmployee buttonLabel={<FontAwesomeIcon icon={['fas', 'trash-alt']} />}/>
                        </Col>
                      </Row>
                      </td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Administrador</td>
                      <td className="text-center">
                        <Row>
                          <Col md="3">
                            <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                              <FontAwesomeIcon icon={['fas', 'eye']} />
                            </button>
                            <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                        </Col>
                        <Col md="3">
                          <ModalExitEmployee buttonLabel={<FontAwesomeIcon icon={['fas', 'trash-alt']} />}/>
                        </Col>
                      </Row>
                      </td>
                    </tr>
                    <tr>
                      <td>Philip Chaney</td>
                      <td>Korea, South</td>
                      <td>Cocinero</td>
                      <td className="text-center">
                        <Row>
                          <Col md="3">
                            <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                              <FontAwesomeIcon icon={['fas', 'eye']} />
                            </button>
                            <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                        </Col>
                        <Col md="3">
                          <ModalExitEmployee buttonLabel={<FontAwesomeIcon icon={['fas', 'trash-alt']} />}/>
                        </Col>
                      </Row>
                      </td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Cuidadora</td>
                      <td className="text-center">
                        <Row>
                          <Col md="3">
                            <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                              <FontAwesomeIcon icon={['fas', 'eye']} />
                            </button>
                            <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                        </Col>
                        <Col md="3">
                          <ModalExitEmployee buttonLabel={<FontAwesomeIcon icon={['fas', 'trash-alt']} />}/>
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

  export default ViewEmployeeTable;
