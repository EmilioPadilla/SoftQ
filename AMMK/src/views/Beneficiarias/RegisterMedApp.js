import React, { Component } from 'react';

import Form from "react-bootstrap/Form";
import { Button, Badge, Card, CardBody, FormGroup, Input, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup} from 'reactstrap';

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterMedApp extends Component {

    crearSelect(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        axios.get(API_BASE_URL + "specialties").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectSpecialty").innerHTML=sel; 
      });
    }

    constructor(props){
        super(props)
        this.onSubmit= this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault()

        //Agarrar los valores 
        let fechaConsulta = document.getElementById("fechaConsulta").value;
        let horaConsulta = document.getElementById("horaConsulta").value;
        let diagnostico = document.getElementById("diagnostico").value;
        let direccion = document.getElementById("direccion").value;
        let hospital = document.getElementById("hospital").value;
        let consultorio = document.getElementById("consultorio").value;
        let especialidad = document.getElementById("selectSpecialty").value;
        let comentario = document.getElementById("comentarios").value;
        let beneficiary_id = document.getElementById("beneficiary_id").value;

        const consulta = {
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
        localStorage.setItem("consulta", JSON.stringify(consulta));

        let jsonArray = JSON.parse(localStorage.getItem("consulta"));
        console.log(jsonArray);
        localStorage.clear();

        axios.post(API_BASE_URL + "medical_appointments/", jsonArray); 
    }

    render() {
        this.crearSelect();
        return (
            <div className="content">
                <h1 className="title">REGISTRAR CONSULTA MÉDICA</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.onSubmit}>

                            <Input id="beneficiary_id" name="beneficiary_id" value="1"></Input>

                            <FormGroup>
                                <Label for="fechaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de consulta médica:</Label>
                                <Input type="date" id="fechaConsulta"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="horaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'clock-alt']} />&nbsp;Fecha de consulta médica:</Label>
                                <Input type="time" id="horaConsulta"></Input>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="diagnostico"><FontAwesomeIcon icon={['fas', 'diagnoses']} />&nbsp;Diagnóstico:</Label>
                                <Input id="diagnostico" placeholder="Amigdalitis" maxLength=""></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="direccion">*&nbsp;<FontAwesomeIcon icon={['fas', 'map-marker-alt']} />&nbsp;Dirección:</Label>
                                <Input id="direccion" placeholder="Calle Ignacio Allende 203, Querétero, Querétaro" maxLength="120"></Input>
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="hospital"><FontAwesomeIcon icon={['fas', 'hospital']} />&nbsp;Hospital:</Label>
                                        <Input id="hospital" placeholder="Star Medica" maxLength=""></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <Label><FontAwesomeIcon icon={['fas', 'person-booth']} />&nbsp;Consultorio:</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon icon={['fas', 'hashtag']} /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input id="consultorio" placeholder="238" maxLength=""></Input>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <FormGroup>
                                    <label>*&nbsp;Especialidad:</label>
                                    <Form.Control as="select" id="selectSpecialty"></Form.Control>
                                </FormGroup>
                            </FormGroup>

                            <FormGroup>
                                <Label for="comentarios"><FontAwesomeIcon icon={['fas', 'comment']} />&nbsp;Comentarios:</Label>
                                <Input type="textarea" id="comentarios"></Input>
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
