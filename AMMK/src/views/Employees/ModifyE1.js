/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import { Prompt } from 'react-router'

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
      employees: [],
      id: '',
      nombreCompleto: null,
      fechaNacimiento: null, 
      RFC: null,
      CURP: null, 
      NumSeguroSocial: null,
      scholarship_id: null,
      NumInfonavit: null
    }
  }

  fillData (id) {
    // const { id } = this.props.match.params;
    // this.state.id = id;
    axios.get(API_BASE_URL + 'employee/' + this.state.id)
        .then(function (res) {
           document.getElementById("nombreCompleto").value = res.data[0].nombreCompleto;
           document.getElementById("fechaNacimiento").value = res.data[0].fechaNac;
           document.getElementById("CURP").value = res.data[0].CURP;
           document.getElementById("RFC").value = res.data[0].RFC;
           document.getElementById("NumSeguroSocial").value = res.data[0].numSeguroSocial;
           document.getElementById("civil_status").value = res.data[0].civil_status_id;
           document.getElementById("NumInfonavit").value = res.data[0].infonavit; 
           document.getElementById("escolaridad").value = res.data[0].scholarship_id; 
           document.getElementById("valorId").value = id;
          })
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.state.id = id;
    this.getEmployee();
    this.getScholarships();
    this.getCivilStatus();
  }


onSubmit(e, id){
    // e.preventDefault()
    //Agarrar los valores 
    let nombreCompleto = document.getElementById("nombreCompleto").value;
    let scholarship_id = document.getElementById("escolaridad").value;
    let fechaNac = document.getElementById("fechaNacimiento").value;
    let CURP = document.getElementById("CURP").value;
    let RFC = document.getElementById("RFC").value;
    let NumSeguroSocial = document.getElementById("NumSeguroSocial").value;
    let civil_status_id = document.getElementById("civil_status").value;
    let infonavit = document.getElementById("NumInfonavit").value;
    var idD= document.getElementById("valorId").value;


    if (nombreCompleto !== '' && fechaNac !== '' && civil_status_id !== '' && scholarship_id !== '') {
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
      axios.put(API_BASE_URL+"employee/personal/" + idD, datosPersonales)
      .then(function (resp) {
        console.log(resp.data);
      });
      Swal.fire(
        '¡Listo!',
        'Empleado modificado de manera exitosa',
        'success'
        ).then(function() {
          let rouote = FRONT_BASE_URL+"admin/view-employee/"+idD
          window.location = rouote;
        });
    } 
    else {
      Swal.fire( {
        icon: 'error',
        title: '¡Error!',
        text: 'Verifica que todos los campos obligatorios estén completos.',
      })
    }

}

  getEmployee() {
    const { id } = this.props.match.params;
    this.state.id = id
    axios.get(API_BASE_URL + 'employee/' + id)
        .then(res => {
            const employees = res.data;
            this.setState({ employees });
            console.log(employees);
          })
  }

  getScholarships() {
    axios.get(API_BASE_URL+"scholarship")
    .then(res => this.setState({ scholarships: parseScholarships(res.data) }));
  }

  getCivilStatus() {
    axios.get(API_BASE_URL+"employeeCivilStatus")
    .then(res => this.setState({ civilStatus: parseCivilStatus(res.data) }));
  }

  render() {
    const { id } = this.props.match.params;
    this.fillData(id);
    return (
      <>
        <div className="content">
        <Prompt
            when={true}
            message="Te encuentras en proceso de registro                                                ¿Estás seguro de querer salir?"
          />
          <h2 className="title">Modificar empleado</h2>
          <Form autocomplete="off" >
                <Card>
                  <CardHeader>
                   
                   
                    <h3 className="title">Datos Personales</h3> 
                    <br/>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                  </CardHeader>
                  <CardBody>
                  
                      <Row>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <Label htmlFor="nombreCompleto">* Nombre Completo</Label>
                            <Input
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
                            <Label target="escolaridad" htmlFor="puestoSelect">* Escolaridad</Label>
                            <Input type="select" name="select" id="escolaridad" value={this.state.value} onChange={this.onChange}>
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
                <Col  md="12" align="center">
                    <Button className="btn btn-primary" onClick={this.onSubmit.bind("this", id)}>Modificar</Button>
                </Col>
                </Form>
                <div>
                    <Input type="text" id="valorId" style={{display: "none"}}>

                    </Input>
                </div>
        </div>

      </>
    );
  }
}


export default RegisterEmployee;
