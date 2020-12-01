import React, { Component } from 'react';

//COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, Col, Label, Input, FormGroup, Row, Button, Form, ModalHeader, Badge, CustomInput } from 'reactstrap';
import Swal from 'sweetalert2';
import SimpleTooltip from "../General/SimpleTooltip";

//API CALLS
import axios from "axios";
import { API_BASE_URL, FRONT_BASE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// REGEX FOR VALIDATIONS
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default class ModifyTakeOut extends Component {

  fillData() {
    let id = this.props.id;
    console.log(API_BASE_URL + 'beneficiaries/' + id);
    axios.get(API_BASE_URL + 'beneficiaries/' + id)
      .then(function (res) {
        document.getElementById("fechaEgreso").value = res.data[0].fechaEgreso;
        document.getElementById("motivoEgreso").value = res.data[0].motivoEgreso;
        document.getElementById("destino").value = res.data[0].destino;
      })
  }

  constructor(props) {
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
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
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

    this.setState({ errors, [name]: value });
  }

  onSubmit(e) {

    e.preventDefault();
    
    if(validateForm(this.state.errors)) {
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

    if (fechaEgreso !== '' && motivoEgreso !== '') {
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
      axios.put(API_BASE_URL + "beneficiaries/" + id, beneficiary).then(res => { console.log(res) });

      Swal.fire(
        '¡Listo!',
        'Egreso registrado de manera exitosa',
        'success',
      ).then(function () {
        this.props.history.push("admin/Beneficiarias/GeneralViewAdmin");
      });
    } else {
      Swal.fire(
        'ERROR!',
        'Verifica que los campos obligatorios estén llenos',
        'error'
      )
    }
  }else{
    Swal.fire(
      '!ERROR!',
      'Verifica que todos los campos sean correctos.',
      'error'
    )
  }
  }


  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
        if (!login ) {
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
    }
    const { errors } = this.state;
    return (
      <div className="content">
        <Button color="info" className="float-right" size="sm" id="editar" onClick={() => { this.setState({ modalEgresar: true }) }}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
        <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>

        <Modal isOpen={this.state.modalEgresar}>
          <Form onSubmit={this.onSubmit} autocomplete="off">
            <ModalHeader className="text-center">
              <h3 className="title">MODIFICAR EGRESO</h3>
              <Badge color="primary"><p style={{ 'font-size': '15px', 'color': 'white' }} >Los campos marcados con un asterisco (*) son obligatorios.</p></Badge>
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
                  <Row>
                    <Col md="6">
                    <FormGroup>
                    <Label htmlFor="fechaE">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de egreso:</Label>
                    <Input type="date" id="fechaE" name="fechaE" value={beneficiary.fechaEgreso} disabled></Input>
                  </FormGroup>
                    </Col>
                    <Col md="6">
                    <FormGroup>
                    <Label htmlFor="fechaEgreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Nueva fecha de egreso:</Label>
                    <Input type="date" id="fechaEgreso" name="fechaEgreso" onChange={this.handleChange}></Input>
                    {errors.fechaEgreso.length > 0 && <span className='error'>{errors.fechaEgreso}</span>
                      ||
                      errors.fechaEgreso.length == 0 && <span className='error'>{errors.fechaEgreso}</span>}
                  </FormGroup>
                    </Col>
                  </Row> 
                  <Row>
                    <Col md="6">
                    <FormGroup>
                    <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                    <Label htmlFor="dest">&nbsp;Destino:</Label>
                    <Input type="text" id="dest" name="dest" value={beneficiary.destino} disabled></Input>
                  </FormGroup>
                    </Col>
                    <Col md="6">
                    <FormGroup>
                    <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                    <Label htmlFor="destino">&nbsp;Nuevo destino:</Label>
                    <Input type="text" id="destino" name="destino" onChange={this.handleChange} ></Input>
                    {errors.destino.length > 0 && <span className='error'>{errors.destino}</span>
                      ||
                      errors.destino.length == 0 && <span className='error'>{errors.destino}</span>}
                  </FormGroup>
                    </Col>
                  </Row> 
                  <Row>
                    <Col md="6">
                    <FormGroup>
                    <Label htmlFor="motivoE">&nbsp;Motivo:</Label>
                    <Input type="textarea" id="motivoE" name="motivoE" value={beneficiary.motivo} disabled></Input>
                  </FormGroup>
                    </Col>
                    <Col md="6">
                    <FormGroup>
                    <Label htmlFor="motivoEgreso">*&nbsp;Nuevo motivo:</Label>
                    <Input type="textarea" id="motivoEgreso" name="motivoEgreso" onChange={this.handleChange}></Input>
                    {errors.motivoEgreso.length > 0 && <span className='error'>{errors.motivoEgreso}</span>
                      ||
                      errors.motivoEgreso.length == 0 && <span className='error'>{errors.motivoEgreso}</span>}
                  </FormGroup>
                    </Col>
                  </Row>    
                  </>
                  ))}

                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={() => this.setState({ modalEgresar: false })}>Cancelar</Button>
              <Button color="danger" type="submit">Egresar</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}