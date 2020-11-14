import React, { Component } from 'react';
import { Link } from "react-router-dom";

//COMPONENTS
import Form from "react-bootstrap/Form";
import { Badge, Button, Card, CardHeader, CardBody, Row, Progress, Alert, Col, FormGroup, Label, Input, CustomInput } from 'reactstrap';
import Swal from 'sweetalert2';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from 'index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// REGEX FOR VALIDATIONS
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validAge = RegExp(/^[0-9]{1,2}$/);
const validTextArea = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ _:\0-9@]+$/);
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
    (val) => val.length > 0 && (count = count + 1)
  );
  return count;
}

function parseHeadquarters(headquarters){
  return headquarters.map((headquarters) => {
    return { label: headquarters.nombre, value: headquarters.id };
  });
}

export default class ModifyEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: false,
      errorCount: null,
      edadMental: null,
      fechaIngreso: null,
      canalizador: null,
      dxMedico: null,
      vinculosFam: null,
      selectSede: null,
      beneficiaries: [],
      headquarters: [],
      errors: {
        edadMental: '',
        fechaIngreso: '',
        canalizador: '',
        dxMedico: '',
        vinculosFam: '',
        headquarter_id: '',
      }
    };

    this.handleChange = this.handleChange.bind(this);
    //this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  state = {
    beneficiaries: [],
  }

   //REALIZAR PETICIÓN GET PARA OBTENER LOS VALORES ACTUALES
   componentDidMount() {
    let urlElements = window.location.href.split('/');
  console.log(urlElements[6]);
    axios.get(API_BASE_URL + 'beneficiaries/' + urlElements[6])
    .then(res => {
        const beneficiaries = res.data;
        this.setState({ beneficiaries });
        console.log(beneficiaries);
      })

      this.getSede();
  }

  getSede() {
    axios.get('http://localhost:8000/api/headquarters')
    .then(res => this.setState({ headquarters: parseHeadquarters(res.data) }));
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'selectSede':
        errors.selectSede =
          value.length < 1
            ? "La fecha de ingreso de la beneficiaria es requerida"
            : "";
        break;
      case 'fechaIngreso':
        errors.fechaIngreso =
          value.length < 1
            ? "La fecha de ingreso de la beneficiaria es requerida"
            : "" ||
              validDate.test(value)
              ? "La fecha no es correcta"
              : "";
        break;
      case 'canalizador':
        errors.canalizador =
          value.length > 100
            ? "El campo permite máximo 100 caracteres"
            : "" || validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
        break;
      case 'dxMedico':
        errors.dxMedico =
          value.length < 1
            ? "El diagnóstico médico de la beneficiaria es requerido."
            : "" || value.length > 125
              ? "El campo permite máximo 125 caracteres"
              : "" || validTextInput.test(value)
                ? ""
                : "El campo solo acepta letras.";
        break;
      case 'edadMental':
        errors.edadMental =
          value.length > 2
            ? "El campo permite un número de hasta 2 cifras"
            : "" ||
              validAge.test(value)
              ? ""
              : "El campo solo acepta numeros.";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  onSubmit(e){
    
    e.preventDefault()

    //Agarrar los valores 
    let id = document.getElementById("id").value;
    let sede = document.getElementById("headquarters").value;
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

    if(vinculosFam !== ''){
    const beneficiary = {
        id: id,
        status_id: 1,
        headquarter_id: sede,
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
        fechaEgreso: "",
        motivoEgreso: "",
        destino: "",
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

  render() {
    const { errors, formValid } = this.state;

    return (
      <div className="content">
        <Form onSubmit={this.onSubmit} autocomplete="off">
        <h2 className="title">Modificar datos de ingreso</h2>
        <Card>
          <CardHeader>
            <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
          {this.state.beneficiaries.map((beneficiary) => (
                <>
          <Input type="text" id="id" name="id" value={this.props.id} hidden></Input>
                            <Input type="text" id="nombreCompleto" name="nombreCompleto" value={beneficiary.nombreCompleto} hidden></Input>
                            <Input type="text" id="apodo" name="apodo" value={beneficiary.apodo} hidden></Input>
                            <Input type="text" id="numCurp" name="numCurp" value={beneficiary.numCurp} hidden></Input>
                            <Input type="text" id="fechaNacimiento" name="fechaNacimiento" value={beneficiary.fechaNacimiento} hidden></Input>
              
              <FormGroup>
                            <Label htmlFor="headquarters">* Sede: </Label>
                            <Input type="select" name="select" id="headquarters" value={beneficiary.headquarter_id} ref={this.input}> 
                            <option defaultValue="0">Selecciona la sede...</option>
                            {this.state.headquarters.map((headquarters) => <option key={headquarters.value} value={headquarters.value}>{headquarters.label}</option>)}
                            </Input>
                          </FormGroup>
                          
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="fechaIngreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de ingreso:</Label>
                    <Input type="date" id="fechaIngreso" name="fechaIngreso" onChange={this.handleChange} value={beneficiary.fechaIngreso}></Input>
                    {errors.fechaIngreso.length > 0 && <span className='error'>{errors.fechaIngreso}</span>
                      ||
                      errors.fechaIngreso.length == 0 && <span className='error'>{errors.fechaIngreso}</span>}
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="cargaIngreso"><FontAwesomeIcon icon={['fas', 'file-upload']} />&nbsp;Carga de hoja de ingreso:</Label>
                    <CustomInput id="cargaIngreso" type="file" label="Seleccionar archivo...">
                    </CustomInput>
                    <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                  </FormGroup>
                </Col>
              </Row>

              <FormGroup>
                <Label htmlFor="dxMedico">*&nbsp;<FontAwesomeIcon icon={['fas', 'notes-medical']} />&nbsp;Diagnóstico médico:</Label>
                <Input maxLength="125" id="dxMedico" placeholder="Parálisis cerebral" name="dxMedico" onChange={this.handleChange} value={beneficiary.dxMedico}></Input>
                {errors.dxMedico.length > 0 && <span className='error'>{errors.dxMedico}</span>
                  ||
                  errors.dxMedico.length == 0 && <span className='error'>{errors.dxMedico}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="motivoIngreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'notes-medical']} />&nbsp;Motivo de ingreso:</Label>
                <Input id="motivoIngreso" placeholder="motivo de ingreso" name="motivoIngreso" onChange={this.handleChange} value={beneficiary.motivoIngreso}></Input>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edadMental">Edad mental:</Label>
                <Input id="edadMental" type="number" min="1" max="100" name="edadMental" onChange={this.handleChange} value={beneficiary.edadMental}></Input>
                {errors.edadMental.length > 0 && <span className='error'>{errors.edadMental}</span>
                  ||
                  errors.edadMental.length == 0 && <span className='error'>{errors.edadMental}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="canalizador">Canalizador:</Label>
                <Input id="canalizador" placeholder="Estefanía Ortíz" name="canalizador" onChange={this.handleChange} value={beneficiary.canalizador}></Input>
                {errors.canalizador.length > 0 && <span className='error'>{errors.canalizador}</span>
                  ||
                  errors.canalizador.length == 0 && <span className='error'>{errors.canalizador}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="vinculosFam">Vínculos familiares:</Label>
                <Input id="vinculosFam" type="textarea" name="vinculosFam" onChange={this.handleChange} value={beneficiary.vinculosFam}></Input>
                {errors.vinculosFam.length > 0 && <span className='error'>{errors.vinculosFam}</span>
                  ||
                  errors.vinculosFam.length == 0 && <span className='error'>{errors.vinculosFam}</span>}
              </FormGroup>
            </>
                ))}
          </CardBody>
        </Card>
        <Row>
          <Col md="12" align="center">
            <Link to='/admin/Beneficiarias/RegisterB3'>
              <Button type="submit" >Modificar</Button>
            </Link>
          </Col>
        </Row>
        </Form>
      </div>
    );
  }
}