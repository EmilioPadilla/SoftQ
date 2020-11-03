import React, { Component } from 'react';
import { API_BASE_URL } from '../../index';
import axios from 'axios';
import { Button, Badge, Card, CardBody, Form, FormGroup, Input, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup} from 'reactstrap';


//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class ModifyMedApp extends Component {
    
    state={
        data:[],
        form:{
          id: '',
          fechaConsulta: '',
          horaConsulta: '',
          diagnostico: '',
          direccion: '',
          hospital: '',
          consultorio: '',
          specialty_id: '',
          comentario: ''
        }
    }
      
      peticionPut=()=>{
        let urlElements = window.location.href.split('/');
        console.log(urlElements[6]);
        axios.put(API_BASE_URL + 'medical_appointments/' + this.state.form.id, this.state.form).then(response=>{
            axios.get(API_BASE_URL + 'medical_appointments/' + urlElements[6]).then(response=>{
                this.setState({data: response.data});
                console.log(response.data);
              }).catch(error=>{
                console.log(error.message);
              })
        })
      }
      
      
      tipoRegistro=()=>{
        this.setState({tipoRegistro: !this.state.tipoRegistro});
      }
      
      seleccionarEmpresa=(appointment)=>{
        this.setState({
          form: {
            id: appointment.id,
            fechaConsulta: appointment.fechaConsulta,
            horaConsulta: appointment.horaConsulta,
            diagnostico: appointment.diagnostico,
            direccion: appointment.direccion,
            hospital: appointment.hospital,
            consultorio: appointment.consultorio,
            specialty_id: appointment.specialty_id,
            comentario: appointment.comentario
          }
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
      
        componentDidMount() {
            let urlElements = window.location.href.split('/');
            console.log(urlElements[6]);
            axios.get(API_BASE_URL + 'medical_appointments/' + urlElements[6]).then(response=>{
                this.setState({data: response.data});
                console.log(response.data);
              }).catch(error=>{
                console.log(error.message);
              })
        }

    render() {
        const {form}=this.state;
        return (
            <div className="content">
                <h1 className="title">MODIFICAR CONSULTA MÉDICA</h1>
                <Form>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                <Label htmlFor="fechaConsulta">&nbsp;Fecha de consulta médica:</Label>
                                <Input type="date" id="fechaConsulta" name="id" onChange={this.handleChange} value={form.fechaConsulta}></Input>
                            </FormGroup>
                            
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'diagnoses']} />
                                <Label htmlFor="diagnostico">&nbsp;Diagnóstico:</Label>
                                <Input id="diagnostico" name="diagnostico" maxLength="" onChange={this.handleChange} value={form.diagnostico}></Input>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                                <Label htmlFor="direccion">&nbsp;Dirección:</Label>
                                <Input id="direccion" name="direccion" placeholder="Calle Ignacio Allende 203, Querétero, Querétaro" maxLength="120" onChange={this.handleChange} value={form.direccion}></Input>
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <FontAwesomeIcon icon={['fas', 'hospital']} />
                                        <Label htmlFor="hospital">&nbsp;Hospital:</Label>
                                        <Input id="hospital" name="hospital" placeholder="Star Medica" maxLength="" onChange={this.handleChange} value={form.hospital}></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                        <FontAwesomeIcon icon={['fas', 'person-booth']} />
                                        <Label htmlFor="consultorio">&nbsp;Consultorio:</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                            <InputGroupText><FontAwesomeIcon icon={['fas', 'hashtag']} /></InputGroupText>
                                            </InputGroupAddon>
                                            <Input name="consultorio" placeholder="238" maxLength="" onChange={this.handleChange} value={form.consultorio}></Input>
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <FormGroup>
                                    <FontAwesomeIcon icon={['fas', 'stethoscope']} />
                                    <Label htmlFor="especialidad">&nbsp;Especialidad:</Label>
                                    <CustomInput type="select" id="especialidad" name="specialty_id" onChange={this.handleChange} value={form.specialty_id}>
                                    <option value="">Seleccionar especialidad...</option>
                                    <option>Value 1</option>
                                    <option>Value 2</option>
                                    </CustomInput>
                                </FormGroup>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'comment']} />
                                <Label htmlFor="comentarios" >&nbsp;Comentarios:</Label>
                                <Input type="textarea" id="comentarios" name="comentario" onChange={this.handleChange} value={form?form.comentario: ''}></Input>
                            </FormGroup>

                            <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-prescription']} />
                            <Label htmlFor="cargaReceta">&nbsp;Carga de receta médica:</Label>
                                <CustomInput id="cargaReceta" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                                <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                            </FormGroup>
                        </CardBody>
                    </Card>
                    <Row className="text-center">
                        <Col md="12">
                            
                            <Button onClick={()=>this.peticionPut()}>Modificar</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}