import React, { Component } from 'react';

//COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, Col, Label, Input, FormGroup, Row, Button, Form, ModalHeader, Badge } from 'reactstrap';
import Swal from 'sweetalert2';
import SimpleTooltip from "../General/SimpleTooltip";

//API CALLS
import axios from "axios";
import { API_BASE_URL, FRONT_BASE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

// REGEX FOR VALIDATIONS
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

//FORM VALIDATION
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default class ReenterB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      fechaIngreso: null,
      motivoIngreso: null,
      beneficiaries1: [],
      errors: {
        fechaIngreso: '',
        motivoIngreso: '',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  state = {
    modalReingresar: false,
    beneficiaries1: []
  }

  componentDidMount() {
    let id = this.props.name;
    console.log(id);
    axios.get(API_BASE_URL + 'beneficiaries/' + id)
      .then(res => {
        const beneficiaries1 = res.data;
        this.setState({ beneficiaries1 });
        console.log(beneficiaries1);
      })
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'fechaIngreso':
        errors.fechaIngreso =
          value.length < 1
            ? "La fecha de reingreso es un campo obligatorio."
            : "" ||
              validDate.test(value)
              ? "La fecha no es correcta"
              : "";
        break;
      case 'motivoIngreso':
        errors.motivoIngreso =
          value.length < 1
            ? "El motivo de reingreso es un campo obligatorio."
            : "" ||
              validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
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
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    let motivoIngreso = document.getElementById("motivoIngreso").value;
    let headquarter_id = document.getElementById("headquarter_id").value;
    let nombreCompleto = document.getElementById("nombreCompleto").value;
    let apodo = document.getElementById("apodo").value;
    let numCurp = document.getElementById("numCurp").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let edadMental = document.getElementById("edadMental").value;
    let canalizador = document.getElementById("canalizador").value;
    let dxMedico = document.getElementById("dxMedico").value;
    let vinculosFam = document.getElementById("vinculosFam").value;

    if (fechaIngreso !== '' && motivoIngreso !== '') {
      const beneficiary = {
        id: id,
        status_id: 1,
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
        fechaEgreso: '',
        motivoEgreso: '',
        destino: '',
      };
      axios.put(API_BASE_URL + "beneficiaries/" + id, beneficiary).then(res => { console.log(res) });

      Swal.fire(
        '¡Listo!',
        'Reingreso registrado de manera exitosa',
        'success',
      ).then(function () {
        this.props.history.push("admin/Beneficiarias/GeneralViewAdmin");
      });
    } else {
      Swal.fire(
        '¡ERROR!',
        'Verifica que todos los campos obligatorios estén completos.',
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
    const { errors, formValid } = this.state;
    return (
      <div className="content">
        <Button color="success" size="sm" id="reingresar" onClick={() => { this.setState({ modalReingresar: true }) }}><FontAwesomeIcon icon={faRedoAlt} /></Button>
        <SimpleTooltip placement="top" target="reingresar">Reingresar</SimpleTooltip>

        <Modal isOpen={this.state.modalReingresar}>
          <Form onSubmit={this.onSubmit} autocomplete="off">
            <ModalHeader>
              <h3 className="title" align="center">Reingresar</h3>
              <Badge color="primary"><p style={{ 'font-size': '15px', 'color': 'white' }} >Los campos marcados con un asterisco (*) son obligatorios.</p></Badge>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Input type="text" id="id" value={this.props.name} hidden></Input>
                  </FormGroup>
                  {this.state.beneficiaries1.map((beneficiary) => (
                    <>
                      <Input type="text" id="headquarter_id" name="headquarter_id" value={beneficiary.headquarter_id} hidden></Input>
                      <Input type="text" id="nombreCompleto" name="nombreCompleto" value={beneficiary.nombreCompleto} hidden></Input>
                      <Input type="text" id="apodo" name="apodo" value={beneficiary.apodo} hidden></Input>
                      <Input type="text" id="fechaNacimiento" name="fechaNacimiento" value={beneficiary.fechaNacimiento} hidden></Input>
                      <Input type="text" id="edadMental" name="edadMental" value={beneficiary.edadMental} hidden></Input>
                      <Input type="text" id="numCurp" name="numCurp" value={beneficiary.numCurp} hidden></Input>
                      <Input type="text" id="canalizador" name="canalizador" value={beneficiary.canalizador} hidden></Input>
                      <Input type="text" id="dxMedico" name="dxMedico" value={beneficiary.dxMedico} hidden></Input>
                      <Input type="text" id="vinculosFam" name="vinculosFam" value={beneficiary.vinculosFam} hidden></Input>
                    </>
                  ))}
                  <FormGroup>
                    <Label for="fechaIngreso">*&nbsp;<FontAwesomeIcon icon={["fas", "calendar-alt"]} />&nbsp;Fecha de reingreso:</Label>
                    <Input type="date" id="fechaIngreso" name="fechaIngreso" onChange={this.handleChange}></Input>
                    {errors.fechaIngreso.length > 0 && <span className='error'>{errors.fechaIngreo}</span>
                      ||
                      errors.fechaIngreso.length == 0 && <span className='error'>{errors.fechaIngreso}</span>}
                  </FormGroup>
                  <FormGroup>
                    <Label for="motivo">*&nbsp;Motivo de reingreso</Label>
                    <Input type="textarea" name="motivoIngreso" id="motivoIngreso" placeholder="Maltrato y abuso físico en su hogar" onChange={this.handleChange}></Input>
                    {errors.motivoIngreso.length > 0 && <span className='error'>{errors.motivoIngreso}</span>
                      ||
                      errors.motivoIngreso.length == 0 && <span className='error'>{errors.motivoIngreso}</span>}
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={() => this.setState({ modalReingresar: false })}>Cancelar</Button>
              <Button color="success" type="submit">Reingresar</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}