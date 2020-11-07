import React, { Component } from 'react';

//API CALLS
import { API_BASE_URL } from '../../index';
import axios from 'axios';

//COMPONENTS
import Form from "react-bootstrap/Form";
import { Button, Badge, Card, CardBody, FormGroup, Input, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup} from 'reactstrap';
import Swal from 'sweetalert2';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

// REGEX FOR VALIDATIONS
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+[\w]+$/);
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validName = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+[\w]+$/);
const validAge = RegExp(/^[0-9]{1,2}$/);
const validCurp = RegExp(/^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/);
const validTextArea = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ _:\0-9@]+$/);
const validTime = RegExp(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

export default class ModifyMedApp extends Component {

    //CREAR SELECT DE ESPECIALIDAD
    crearSelect(){
        let sel='<option value="0">Selecciona una opción...</option>';
        axios.get(API_BASE_URL + "specialties").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectSpecialty").innerHTML=sel; 
      });
    }
    
    //DECLARAR VARIABLES
    constructor(props){
        super(props);
        this.state = {
            appointments: [],
            id: null,
            beneficiary_id: null,
            fechaConsulta: null,
            horaConsulta: null,
            diagnostico: null,
            direccion: null,
            hospital: null,
            consultorio: null,
            comentario: null,
            selectSpecialty: null,
            //CAMPOS A VALIDAR
            errors: {
                fechaConsulta: '',
                horaConsulta: '',
                diagnostico: '',
                direccion: '',
                hospital: '',
                consultorio: '',
                comentario: '',
            }
          };
    
        //VALIDAR INPUTS
        this.handleChange = this.handleChange.bind(this);

        //ACTUALIZAR LA INFO MODIFICADA
        this.onSubmit= this.onSubmit.bind(this);
    }

    state={
        appointments: [],
      }
      
    //REALIZAR PETICIÓN GET PARA OBTENER LOS VALORES ACTUALES
    componentDidMount() {
        let urlElements = window.location.href.split('/');
        console.log(urlElements[6]);
        axios.get(API_BASE_URL + 'medical_appointments/' + urlElements[6])
        .then(res => {
            const appointments = res.data;
            this.setState({ appointments });
            console.log(appointments);
          })
    }

    //FUNCION QUE VALIDA LOS INPUTS
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
        let id = document.getElementById("id").value;
        let fechaConsulta = document.getElementById("fechaConsulta").value;
        let horaConsulta = document.getElementById("horaConsulta").value;
        let direccion = document.getElementById("direccion").value;
        let diagnostico = document.getElementById("diagnostico").value;
        let hospital = document.getElementById("hospital").value;
        let consultorio = document.getElementById("consultorio").value;
        let comentario = document.getElementById("comentario").value;
        let beneficiary_id = document.getElementById("beneficiary_id").value;
        let specialty_id = document.getElementById("selectSpecialty").value;
    
        if(fechaConsulta !== ''){
        const appointment = {
            id: id,
            fechaConsulta: fechaConsulta,
            horaConsulta: horaConsulta,
            direccion: direccion,
            diagnostico: diagnostico,
            hospital: hospital,
            consultorio: consultorio,
            comentario: comentario,
            specialty_id: specialty_id,
            beneficiary_id: beneficiary_id,
        };
        axios.put(API_BASE_URL + "medical_appointments/" + id, appointment).then(res => {console.log(res)});
        
        Swal.fire(
            '¡Listo!',
            'Consulta médica modificada de manera exitosa',
            'success',
            ).then(function() {
                window.location = "http://localhost:3000/admin/Beneficiarias/GeneralViewAdmin";
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
        this.crearSelect();
        const {errors} = this.state;
        return (
            <div className="content">
                <h1 className="title">MODIFICAR CONSULTA MÉDICA</h1>
                <Form onSubmit={this.onSubmit} autocomplete="off">
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        {this.state.appointments.map((appt) => (
                            <>
                            <Input id="id" name="id" value={appt.id}></Input>
                            <Input id="beneficiary_id" name="beneficiary_id" value={appt.beneficiary_id}></Input>
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                <Label htmlFor="fechaConsulta">&nbsp;Fecha de consulta médica:</Label>
                                <Input type="date" id="fechaConsulta" name="fechaConsulta" onChange={this.handleChange} value={appt.fechaConsulta}></Input>
                                {errors.fechaConsulta.length > 0 && <span className='error'>{errors.fechaConsulta}</span> 
                                || 
                                 errors.fechaConsulta.length == 0 && <span className='error'>{errors.fechaConsulta}</span>}
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'clock']} />
                                <Label htmlFor="horaConsulta">&nbsp;Hora de consulta médica:</Label>
                                <Input type="time" id="horaConsulta" name="horaConsulta" onChange={this.handleChange} value={appt.horaConsulta}></Input>
                                {errors.horaConsulta.length > 0 && <span className='error'>{errors.horaConsulta}</span> 
                                || 
                                 errors.horaConsulta.length == 0 && <span className='error'>{errors.horaConsulta}</span>}
                            </FormGroup>
                            
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'diagnoses']} />
                                <Label htmlFor="diagnostico">&nbsp;Diagnóstico:</Label>
                                <Input id="diagnostico" name="diagnostico" onChange={this.handleChange} value={appt.diagnostico}></Input>
                                {errors.diagnostico.length > 0 && <span className='error'>{errors.diagnostico}</span> 
                                || 
                                 errors.diagnostico.length == 0 && <span className='error'>{errors.diagnostico}</span>}
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                                <Label htmlFor="direccion">&nbsp;Dirección:</Label>
                                <Input id="direccion" name="direccion" placeholder="Calle Ignacio Allende 203, Querétero, Querétaro" onChange={this.handleChange} value={appt.direccion}></Input>
                                {errors.direccion.length > 0 && <span className='error'>{errors.direccion}</span> 
                                || 
                                 errors.direccion.length == 0 && <span className='error'>{errors.direccion}</span>}
                            </FormGroup>

                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                        <FontAwesomeIcon icon={['fas', 'hospital']} />
                                        <Label htmlFor="hospital">&nbsp;Hospital:</Label>
                                        <Input id="hospital" name="hospital" placeholder="Star Medica" onChange={this.handleChange} value={appt.hospital}></Input>
                                        {errors.hospital.length > 0 && <span className='error'>{errors.hospital}</span> 
                                || 
                                 errors.hospital.length == 0 && <span className='error'>{errors.hospital}</span>}
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
                                            <Input name="consultorio" id="consultorio" placeholder="238" onChange={this.handleChange} value={appt.consultorio}></Input>
                                            {errors.consultorio.length > 0 && <span className='error'>{errors.consultorio}</span> 
                                || 
                                 errors.consultorio.length == 0 && <span className='error'>{errors.consultorio}</span>}
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                            </Row>

                           <FormGroup>
                               <Label>Especialidad: </Label>
                                 <Form.Control as="select" id="selectSpecialty" value={appt.specialty_id}></Form.Control>
                            </FormGroup>


                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'comment']} />
                                <Label htmlFor="comentarios" >&nbsp;Comentarios:</Label>
                                <Input type="textarea" id="comentarios" name="comentarios" onChange={this.handleChange} value={appt.comentario}></Input>
                                {errors.comentario.length > 0 && <span className='error'>{errors.comentario}</span> 
                                || 
                                 errors.comentario.length == 0 && <span className='error'>{errors.comentario}</span>}
                            </FormGroup>

                            <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-prescription']} />
                            <Label htmlFor="cargaReceta">&nbsp;Carga de receta médica:</Label>
                                <CustomInput id="cargaReceta" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                                <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                            </FormGroup>

                            </>
                            ))}
                        </CardBody>
                    </Card>
                    <Row className="text-center">
                        <Col md="12">
                            
                            <Button type="submit">Modificar</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}