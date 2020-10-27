import React, { Component } from 'react';

// reactstrap components
import { Card, CardBody, Form, Row, Alert, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge, Button} from 'reactstrap';

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterTreatment extends Component {
    state={
        data:[],
        form:{
          nombreMed: '',
          funcionMed: '',
          dosis: '',
          lapso: '',
          fechaInicio: '',
          fechaTermino: '',
          mode_id: '',
          beneficiary_id: '',
        }
      }
      
      peticionGet=()=>{
      axios.get(API_BASE_URL + 'treatments').then(response=>{
        this.setState({data: response.data});
      }).catch(error=>{
        console.log(error.message);
      })
      }

    peticionPost=async()=>{
       await axios.post(API_BASE_URL + 'treatments',this.state.form).then(response=>{
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }

    /*constructor(props){
        super(props)
        this.onSubmit= this.onSubmit.bind(this);
    }
    
    onSubmit(e){
      e.preventDefault()

      var medicamento = document.getElementById("medicamento").value;
      var funcion= document.getElementById("funcion").value;
      var dosis = document.getElementById("dosis").value;
      var lapso = document.getElementById("lapso").value;
      var fechaInicio = document.getElementById("fechaInicio").value;
      var fechaTermino = document.getElementById("fechaTermino").value;
    
      const treatment = {
        medicamento: medicamento,
        funcion: funcion,
        dosis: dosis,
        lapso: lapso,
        fechaInicio: fechaInicio,
        fechaTermino: fechaTermino, 
      };
    
      axios.post('http://localhost:8000/api/treatments/', treatment)
      .then(res => console.log(res.data));
    }*/

    render() {
        return (
            <div className="content">
                <h1 className="title">REGISTRAR TRATAMIENTO</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.handleSubmit}>
                            <Input id="beneficiary_id" name="beneficiary_id" onChange={this.handleChange}></Input>
                            <Input id="mode_id" name="mode_id" onChange={this.handleChange}></Input>
                            <FormGroup>
                                <Label for="nombreMed"><FontAwesomeIcon icon={['fas', 'prescription']} />&nbsp;Nombre del medicamento:</Label>
                                <Input id="nombreMed" name="nombreMed" placeholder="Cefalexina 500 MG" maxLength="" onChange={this.handleChange}></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label for="funcionMed">Función del medicamento:</Label>
                                <Input id="funcionMed" name="funcionMed" placeholder="Aliviar migraña" maxLength="" onChange={this.handleChange}></Input>
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
                                        <Input id="dosis" name="dosis" type="number" min="1" max="50" placeholder="1" onChange={this.handleChange}></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                </Col>
                            </Row>


                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'clock']} />
                                <Label htmlFor="lapso">&nbsp;Lapso:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Cada</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="lapso" name="lapso" type="number" min="1" max="24" placeholder="8" onChange={this.handleChange}></Input>
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
                                        <Input type="date" id="fechaInicio" name="fechaInicio" onChange={this.handleChange}></Input>
                                    </Col>
                                    <Col med="6">
                                        <Badge color="primary">Fecha de término:</Badge>
                                        <Input type="date" id="fechaTermino" name="fechaTermino" onChange={this.handleChange}></Input>
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