/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";
import { Prompt } from 'react-router'

import axios from 'axios';
import Swal from 'sweetalert2';

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
function parseCivilStatus(civilStatus){
  return civilStatus.map((civilStatus) => {
    return { label: civilStatus.descripcion, value: civilStatus.id };
  });
}

class RegisterEmployee extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      scholarships: [],
      civilStatus: [],
      nombreCompleto: null,
      fechaNacimiento: null, 
      RFC: null,
      CURP: null, 
      NumSeguroSocial: null,
      scholarship_id: null,
      NumInfonavit: null
    }
  }

  onSubmit(e){
    e.preventDefault()
    //Agarrar los valores 
    let nombreCompleto = document.getElementById("nombreCompleto").value;
    let scholarship_id = document.getElementById("puestoSelect").value;
    let fechaNac = document.getElementById("fechaNacimiento").value;
    let CURP = document.getElementById("CURP").value;
    let RFC = document.getElementById("RFC").value;
    let NumSeguroSocial = document.getElementById("NumSeguroSocial").value;
    let civil_status_id = document.getElementById("civil_status").value;
    let infonavit = document.getElementById("NumInfonavit").value;


    if (nombreCompleto !== '' && fechaNac !== '' && civil_status_id !== '' && scholarship_id !== '') {
      console.log(nombreCompleto);
      const datosPersonales = {
        nombreCompleto: nombreCompleto,
        fechaNac: fechaNac, 
        RFC: RFC,
        CURP: CURP, 
        NumSeguroSocial: NumSeguroSocial,
        scholarship_id: scholarship_id,
        civil_status_id: civil_status_id,
        infonavit: infonavit
      };
      localStorage.setItem("personal", JSON.stringify(datosPersonales));
      window.location = "http://localhost:3000/admin/RE2";
    } else {
      Swal.fire( {
        icon: 'error',
        title: 'Oops...',
        text: 'No se han llenado todos los campos obligatorios!',
      })
    }
}

  componentDidMount() {
    this.getScholarships();
    this.getCivilStatus();
  }

  getScholarships() {
    axios.get('http://localhost:8000/api/scholarship')
    .then(res => this.setState({ scholarships: parseScholarships(res.data) }));
  }

  getCivilStatus() {
    axios.get('http://localhost:8000/api/employeeCivilStatus')
    .then(res => this.setState({ civilStatus: parseCivilStatus(res.data) }));
  }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }
    return (
      <>
        <div className="content">

          <Prompt
            when={true}
            message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
          />
          <h2 className="title">Registrar empleado</h2>
          <Form >
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
                            <Label htmlFor="nombreCompleto">* Nombre Completo</Label>
                            <Input
                              defaultValue=""
                              placeholder="Juan Perez Díaz"
                              type="text"
                              id="nombreCompleto"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="fechaNacimiento">
                              * Fecha de nacimiento
                            </Label>
                            <Input type="date" id="fechaNacimiento"/>
                          </FormGroup>
                        </Col>

                      </Row>
                      <Row>
                        
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
                              placeholder="92919084431"
                              type="text"
                              id="NumSeguroSocial"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1">
                          <FormGroup>
                            <Label target="puestoSelect" htmlFor="civil_status">* Estado civil</Label>
                            <Input type="select" name="select" id="civil_status" value={this.state.value} onChange={this.onChange}>
                            <option defaultValue="0">Selecciona un estado civil...</option>
                            {this.state.civilStatus.map((civil_status) => <option key={civil_status.value} value={civil_status.value}>{civil_status.label}</option>)}
                            </Input>
                          </FormGroup>
                        </Col>
                        
                      </Row>
                      <Row>
                        <Col className="pl-md-1">
                          <FormGroup>
                            <Label target="puestoSelect" htmlFor="puestoSelect">* Escolaridad</Label>
                            <Input type="select" name="select" id="puestoSelect" value={this.state.value} onChange={this.onChange}>
                            <option defaultValue="0">Selecciona una escolaridad...</option>
                            {this.state.scholarships.map((scholarship) => <option key={scholarship.value} value={scholarship.value}>{scholarship.label}</option>)}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col>
                        <FormGroup>
                            <Label htmlFor="NumInfonavit">Número de Infonavit</Label>
                            <Input
                              placeholder="92-91-90-8443-1"
                              type="text"
                              id="NumInfonavit"
                            />
                          </FormGroup>
                        </Col>
                        
                    </Row>

                      <Row>
                      <Col className="pl-md-1"  md="6">
                          <FormGroup>
                          <Label for="Contrato">Copia de Contrato</Label>
                          <CustomInput type="file" name="customFile" id="Contraro" label="Selecciona un archivo"/>
                          </FormGroup>
                        </Col>
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
                    <Button className="btn btn-primary" onClick={this.onSubmit}>Siguiente</Button>
                </Col>
                </Form>
        </div>

      </>
    );
  }
}

export default RegisterEmployee;
