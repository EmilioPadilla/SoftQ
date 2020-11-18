import React, { Component } from 'react';

//COMPONENTS
import Form from "react-bootstrap/Form";
import { Button, Badge, Card, CardBody, FormGroup, Input, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup} from 'reactstrap';
import Swal from 'sweetalert2';

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

function parseSpecialties(specialties){
  return specialties.map((specialty) => {
    return { label: specialty.nombre, value: specialty.id };
  })
}

export default class RegisterMedApp extends Component {

  getSpecialty() {
    axios.get( API_BASE_URL + 'specialties')
    .then(res => this.setState({ specialties: parseSpecialties(res.data) }));
  }

  fillData () {
    let urlElements = window.location.href.split('/');
    console.log(API_BASE_URL + 'medical_appointments/' + urlElements[6] );
    axios.get(API_BASE_URL + 'medical_appointments/' + urlElements[6])
        .then(function (res) {
           document.getElementById("fechaConsulta").value = res.data[0].fechaConsulta;
           document.getElementById("horaConsulta").value = res.data[0].horaConsulta;
           document.getElementById("direccion").value = res.data[0].direccion;
           document.getElementById("diagnostico").value = res.data[0].diagnostico;
           document.getElementById("hospital").value = res.data[0].hospital;
           document.getElementById("consultorio").value = res.data[0].consultorio;
           document.getElementById("specialty").value = res.data[0].specialty_id; 
           document.getElementById("comentario").value = res.data[0].comentario;
           document.getElementById("beneficiary_id").value = res.data[0].beneficiary_id;
          })
  }

    constructor(props){
        super(props);
        this.state = {
            id: '',
            fechaConsulta: null,
            horaConsulta: null,
            direccion: null,
            diagnostico: null,
            hospital: null,
            consultorio: null,
            comentario: null,
            beneficiary_id: '',
            specialties: [],
            appointments: [],
          };
        this.onSubmit= this.onSubmit.bind(this);
    }
    
    onSubmit(e){
        
        e.preventDefault()

        //Agarrar los valores 
        let id = document.getElementById("id").value;
        let fechaConsulta = document.getElementById("fechaConsulta").value;
        let horaConsulta = document.getElementById("horaConsulta").value;
        let diagnostico = document.getElementById("diagnostico").value;
        let direccion = document.getElementById("direccion").value;
        let hospital = document.getElementById("hospital").value;
        let consultorio = document.getElementById("consultorio").value;
        let especialidad = document.getElementById("specialty").value;
        let comentario = document.getElementById("comentario").value;
        let beneficiary_id = document.getElementById("beneficiary_id").value;

        if (fechaConsulta !== '' && horaConsulta !== '' && direccion !== '' && especialidad !== '') {
        const appointment = {
            id: id,
            fechaConsulta: fechaConsulta,
            horaConsulta: horaConsulta,
            diagnostico: diagnostico,
            direccion: direccion,
            hospital: hospital,
            consultorio: consultorio,
            specialty_id: especialidad,
            comentario:comentario,
            beneficiary_id: beneficiary_id,
        };

        axios.put(API_BASE_URL + "medical_appointments/" + id, appointment).then(res => { console.log(res) });
        Swal.fire(
            '¡Listo!',
            'Consulta médica registrada de manera exitosa',
            'success'
            ).then(function() {
                window.location = "http://localhost:3000/admin/Beneficiarias/MedicalRecordView/" + beneficiary_id;
            });
        }else{
                Swal.fire(
                    'ERROR!',
                    'Verifica que los campos obligatorios estén llenos',
                    'error'
                )
        }

    }

    componentDidMount() {
      this.getSpecialty();
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
    
      let urlElements = window.location.href.split('/');
      const{id} = urlElements[6];

      this.fillData();

        return (
            <div className="content">
                <h1 className="title">MODIFICAR CONSULTA MÉDICA</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.onSubmit} autocomplete="off">

                            <Input id="beneficiary_id" name="beneficiary_id" hidden></Input>
                            
                            <Input id="id" name="id" value={urlElements[6]} hidden></Input>

                            <FormGroup>
                                <Label for="fechaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de consulta médica:</Label>
                                <Input type="date" id="fechaConsulta" name="fechaConsulta" onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="horaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'clock']} />&nbsp;Hora de consulta médica:</Label>
                                <Input type="time" id="horaConsulta" name="horaConsulta" onChange={this.handleChange}></Input>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="diagnostico"><FontAwesomeIcon icon={['fas', 'diagnoses']} />&nbsp;Diagnóstico:</Label>
                                <Input id="diagnostico" name="diagnostico" placeholder="Amigdalitis" onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="direccion">*&nbsp;<FontAwesomeIcon icon={['fas', 'map-marker-alt']} />&nbsp;Dirección:</Label>
                                <Input id="direccion" name="direccion" placeholder="Calle Ignacio Allende 203, Querétero, Querétaro" onChange={this.handleChange}></Input>
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="hospital"><FontAwesomeIcon icon={['fas', 'hospital']} />&nbsp;Hospital:</Label>
                                        <Input id="hospital" name="hospital" placeholder="Star Medica" onChange={this.handleChange}></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label><FontAwesomeIcon icon={['fas', 'person-booth']} />&nbsp;Consultorio:</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon icon={['fas', 'hashtag']} /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input id="consultorio" name="consultorio" placeholder="238" onChange={this.handleChange}></Input>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                            <Label htmlFor="specialty">* Especialidad: </Label>
                            <Input type="select" name="specialty" id="specialty" value={this.state.value} onChange={this.onChange}>
                            <option defaultValue="0">Selecciona una opción...</option>
                            {this.state.specialties.map((specialty) => <option key={specialty.value} value={specialty.value}>{specialty.label}</option>)}
                            </Input>
                          </FormGroup>

                            <FormGroup>
                                <Label for="comentarios"><FontAwesomeIcon icon={['fas', 'comment']} />&nbsp;Comentarios:</Label>
                                <Input type="textarea" id="comentario" name="comentario" onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-prescription']} />
                            <Label for="cargaReceta">Carga de receta médica:</Label>
                                <CustomInput id="cargaReceta" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                                <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                            </FormGroup>
                                <Row className="text-center">
                                    <Col md="12">
                                        <Button type="submit">Registrar</Button>
                                    </Col>
                                </Row>
                            </Form> 
                        </CardBody>
                    </Card>
            </div>
        )
    }
}