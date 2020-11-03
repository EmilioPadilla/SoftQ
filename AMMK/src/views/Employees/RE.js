/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import axios from 'axios';

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
  Label,
  Alert
} from "reactstrap";

function parseScholarships(scholarships){
  return scholarships.map((scholarship) => {
    return { label: scholarship.descripcion, value: scholarship.id };
  });
}
let Scholarship = [];

class RegisterEmployee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      scholarships: [],
    }
  }

  componentDidMount() {
    this.getScholarships();
  }

  getScholarships() {
    axios.get('http://localhost:8000/api/scholarship')
    .then(res => this.setState({ scholarships: parseScholarships(res.data) }));
  }

  render() {
    return (
      <>
        <div className="content">
          <h2 className="title">Registrar empleado</h2>
                <Card>
                  <CardHeader>
                   
                   
                    <h3 className="title">Datos Personales</h3>
                    <Progress value="33.33" striped color="primary"/>
                    <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
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
                        <Col className="pl-md-1">
                          <FormGroup>
                            <label target="puestoSelect">Escolaridad</label>
                            <Input type="select" name="select" id="puestoSelect" value={this.state.value} onChange={this.onChange}>
                            <option defaultValue="0">Selecciona una escolaridad...</option>
                            {this.state.scholarships.map((scholarship) => <option key={scholarship.value} value={scholarship.value}>{scholarship.label}</option>)}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <FormGroup>
                          <Label for="Contrato">Copia de Contrato</Label>
                          <CustomInput type="file" name="customFile" id="Contraro" label="Selecciona un archivo"/>
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
                    <button className="btn btn-primary">Siguiente</button>
                  </Link>
                </Col>

        </div>

      </>
    );
  }
}

export default RegisterEmployee;
