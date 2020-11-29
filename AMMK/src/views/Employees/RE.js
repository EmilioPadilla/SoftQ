/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";
import { Prompt } from 'react-router'
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { Link } from "react-router-dom";
import GoBackButton  from '../../components/General/goBackButton.js';

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
import { Box } from "@material-ui/core";

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

const validName = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/);
const validCurp = RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
const validRFC = RegExp(/^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))((-)?([A-Z\d]{3}))?$/);
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
      NumInfonavit: null,
      errors: {
        nombreCompleto: '',
        RFC: '',
        fechaNacimiento: '',
        curp: '',
    }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
        case 'nombreCompleto':
            errors.nombreCompleto =
                value.length < 1
                    ? "El nombre del empleado es requerido"
                    : "" || value.length > 50
                        ? "El campo permite máximo 50 caracteres"
                        : "" || validName.test(value)
                            ? ""
                            : "El campo solo acepta letras y debe ser llenado de la forma: nombre apPaterno apMaterno";
            break;
        case 'RFC':
            errors.RFC =
                validRFC.test(value)
                            ? ""
                            : "El campo debe cumplir con el siguiente formato PAMP9511223DQ3.";
            break;
        case 'fechaNacimiento':
            errors.fechaNacimiento =
                value.length < 1
                    ? "La fecha de nacimiento del empleado es requerida"
                    : "" ||
                        validDate.test(value)
                        ? "La fecha no es correcta"
                        : "";
            break;
        case 'CURP':
            errors.curp =
                validCurp.test(value)
                    ? ""
                    : "La curp ingresada no es correcta.";
            break;
        default:
            break;
    }

    this.setState({ errors, [name]: value });
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
      window.location = FRONT_BASE_URL+"admin/RE2";
    } else {
      Swal.fire( {
        icon: 'error',
        title: '¡Error!',
        text: 'Verifica que todos los campos obligatorios estén completos.',
      })
    }
}

  componentDidMount() {
    this.getScholarships();
    this.getCivilStatus();
  }

  getScholarships() {
    axios.get(API_BASE_URL+'scholarship')
    .then(res => this.setState({ scholarships: parseScholarships(res.data) }));
  }

  getCivilStatus() {
    axios.get(API_BASE_URL+'employeeCivilStatus')
    .then(res => this.setState({ civilStatus: parseCivilStatus(res.data) }));
  }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
      window.location = FRONT_BASE_URL+"login";
    }else if(idRol==2){
        window.location = FRONT_BASE_URL+"general/NurseIndex";
    }else if (idRol==1){
        window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
    }
    const { errors } = this.state;
    const pathname = "buscar empleados";
    const path = "/admin/search-employee"
    return (
      <>
        <div className="content">

          <Prompt
            when={true}
            message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
          />
          <Row>
            <Col >
              <h2 className="title">Registrar empleado</h2>
            </Col>
          </Row>
          
          
          <Form autoComplete="off">
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
                              onChange={this.handleChange}
                              name="nombreCompleto" 
                            />
                            {errors.nombreCompleto.length > 0 && <span className='error'>{errors.nombreCompleto}</span>
                                    ||
                                    errors.nombreCompleto.length == 0 && <span className='error'>{errors.nombreCompleto}</span>}
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="fechaNacimiento">
                              * Fecha de nacimiento
                            </Label>
                            <Input type="date" 
                            id="fechaNacimiento"
                            onChange={this.handleChange}
                            name="fechaNacimiento" 
                            />
                        {errors.fechaNacimiento.length > 0 && <span className='error'>{errors.fechaNacimiento}</span>
  }
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
                              name="RFC" 
                              onChange={this.handleChange}
                            />
                              {errors.RFC.length > 0 && <span className='error'>{errors.RFC}</span>
                            ||
                            errors.RFC.length == 0 && <span className='error'>{errors.RFC}</span>}
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="CURP">CURP</Label>
                            <Input
                              placeholder="PAMP951122HGTDMM05"
                              type="text"
                              id="CURP"
                              onChange={this.handleChange}
                              name="curp" 
                            />
                            {errors.curp.length > 0 && <span className='error'>{errors.curp}</span>
                            ||
                            errors.curp.length == 0 && <span className='error'>{errors.curp}</span>}
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
