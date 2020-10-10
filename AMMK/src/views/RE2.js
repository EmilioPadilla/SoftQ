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
  Label,
  CustomInput
} from "reactstrap";



class RE2 extends React.Component {
  

  render() {
    return (
      <>
        <div className="content">
          
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Progress value="66.6" />
                  <br/>
                  <h5 className="title">Registrar Empleado</h5>
                </CardHeader>
                <CardBody>
                  <Form>
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
                <CardFooter>
                  <Row>
                  <Col  md="6">
                  <a href="/admin/user-profile">
                    <button className="btn btn-outline-primary" onClick={() => { this.handleClick() }}>Regresar</button>
                  </a>  
                  </Col>
                  <Col md="6" align="right">
                  <a href="/admin/RE3">
                    <button className="btn btn-outline-primary" onClick={() => { this.handleClick() }}>Siguiente</button>
                  </a>  
                  </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default RE2;
