import React, { Component } from 'react';

//COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, Col, Label, Input, FormGroup, Row, Button, Form, ModalHeader, Badge, CustomInput} from 'reactstrap';
import Swal from 'sweetalert2';
import SimpleTooltip from "../General/SimpleTooltip";

//API CALLS
import axios from "axios";
import { API_BASE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// REGEX FOR VALIDATIONS
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

export default class TakeOutB extends Component {
  constructor(props){
    super(props);
    this.state = {
        fechaEgreso: null,
        motivoEgreso: null,
        destino: null,
        beneficiaries: [],
        errors: {
            fechaEgreso: '',
            motivoEgreso: '',
            destino: '',
        }
      };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
}
  state={
    modalEgresar: false,
    beneficiaries: [],
  }

  componentDidMount() {
    let id = this.props.id;
    console.log(id);
    axios.get(API_BASE_URL + 'beneficiaries/' + id)
    .then(res => {
        const beneficiaries = res.data;
        this.setState({ beneficiaries });
        console.log(beneficiaries);
      })
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
        case 'fechaEgreso': 
        errors.fechaEgreso =
        value.length < 1
          ? "La fecha de egreso es un campo obligatorio"
          : "" ||
        validDate.test(value)
          ? "La fecha no es correcta"
          : "";
        break;
        case 'motivoEgreso': 
        errors.motivoEgreso =
        value.length < 1
          ? "El motivo de egreso es un campo obligatorio"
          : "" ||
        validTextInput.test(value)
          ? ""
          : "El campo solo acepta letras";
        break;
        case 'destino': 
        errors.destino =
        value.length < 1
          ? ""
          : "" ||
        validTextInput.test(value)
          ? ""
          : "El campo solo acepta letras";
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
    let headquarter_id = document.getElementById("headquarter_id").value;
    let nombreCompleto = document.getElementById("nombreCompleto").value;
    let apodo = document.getElementById("apodo").value;
    let numCurp = document.getElementById("numCurp").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let edadMental = document.getElementById("edadMental").value;
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    let motivoIngreso = document.getElementById("motivoIngreso").value;
    let canalizador = document.getElementById("canalizador").value;
    let dxMedico = document.getElementById("dxMedico").value;
    let vinculosFam = document.getElementById("vinculosFam").value;
    let fechaEgreso = document.getElementById("fechaEgreso").value;
    let motivoEgreso = document.getElementById("motivoEgreso").value;
    let destino = document.getElementById("destino").value;

    if(fechaEgreso !== ''){
    const beneficiary = {
        id: id,
        status_id: 2,
        headquarter_id: headquarter_id,
        nombreCompleto: nombreCompleto,
        apodo: apodo,
        numCurp: numCurp,
        canalizador: canalizador,
        fechaIngreso: fechaIngreso,
        dxMedico: dxMedico,
        fechaNacimiento: fechaNacimiento,
        vinculosFam: vinculosFam,
        edadMental: edadMental,
        motivoIngreso: motivoIngreso,
        fechaEgreso: fechaEgreso,
        motivoEgreso: motivoEgreso,
        destino: destino,
    };
    axios.put(API_BASE_URL + "beneficiaries/" + id, beneficiary).then(res => {console.log(res)});
    
    Swal.fire(
        '¡Listo!',
        'Egreso registrado de manera exitosa',
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


  render(){
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
    const {errors} = this.state;
  return (
    <div className="content">
      <Button color="danger" size="sm" id="egresar" onClick={()=>{this.setState({modalEgresar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></Button>
      <SimpleTooltip placement="top" target="egresar" >Egresar</SimpleTooltip>

          <Modal isOpen={this.state.modalEgresar}>
          <Form onSubmit={this.onSubmit} autocomplete="off">
          <ModalHeader>
            <h3 className="title">EGRESAR</h3>
            <Badge color="primary"><p style={{'font-size': '15px'}} >Los campos marcados con un asterisco (*) son obligatorios.</p></Badge>
          </ModalHeader>
          <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <Input type="text" id="id" name="id" value={this.props.id} hidden></Input>
                        </FormGroup>
                        {this.state.beneficiaries.map((beneficiary) => (
                <>
                            <Input type="text" id="headquarter_id" name="headquarter_id" value={beneficiary.headquarter_id} hidden></Input>
                            <Input type="text" id="nombreCompleto" name="nombreCompleto" value={beneficiary.nombreCompleto} hidden></Input>
                            <Input type="text" id="apodo" name="apodo" value={beneficiary.apodo} hidden></Input>
                            <Input type="text" id="fechaNacimiento" name="fechaNacimiento" value={beneficiary.fechaNacimiento} hidden></Input>
                            <Input type="text" id="edadMental" name="edadMental" value={beneficiary.edadMental} hidden></Input>
                            <Input type="text" id="fechaIngreso" name="fechaIngreso" value={beneficiary.fechaIngreso} hidden></Input>
                            <Input type="text" id="motivoIngreso" name="motivoIngreso" value={beneficiary.motivoIngreso} hidden></Input>
                            <Input type="text" id="numCurp" name="numCurp" value={beneficiary.numCurp} hidden></Input>
                            <Input type="text" id="canalizador" name="canalizador" value={beneficiary.canalizador} hidden></Input>
                            <Input type="text" id="dxMedico" name="dxMedico" value={beneficiary.dxMedico} hidden></Input>
                            <Input type="text" id="vinculosFam" name="vinculosFam" value={beneficiary.vinculosFam} hidden></Input>
                            </>
                ))}
                        <FormGroup>
                            <Label htmlFor="fechaEgreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de egreso:</Label>
                            <Input type="date" id="fechaEgreso" name="fechaEgreso" onChange={this.handleChange}></Input>
                            {errors.fechaEgreso.length > 0 && <span className='error'>{errors.fechaEgreso}</span> 
                                || 
                            errors.fechaEgreso.length == 0 && <span className='error'>{errors.fechaEgreso}</span>}
                        </FormGroup>

                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                            <Label htmlFor="destino">&nbsp;Destino:</Label>
                            <Input type="text" id="destino" name="destino" onChange={this.handleChange}></Input>
                            {errors.destino.length > 0 && <span className='error'>{errors.destino}</span> 
                                || 
                                errors.destino.length == 0 && <span className='error'>{errors.destino}</span>}
                        </FormGroup>

                        <FormGroup>
                            <Label htmlFor="motivoEgreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'comment']} />&nbsp;Motivo:</Label>
                            <Input type="textarea" id="motivoEgreso" name="motivoEgreso" onChange={this.handleChange}></Input>
                            {errors.motivoEgreso.length > 0 && <span className='error'>{errors.motivoEgreso}</span> 
                                || 
                                errors.motivoEgreso.length == 0 && <span className='error'>{errors.motivoEgreso}</span>}
                        </FormGroup>

                        <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-upload']} />
                            <Label htmlFor="hojaEgreso">&nbsp;Hoja de egreso:</Label>
                            <CustomInput id="hojaEgreso" type="file" label="Seleccionar archivo..."></CustomInput>
                            <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                        </FormGroup>
                    </Col>
                </Row>
        </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={()=>this.setState({modalEgresar: false})}>Cancelar</Button>
              <Button color="danger" type="submit">Egresar</Button>
            </ModalFooter>
            </Form>
          </Modal>
  </div>
  );
}
}
