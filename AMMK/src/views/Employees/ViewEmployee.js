import React, { useState } from 'react';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import SimpleTooltip from "../General/SimpleTooltip";
import EmployeeCalendarTable from "components/Employees/EmployeeCalendarTable.js"
import TableEmployeeFiles from "components/Employees/TableEmployeeFiles.js"
import TableEmployeeVacations from "components/Employees/TableEmployeeVacations.js"

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
  InputGroupAddon,
  Badge
} from "reactstrap";

class ViewEmployee extends React.Component {
    render() {
        return (
            <div className="content">

              <h1>Emilio Padilla Miranda</h1>

              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Foto de empleado</Badge>
                          </Col>
                          <Col>
                            <Button  className="float-right" size="sm" id="editarfoto"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                            <SimpleTooltip placement="top" target="editarfoto" >Editar foto</SimpleTooltip>
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody className="justify-content-md-center"  style={{ display: 'flex'}}>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          src={require("assets/img/profile.jpeg")}
                          width="380in"
                          height="451in"
                          style={{ alignSelf: 'center' }}
                        />
                      </a>
                    </CardBody>

                    </Card>
                </Col>
                <Col>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Datos personales</Badge>
                          </Col>
                          <Col>
                            <Button  className="float-right" size="sm" id="editarpers"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                            <SimpleTooltip placement="top" target="editarpers" >Editar datos personales</SimpleTooltip>
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Nombre Completo:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            Emilio Padilla Miranda
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Cumpleaños:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            23 de Diciembre de 2020
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Edad:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            21 años
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Antiguedad en la organización:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            3 años 7 meses
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Telefono:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            462 264 2021
                          </Label>
                        </Col>
                      </Row>
                    </CardBody>

                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Datos de empleado</Badge>
                          </Col>
                          <Col>
                            <Button  className="float-right" size="sm" id="editaremp"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                            <SimpleTooltip placement="top" target="editaremp" >Editar datos de empleado</SimpleTooltip>
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Sede:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label style={{'font-size': '25px', 'color':'#3272a7'}} >
                            Granja Betania
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Suscrito en app móvil:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label style={{'font-size': '20px'}} >
                            <FontAwesomeIcon icon={['fas', 'check-circle']} color="green"/>
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Puesto:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            Chofer
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Frecuencia de pago de salario:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            Quincenal
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Salario:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            $ 800
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Absencias en la quincena:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            Ninguna
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Retardos en la quincena:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            2 retardos
                          </Label>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Badge color="primary">Calendario de empleado</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                    <EmployeeCalendarTable/>
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Badge color="primary">Documentos de contrato</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <TableEmployeeFiles/>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Vacaciones</Badge>
                          </Col>
                          <Col>
                            <Button  className="float-right" size="sm" id="RegistrarVacaciones"><FontAwesomeIcon icon={['fas', 'plus-circle']} /></Button>
                            <SimpleTooltip placement="top" target="RegistrarVacaciones" >Registrar vacaciones</SimpleTooltip>
                          </Col>
                        </Row>

                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <TableEmployeeVacations/>
                    </CardBody>
                  </Card>
                </Col>
              </Row>



            </div>
        )
    }
}

export default ViewEmployee;
