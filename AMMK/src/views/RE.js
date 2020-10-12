/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import { Link } from "react-router-dom";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Progress,
  CustomInput,
  Label
} from "reactstrap";

class RegisterEmployee extends React.Component {
  render() {
    return (
      <>
        <div className="content">
                <Card>
                  <CardHeader>
                    <Progress value="33.33" />
                    <br/>
                    <h3 className="title">Registrar Empleado</h3>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Nombre Completo</label>
                            <Input
                              defaultValue=""
                              placeholder="Juan Perez Díaz"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>
                              Fecha de nacimiento
                            </label>
                            <Input type="date" />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>RFC</label>
                            <Input
                              placeholder="PAMP951122QQ3"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>CURP</label>
                            <Input
                              placeholder="PAMP951122HGTDMM05"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Número de Seguro Social</label>
                            <Input
                              placeholder="???"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                          <Label for="DocRFC">Carga de RFC</Label>
                          <CustomInput type="file" name="customFile" id="DocRFC" label="Selecciona un archivo"/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                          <Label for="DocCurp">Carga de Curp</Label>
                          <CustomInput type="file" name="customFile" id="DocCurp" label="Selecciona un archivo"/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                          <Label for="DocIne">Carga de INE</Label>
                          <CustomInput type="file" name="customFile" id="DocIne" label="Selecciona un archivo"/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                          <Label for="ActNac">Acta de nacimiento</Label>
                          <CustomInput type="file" name="customFile" id="ActNac" label="Selecciona un archivo"/>
                          </FormGroup>
                        </Col>

                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Col  md="12" align="right">
                  <Link to='/admin/RE2'>
                    <button className="btn btn-info">Siguiente</button>
                  </Link>
                </Col>

        </div>

      </>
    );
  }
}

export default RegisterEmployee;
