import React, { Component } from 'react';

//COMPONENTS
import Form from "react-bootstrap/Form";
import { Card, CardBody, Row, Alert, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Badge, Button} from 'reactstrap';
import Swal from 'sweetalert2';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from 'index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

// REGEX FOR VALIDATIONS
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+[\w]+$/);
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validAge = RegExp(/^[0-9]{1,2}$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

//FORM VALIDATION
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
        super(props);
        this.state = {
            formValid: false,
            errorCount: null,
            nombreMed: null,
            funcionMed: null,
            dosis: null,
            lapso: null,
            fechaInicio: null,
            fechaTermino: null,
            errors: {
                nombreMed: '',
                funcionMed: '',
                dosis: '',
                lapso: '',
                fechaInicio: '',
                fechaTermino: '',
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
            case 'nombreMed': 
            errors.nombreMed =
            value.length < 1
              ? "El nombre del medicamento es requerido"
              : "" || value.length > 70
              ? "El campo permite máximo 70 caracteres"
              : "" || validAlphanumericInput.test(value)
              ? ""
              : "El campo solo acepta letras y números";
            break;
            case 'funcionMed': 
            errors.funcionMed =
            value.length > 100
              ? "El campo permite máximo 100 caracteres"
              : "" || validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
            break;
            case 'dosis': 
            errors.dosis =
            value.length < 1
              ? "La dosis del medicamento es requerida"
              : "" ||
            value.length > 2
              ? "El campo permite un número de hasta 2 cifras"
              : "" || 
            validAge.test(value)
              ? ""
              : "El campo solo acepta numeros.";
            break;
            case 'lapso': 
            errors.lapso =
            value.length < 1
              ? "El lapso del medicamento es requerido"
              : "" ||
            value.length > 2
              ? "El campo permite un número de hasta 2 cifras"
              : "" || 
            validAge.test(value)
              ? ""
              : "El campo solo acepta números.";
            break;
            case 'fechaInicio': 
            errors.fechaInicio =
            value.length < 1
              ? "La fecha de inicio del tratamiento es requerida"
              : "" ||
            validDate.test(value)
              ? "La fecha no es correcta"
              : "";
            break;
            case 'fechaTermino': 
            errors.fechaTermino =
            value.length < 1
              ? "La fecha de término del tratamiento es requerida"
              : "" ||
            validDate.test(value)
              ? "La fecha no es correcta"
              : "";
            break;
            default:
                break;
        }
    
        this.setState({errors, [name]: value});
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

        if(nombreMed != ''){
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
        axios.post(API_BASE_URL + "treatments/", tratamiento).then(res => {console.log(res)});
        
        Swal.fire(
            '¡Listo!',
            'Tratamiento registrado de manera exitosa',
            'success',
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
                <h1 className="title">REGISTRAR TRATAMIENTO</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.onSubmit} autocomplete="off">
                            <Input id="beneficiary_id" name="beneficiary_id" value="1" hidden></Input>

                            <div className='nombreMed'>
                            <FormGroup>
                                <Label for="nombreMed">*&nbsp;<FontAwesomeIcon icon={['fas', 'prescription']} />&nbsp;Nombre del medicamento:</Label>
                                <Input id="nombreMed" name="nombreMed" placeholder="Cefalexina 500 MG" onChange={this.handleChange}></Input>
                                {errors.nombreMed.length > 0 && <span className='error'>{errors.nombreMed}</span> 
                                || 
                                errors.nombreMed.length == 0 && <span className='error'>{errors.nombreMed}</span>}
                            </FormGroup>
                            </div>

                            <div className="funcionMed">
                            <FormGroup>
                                <Label for="funcionMed">Función del medicamento:</Label>
                                <Input id="funcionMed" name="funcionMed" placeholder="Aliviar migraña"></Input>
                                {errors.nombreMed.length > 0 && <span className='error'>{errors.funcionMed}</span> 
                                || 
                                errors.nombreMed.length == 0 && <span className='error'>{errors.funcionMed}</span>}
                            </FormGroup>
                            </div>

                            <Row>
                                <Col md="12">
                                        <Label for="dosis">*&nbsp;<FontAwesomeIcon icon={['fas', 'pills']} />&nbsp;Dosis:</Label>
                                </Col>
                            </Row>

                                <div className="dosis">
                                    <FormGroup>
                                        <Input id="dosis" name="dosis" type="number" placeholder="8" onChange={this.handleChange}></Input>
                                        {errors.dosis.length > 0 && <span className='error'>{errors.dosis}</span> 
                                        || 
                                        errors.dosis.length == 0 && <span className='error'>{errors.dosis}</span>}
                                    </FormGroup>
                                </div>
                                    <FormGroup> 
                                    <Form.Control as="select" id="selectMode" required></Form.Control>
                                    </FormGroup>

                            <div className="lapso">
                            <FormGroup>
                                <Label htmlFor="lapso">*&nbsp;<FontAwesomeIcon icon={['fas', 'clock']} />&nbsp;Lapso:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>Cada</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="lapso" name="lapso" type="number"  placeholder="8" onChange={this.handleChange}></Input>
                                    {errors.lapso.length > 0 && <span className='error'>{errors.lapso}</span> 
                                        || 
                                    errors.lapso.length == 0 && <span className='error'>{errors.lapso}</span>}
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>hrs</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                            </div>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                <Label>&nbsp;Duración:</Label>
                                <Row>
                                    <Col md="6">
                                        <Badge color="primary">*&nbsp;Fecha de inicio:</Badge>
                                        <Input type="date" id="fechaInicio" name="fechaInicio" onChange={this.handleChange}></Input>
                                        {errors.fechaInicio.length > 0 && <span className='error'>{errors.fechaInicio}</span> 
                                        || 
                                        errors.fechaInicio.length == 0 && <span className='error'>{errors.fechaInicio}</span>}
                                    </Col>
                                    <Col med="6">
                                        <Badge color="primary">*&nbsp;Fecha de término:</Badge>
                                        <Input type="date" id="fechaTermino" name="fechaTermino" onChange={this.handleChange}></Input>
                                        {errors.fechaTermino.length > 0 && <span className='error'>{errors.fechaTermino}</span> 
                                        || 
                                        errors.fechaTermino.length == 0 && <span className='error'>{errors.fechaTermino}</span>}
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