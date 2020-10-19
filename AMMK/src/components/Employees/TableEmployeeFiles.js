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

  class TableEmployeeFiles extends React.Component {
    render() {
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Documento</th>
                        <th>Fecha de registro</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Contrato_Emilio.pdf</td>
                      <td>10 de junio de 2020</td>
                      <td className="text-right">
                        <Row>
                          <Col md="3">
                            <a href="/admin/view-employee">
                              <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'eye']} />
                              </button>
                              <SimpleTooltip placement="top" target="verDetalle">Ver en web</SimpleTooltip>
                            </a>

                          </Col>
                          <Col md="3">
                            <Button color="success" size="sm" id="edit"><FontAwesomeIcon icon={['fas', 'upload']} /></Button>
                            <SimpleTooltip placement="top" target="edit" >Subir nuevo documento</SimpleTooltip>
                          </Col>
                          <Col md="3">
                            <Button color="primary" size="sm" id="descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                            <SimpleTooltip placement="top" target="descargar" >Descargar documento</SimpleTooltip>
                          </Col>

                          <Col md="3">

                            <Button color="danger" size="sm" id="eliminar">
                            <FontAwesomeIcon icon={['fas', 'trash-alt']} /> </Button>
                            <SimpleTooltip placement="top" target="eliminar" >Elimina documentor</SimpleTooltip>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <td>Acta_nacimiento_emilio.pdf</td>
                      <td>10 de junio de 2020</td>
                      <td className="text-center">
                        <Row>
                          <Col md="3">
                            <a href="/admin/view-employee">
                              <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'eye']} />
                              </button>
                              <SimpleTooltip placement="top" target="verDetalle">Ver en web</SimpleTooltip>
                            </a>

                          </Col>
                          <Col md="3">
                            <Button color="success" size="sm" id="edit"><FontAwesomeIcon icon={['fas', 'upload']} /></Button>
                            <SimpleTooltip placement="top" target="edit" >Subir nuevo documento</SimpleTooltip>
                          </Col>
                          <Col md="3">
                            <Button color="primary" size="sm" id="descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                            <SimpleTooltip placement="top" target="descargar" >Descargar documento</SimpleTooltip>
                          </Col>

                          <Col md="3">

                            <Button color="danger" size="sm" id="eliminar">
                            <FontAwesomeIcon icon={['fas', 'trash-alt']} /> </Button>
                            <SimpleTooltip placement="top" target="eliminar" >Elimina documentor</SimpleTooltip>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <td>Kardex_Emilio.pdf</td>
                      <td>10 de junio de 2020</td>
                      <td className="text-center">
                        <Row>
                          <Col md="3">
                            <a href="/admin/view-employee">
                              <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'eye']} />
                              </button>
                              <SimpleTooltip placement="top" target="verDetalle">Ver en web</SimpleTooltip>
                            </a>

                          </Col>
                          <Col md="3">
                            <Button color="success" size="sm" id="edit"><FontAwesomeIcon icon={['fas', 'upload']} /></Button>
                            <SimpleTooltip placement="top" target="edit" >Subir nuevo documento</SimpleTooltip>
                          </Col>
                          <Col md="3">
                            <Button color="primary" size="sm" id="descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                            <SimpleTooltip placement="top" target="descargar" >Descargar documento</SimpleTooltip>
                          </Col>

                          <Col md="3">

                            <Button color="danger" size="sm" id="eliminar">
                            <FontAwesomeIcon icon={['fas', 'trash-alt']} /> </Button>
                            <SimpleTooltip placement="top" target="eliminar" >Elimina documentor</SimpleTooltip>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                    <tr>
                      <td>Comprobante_domicilio_Emilio.pdf</td>
                      <td>10 de junio de 2020</td>
                      <td className="text-center">
                        <Row>
                          <Col md="3">
                            <a href="/admin/view-employee">
                              <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'eye']} />
                              </button>
                              <SimpleTooltip placement="top" target="verDetalle">Ver en web</SimpleTooltip>
                            </a>

                          </Col>
                          <Col md="3">
                            <Button color="success" size="sm" id="edit"><FontAwesomeIcon icon={['fas', 'upload']} /></Button>
                            <SimpleTooltip placement="top" target="edit" >Subir nuevo documento</SimpleTooltip>
                          </Col>
                          <Col md="3">
                            <Button color="primary" size="sm" id="descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                            <SimpleTooltip placement="top" target="descargar" >Descargar documento</SimpleTooltip>
                          </Col>

                          <Col md="3">

                            <Button color="danger" size="sm" id="eliminar">
                            <FontAwesomeIcon icon={['fas', 'trash-alt']} /> </Button>
                            <SimpleTooltip placement="top" target="eliminar" >Elimina documentor</SimpleTooltip>
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

  export default TableEmployeeFiles;
