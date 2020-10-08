/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Progress,
  CustomInput,
  Label
} from "reactstrap";




class UserProfile extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Progress value="33.33" />
                  <br/>
                  <h5 className="title">Registrar Empleado</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pl-md-1" md="7">
                        <FormGroup>
                          <label>Nombre Completo</label>
                          <Input
                            defaultValue=""
                            placeholder="Juan Perez Díaz"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
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
                        <Label for="ActNac">Acta de nacimiento</Label>
                        <CustomInput type="file" name="customFile" id="ActNac" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>RFC</label>
                          <Input
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                        <Label for="DocRFC">Carga de RFC</Label>
                        <CustomInput type="file" name="customFile" id="DocRFC" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>CURP</label>
                          <Input
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                        <Label for="DocCurp">Carga de Curp</Label>
                        <CustomInput type="file" name="customFile" id="DocCurp" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Num Seguridad Social</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                        <Label for="DocIne">Carga de INE</Label>
                        <CustomInput type="file" name="customFile" id="DocIne" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Col  md="12" align="right">
                  <a href="/admin/RE2">
                    <button className="btn btn-outline-primary" onClick={() => { this.handleClick() }}>Siguiente</button>
                  </a>
                  </Col>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default UserProfile;
