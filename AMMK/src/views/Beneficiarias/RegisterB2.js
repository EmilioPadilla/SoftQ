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
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/); //Fechas válidas
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/); //Solo letras al menos 3 caracteres
const validAge = RegExp(/^[0-9]{1,2}$/); //edad valida del 0 99

//SELECT FOR HEADQUARTERS
function parseSede(sedes){
  return sedes.map((sede) => {
    return { label: sede.nombre, value: sede.id };
  });
}

export default class RegisterB2 extends Component {

  //CALL PARA SELECT 
  getSedes() {
    axios.get(API_BASE_URL + 'headquarters')
    .then(res => this.setState({ sedes: parseSede(res.data) }));
  }

  constructor(props) {
    super(props);
    this.state = {
      edadMental: null,
      fechaIngreso: null,
      canalizador: null,
      dxMedico: null,
      vinculosFam: null,
      sedes: [],
      errors: {
        edadMental: '',
        fechaIngreso: '',
        canalizador: '',
        dxMedico: '',
        vinculosFam: '',
        sedes: '',
      }
    };

    //FOR VALIDATIONS
    this.handleChange = this.handleChange.bind(this);

    //TO MAKE REGISTRATION
    this.onSubmit = this.onSubmit.bind(this);
  }

  //ERROR VALIDATION IN INPUTS
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'sedes':
        errors.sedes =
          value.length < 1
            ? "La sede de la beneficiaria es requerida"
            : "";
        break;
      case 'fechaIngreso':
        errors.fechaIngreso =
          value.length < 1
            ? "La fecha de ingreso de la beneficiaria es requerida"
            : "" ||
              validDate.test(value)
              ? "La fecha ingresada es inválida."
              : "";
        break;
      case 'canalizador':
        errors.canalizador =
          value.length > 100
            ? "El campo permite máximo 100 caracteres"
            : "" || value.length < 3
            ? "El campo debe contener al menos 3 caracteres."
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
              : "" || value.length < 3
              ? "El campo debe contener al menos 3 caracteres."
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

  onSubmit(e) {
    e.preventDefault()

    //Agarrar los valores 
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    let edadMental = document.getElementById("edadMental").value;
    let canalizador = document.getElementById("canalizador").value;
    let vinculosFam = document.getElementById("vinculosFam").value;
    let dxMedico = document.getElementById("dxMedico").value;
    let sede = document.getElementById("sede").value;

    if (fechaIngreso !== '' && dxMedico !== '' && sede !== '') {
    
     const datosIngreso = {
      fechaIngreso: fechaIngreso,
      edadMental: edadMental,
      canalizador: canalizador,
      vinculosFam: vinculosFam,
      dxMedico: dxMedico,
      headquarter_id: sede,
    };

    localStorage.setItem("ingreso", JSON.stringify(datosIngreso));
    let jsonArray1 = JSON.parse(localStorage.getItem("personal"));
    let jsonArray2 = JSON.parse(localStorage.getItem("ingreso"));

    const jsonArray = {...jsonArray1, ...jsonArray2};
    console.log(jsonArray);
    localStorage.clear();

    axios.post(API_BASE_URL + "beneficiaries/", jsonArray); 

    Swal.fire(
      '¡Listo!',
      'Beneficiaria registrada de manera exitosa',
      'success'
      ).then(function() {
        window.location = "http://localhost:3000/admin/Beneficiarias/GeneralViewAdmin";
      });
    } else{
      Swal.fire( {
        icon: 'error',
        title: 'Oops...',
        text: 'No se han llenado todos los campos obligatorios!',
      })
    }
  }

  componentDidMount() {
    this.getSedes();
  }

  render() {
    
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
    const { errors } = this.state;

    return (
      <div className="content">
        <h2 className="title">Registrar Beneficiaria</h2>
        <Form onSubmit={this.onSubmit} autocomplete="off">
        <Card>
          <CardHeader>
            <h3 className="title">Datos de ingreso</h3>
            <Progress striped color="primary" value="66.66"></Progress>
            <br></br>
            <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
              <FormGroup>
                            <Label htmlFor="sede">* Sede:</Label>
                            <Input type="select" name="sede" id="sede" value={this.state.value} onChange={this.onChange}>
                            <option defaultValue="0">Selecciona una opción...</option>
                            {this.state.sedes.map((sede) => <option key={sede.value} value={sede.value}>{sede.label}</option>)}
                            </Input>
                          </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Label htmlFor="fechaIngreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de ingreso:</Label>
                    <Input type="date" id="fechaIngreso" name="fechaIngreso" onChange={this.handleChange}></Input>
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
                <Input maxLength="125" id="dxMedico" placeholder="Parálisis cerebral" name="dxMedico" onChange={this.handleChange}></Input>
                {errors.dxMedico.length > 0 && <span className='error'>{errors.dxMedico}</span>
                  ||
                  errors.dxMedico.length == 0 && <span className='error'>{errors.dxMedico}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="edadMental">Edad mental:</Label>
                <Input id="edadMental" type="number" min="1" max="100" name="edadMental" onChange={this.handleChange} ></Input>
                {errors.edadMental.length > 0 && <span className='error'>{errors.edadMental}</span>
                  ||
                  errors.edadMental.length == 0 && <span className='error'>{errors.edadMental}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="canalizador">Canalizador:</Label>
                <Input id="canalizador" placeholder="Estefanía Ortíz" name="canalizador" onChange={this.handleChange}></Input>
                {errors.canalizador.length > 0 && <span className='error'>{errors.canalizador}</span>
                  ||
                  errors.canalizador.length == 0 && <span className='error'>{errors.canalizador}</span>}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="vinculosFam">Vínculos familiares:</Label>
                <Input id="vinculosFam" type="textarea" name="vinculosFam" onChange={this.handleChange}></Input>
                {errors.vinculosFam.length > 0 && <span className='error'>{errors.vinculosFam}</span>
                  ||
                  errors.vinculosFam.length == 0 && <span className='error'>{errors.vinculosFam}</span>}
              </FormGroup>
          </CardBody>
        </Card>
        <Row>
          <Col md="6" align="left">
            <Link to='/admin/Beneficiarias/RegisterB1'>
              <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Anterior</Button>
            </Link>
          </Col>
          <Col md="6" align="right">
            <Button type="submit">Registrar</Button>
          </Col>
        </Row>
        </Form>
      </div>
    );
  }
}