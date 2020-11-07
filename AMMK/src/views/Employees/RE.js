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
  Alert,
  Button
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
      nombreCompleto: null,
      fechaNacimiento: null, 
      RFC: null,
      CURP: null, 
      NumSeguroSocial: null,
      escolaridad: null
    }
  }

  onSubmit(e){
    e.preventDefault()
    //Agarrar los valores 
    let nombreCompleto = document.getElementById("nombreCompleto").value;
    let escolaridad = document.getElementById("puestoSelect").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let CURP = document.getElementById("CURP").value;
    let RFC = document.getElementById("RFC").value;
    let NumSeguroSocial = document.getElementById("NumSeguroSocial").value;

    const datosPersonales = {
      nombreCompleto: nombreCompleto,
      fechaNacimiento: fechaNacimiento, 
      RFC: RFC,
      CURP: CURP, 
      NumSeguroSocial: NumSeguroSocial,
      escolaridad: escolaridad
    };
    localStorage.setItem("personal", JSON.stringify(datosPersonales));
    // console.log(localStorage.getItem("personal"));
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
          <Form onClick={this.onSubmit}>
                <Card>
                  <CardHeader>
                   
                   
                    <h3 className="title">Datos Personales</h3>
                    <Progress value="33.33" striped color="primary"/>
                    <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                  </CardHeader>
                  <CardBody>
                      <Row>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="nombreCompleto">Nombre Completo</Label>
                            <Input
                              defaultValue=""
                              placeholder="Juan Perez Díaz"
                              type="text"
                              id="nombreCompleto"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="fechaNacimiento">
                              Fecha de nacimiento
                            </Label>
                            <Input type="date" id="fechaNacimiento"/>
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="RFC">RFC</Label>
                            <Input
                              placeholder="PAMP951122QQ3"
                              type="text"
                              id="RFC"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="CURP">CURP</Label>
                            <Input
                              placeholder="PAMP951122HGTDMM05"
                              type="text"
                              id="CURP"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="NumSeguroSocial">Número de Seguro Social</Label>
                            <Input
                              placeholder="???"
                              type="text"
                              id="NumSeguroSocial"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-md-1">
                          <FormGroup>
                            <Label target="puestoSelect" htmlFor="puestoSelect">Escolaridad</Label>
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
                    
                  </CardBody>
                </Card>
                <Col  md="12" align="right">
                  <Link to='/admin/RE2'>
                    <Button className="btn btn-primary" onClick="onSubmit()">Siguiente</Button>
                  </Link>
                </Col>
                </Form>
        </div>

      </>
    );
  }
}

export default RegisterEmployee;
