/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/

import React from "react";




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
  Label,
  CustomInput,
  Alert
} from "reactstrap";


class RegisterEmployee2 extends React.Component {


  render() {
    return (
      <>
        <div className="content">
          <h2 className="title">Registrar empleado</h2>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                 
                <h3 className="title">Datos de contacto</h3>
                    <Progress value="66.66" striped color="primary"/>
                    <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                  
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Estado</label>
                          <Input type="select" name="select" id="puestoSelect">
                          <option selected="1">Selecciona un estado...</option>
                          <option >Guanajuato</option>
                          <option>Puebla</option>
                          <option >Queretaro</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Ciudad</label>
                          <Input type="select" name="select" id="puestoSelect">
                          <option selected="1">Selecciona una ciudad...</option>
                          <option >Guanajuato</option>
                          <option>Irapuato</option>
                          <option >Salamanca</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Calle</label>
                          <Input
                            defaultValue=""
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <label>#Ext</label>
                          <Input
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <label>
                            #Int
                          </label>
                          <Input
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <label>
                            C.P
                          </label>
                          <Input
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Colonia</label>
                          <Input
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Municipio</label>
                          <Input
                            placeholder="Corregidora"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="7">
                        <FormGroup>
                        <Label for="CompDom">Comprobante de Domicilio</Label>
                        <CustomInput type="file" name="customFile" id="CompDom" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="7">
                        <FormGroup>
                          <label>Correo</label>
                          <Input
                            placeholder="mike@email.com" type="email"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Teléfono</label>
                          <Input
                            placeholder="" type="tel"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Celular</label>
                          <Input
                            placeholder="" type="tel"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Row>
              <Col  md="6">
              <a href="/admin/register-employee">
                <button className="btn btn-primary" onClick={() => { this.handleClick() }}>Regresar</button>
              </a>
              </Col>
              <Col md="6" align="right">
              <a href="/admin/RE3">
                <button className="btn btn-primary" onClick={() => { this.handleClick() }}>Siguiente</button>
              </a>
              </Col>
              </Row>
            </Col>
          </Row>


        </div>
      </>
    );
  }
}

export default RegisterEmployee2;
