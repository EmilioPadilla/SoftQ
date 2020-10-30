import React, { Component } from 'react';

// reactstrap components
import Form from "react-bootstrap/Form";
import { Card, CardBody, Row, Alert, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge, Button} from 'reactstrap';

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterTreatment extends Component {

    crearSelect(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        axios.get(API_BASE_URL + "modes").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectMode").innerHTML=sel; 
      });
    }

    constructor(props){
        super(props)
        this.onSubmit= this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault()

        //Agarrar los valores 
        let nombreMed = document.getElementById("nombreMed").value;
        let funcionMed = document.getElementById("funcionMed").value;
        let dosis = document.getElementById("dosis").value;
        let lapso = document.getElementById("lapso").value;
        let fechaInicio = document.getElementById("fechaInicio").value;
        let fechaTermino = document.getElementById("fechaTermino").value;
        let mode_id = document.getElementById("selectMode").value;
        let beneficiary_id = document.getElementById("beneficiary_id").value;

        const tratamiento = {
            nombreMed: nombreMed,
            funcionMed: funcionMed,
            dosis: dosis,
            lapso: lapso,
            fechaInicio: fechaInicio,
            fechaTermino: fechaTermino,
            mode_id:mode_id,
            beneficiary_id: beneficiary_id,
        };
        localStorage.setItem("tratamiento", JSON.stringify(tratamiento));

        let jsonArray = JSON.parse(localStorage.getItem("tratamiento"));
        console.log(jsonArray);
        localStorage.clear();

        axios.post(API_BASE_URL + "treatments/", jsonArray); 
    }

    render() {
        this.crearSelect();
        return (
            <div className="content">
                <h1 className="title">REGISTRAR TRATAMIENTO</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.onSubmit}>
                            <Input id="beneficiary_id" name="beneficiary_id" value="1"></Input>

                            <FormGroup>
                                <Label for="nombreMed"><FontAwesomeIcon icon={['fas', 'prescription']} />&nbsp;Nombre del medicamento:</Label>
                                <Input id="nombreMed" name="nombreMed" placeholder="Cefalexina 500 MG" maxLength=""></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="funcionMed">Función del medicamento:</Label>
                                <Input id="funcionMed" name="funcionMed" placeholder="Aliviar migraña" maxLength=""></Input>
                            </FormGroup>

                            <Row>
                                <Col md="12">
                                        <FontAwesomeIcon icon={['fas', 'pills']} />
                                        <Label for="dosis" maxLength="">&nbsp;Dosis:</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="2">
                                    <FormGroup>
                                        <Input id="dosis" name="dosis" type="number" min="1" max="50" placeholder="1"></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup> 
                                    <label>Seleccionar modo...</label>
                                    <Form.Control as="select" id="selectMode" required></Form.Control>
                                    </FormGroup>
                                </Col>
                            </Row>


                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'clock']} />
                                <Label htmlFor="lapso">&nbsp;Lapso:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Cada</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="lapso" name="lapso" type="number" min="1" max="24" placeholder="8"></Input>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>hrs</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                <Label>&nbsp;Duración:</Label>
                                <Row>
                                    <Col md="6">
                                        <Badge color="primary">Fecha de inicio:</Badge>
                                        <Input type="date" id="fechaInicio" name="fechaInicio"></Input>
                                    </Col>
                                    <Col med="6">
                                        <Badge color="primary">Fecha de término:</Badge>
                                        <Input type="date" id="fechaTermino" name="fechaTermino"></Input>
                                    </Col>
                                </Row>
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
        );
    }
}