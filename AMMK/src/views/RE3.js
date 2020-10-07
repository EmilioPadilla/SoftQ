import React from "react";


// reactstrap components
import {
  Button,
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

class RE3 extends React.Component {
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Progress value="100" />
                  <br/>
                  <h5 className="title">Registrar Empleado</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                    <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>
                            Fecha de ingreso
                          </label>
                          <Input type="date" />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                        <Label for="sedeSelect">Sede</Label>
                            <Input type="select" name="select" id="sedeSelect">
                            <option selected="1">-----</option>
                            <option >María Kolbe</option>
                            <option>Granja Bretania</option>
                            </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                        <Label for="puestoSelect">Puesto</Label>
                            <Input type="select" name="select" id="puestoSelect">
                            <option selected="1">-----</option>
                            <option >Enfermera</option>
                            <option>Servicios Generales</option>
                            <option >Cocina</option>
                            <option >Lavandería</option>
                            <option >Mayordomo</option>
                            <option >Hermana</option>
                            <option >Dirección Administrativa</option>
                            <option >Directora</option>
                            </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                     <Col className="pl-md-1" md="6">
                        <FormGroup>
                        <Label for="salarioSelect">Salario</Label>
                            <Input type="select" name="select" id="salarioSelect">
                            <option selected="1">-----</option>
                            <option >Fijo</option>
                            <option>variable</option>
                            </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Monto</label>
                          <Input
                            placeholder="1500"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Turnos por quincena</label>
                          <Input
                            placeholder="" type="number"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Escolaridad</label>
                          <Input
                            placeholder="Bachillerato" type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                        <Label for="Contrato">Copia de Contrato</Label>
                        <CustomInput type="file" name="customFile" id="Contraro" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Col className="pl-11" md="4">
                    <Button className="btn-fill" color="info" type="submit">
                      Siguiente
                    </Button>
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

export default RE3;
