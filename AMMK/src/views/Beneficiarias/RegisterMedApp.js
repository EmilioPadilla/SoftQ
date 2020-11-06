import React, { Component } from 'react';
import { Link } from "react-router-dom";

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

// REGEX FOR VALIDATIONS
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+[\w]+$/);
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validName = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+[\w]+$/);
const validAge = RegExp(/^[0-9]{1,3}$/);
const validCurp = RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
const validTextArea = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ _:\0-9@]+$/);
const validTime = RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

//FORM VALIDATIONS
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  
  const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (count = count+1)
    );
    return count;
  }

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
        super(props);
        this.state = {
            formValid: false,
            errorCount: null,
            fechaConsulta: null,
            horaConsulta: null,
            direccion: null,
            diagnostico: null,
            hospital: null,
            consultorio: null,
            dxMedico: null,
            comentario: null,
            errors: {
                fechaConsulta: '',
                horaConsulta: '',
                direccion: '',
                diagnostico: '',
                hospital: '',
                consultorio: '',
                dxMedico: '',
                comentario: '',
            }
          };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
            case 'fechaConsulta': 
            errors.fechaConsulta =
            value.length < 1
              ? "La fecha de la consulta es requerida"
              : "" ||
            validDate.test(value)
              ? "La fecha no es correcta"
              : "";
            break;
            case 'horaConsulta': 
            errors.horaConsulta =
            value.length < 1
              ? "La hora de la consulta es requerida"
              : "" ||
            validTime.test(value)
              ? ""
              : "La hora ingresada no es válida";
            break;
            case 'diagnostico': 
            errors.diagnostico =
            value.length > 100
              ? "El campo permite máximo 100 caracteres"
              : "" || validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
            break;
            case 'direccion': 
            errors.direccion =
            value.length < 1
              ? "La dirección es requerida"
              : "" || value.length > 150
              ? "El campo permite máximo 150 caracteres"
              : "" || validAlphanumericInput.test(value)
              ? ""
              : "El campo solo acepta letras y números";
            break;
            case 'hospital': 
            errors.hospital =
            value.length > 100
              ? "El campo permite máximo 100 caracteres"
              : "" || validAlphanumericInput.test(value)
              ? ""
              : "El campo solo acepta letras y números";
            break;
            case 'consultorio': 
            errors.consultorio =
            value.length > 3
              ? "El campo permite un número de hasta 3 cifras"
              : "" || 
            validAge.test(value)
              ? ""
              : "El campo solo acepta numeros.";
            break;
            case 'comentario': 
            errors.comentario =
            validTextArea.test(value)
              ? ""
              : "El texto ingresado es inválido";
            break;
            default:
                break;
        }
    
        this.setState({errors, [name]: value});
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

        if(direccion != ''){
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

        axios.post(API_BASE_URL + "medical_appointments/", consulta).then(res => {console.log(res)});
        Swal.fire(
            '¡Listo!',
            'Consulta médica registrada de manera exitosa',
            'success'
            ).then(function() {
                window.location = "http://localhost:3000/admin/Beneficiarias/MedicalRecordView";
            });
        }else{
                Swal.fire(
                    'ERROR!',
                    'Verifica que los campos obligatorios estén llenos',
                    'error'
                )
        }

    }

    render() {
        const {errors, formValid} = this.state;
        this.crearSelect();
        return (
            <div className="content">
                <h1 className="title">REGISTRAR CONSULTA MÉDICA</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.onSubmit} autocomplete="off">

                            <Input id="beneficiary_id" name="beneficiary_id" value="1" hidden></Input>

                            <FormGroup>
                                <Label for="fechaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de consulta médica:</Label>
                                <Input type="date" id="fechaConsulta" name="fechaConsulta" onChange={this.handleChange}></Input>
                                {errors.fechaConsulta.length > 0 && <span className='error'>{errors.fechaConsulta}</span> 
                                || 
                                 errors.fechaConsulta.length == 0 && <span className='error'>{errors.fechaConsulta}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label for="horaConsulta">*&nbsp;<FontAwesomeIcon icon={['fas', 'clock']} />&nbsp;Hora de consulta médica:</Label>
                                <Input type="time" id="horaConsulta" name="horaConsulta" onChange={this.handleChange}></Input>
                                {errors.horaConsulta.length > 0 && <span className='error'>{errors.horaConsulta}</span> 
                                || 
                                 errors.horaConsulta.length == 0 && <span className='error'>{errors.horaConsulta}</span>}
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="diagnostico"><FontAwesomeIcon icon={['fas', 'diagnoses']} />&nbsp;Diagnóstico:</Label>
                                <Input id="diagnostico" name="diagnostico" placeholder="Amigdalitis" onChange={this.handleChange}></Input>
                                {errors.diagnostico.length > 0 && <span className='error'>{errors.diagnostico}</span> 
                                || 
                                 errors.diagnostico.length == 0 && <span className='error'>{errors.diagnostico}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label for="direccion">*&nbsp;<FontAwesomeIcon icon={['fas', 'map-marker-alt']} />&nbsp;Dirección:</Label>
                                <Input id="direccion" name="direccion" placeholder="Calle Ignacio Allende 203, Querétero, Querétaro" onChange={this.handleChange}></Input>
                                {errors.direccion.length > 0 && <span className='error'>{errors.direccion}</span> 
                                || 
                                 errors.direccion.length == 0 && <span className='error'>{errors.direccion}</span>}
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <Label for="hospital"><FontAwesomeIcon icon={['fas', 'hospital']} />&nbsp;Hospital:</Label>
                                        <Input id="hospital" name="hospital" placeholder="Star Medica" onChange={this.handleChange}></Input>
                                        {errors.hospital.length > 0 && <span className='error'>{errors.hospital}</span> 
                                || 
                                 errors.hospital.length == 0 && <span className='error'>{errors.hospital}</span>}
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
                                            {errors.consultorio.length > 0 && <span className='error'>{errors.consultorio}</span> 
                                || 
                                 errors.consultorio.length == 0 && <span className='error'>{errors.consultorio}</span>}
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
                                <Input type="textarea" id="comentarios" name="comentarios" onChange={this.handleChange}></Input>
                                {errors.comentario.length > 0 && <span className='error'>{errors.comentario}</span> 
                                || 
                                 errors.comentario.length == 0 && <span className='error'>{errors.comentario}</span>}
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
