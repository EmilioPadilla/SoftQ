import React, { Component } from 'react';
import { Link } from "react-router-dom";

//COMPONENTS
import Form from "react-bootstrap/Form";
import { Badge, Button, Card, CardHeader, CardBody, Row, Progress, Alert, Col, FormGroup, Label, Input, CustomInput} from 'reactstrap';
import Swal from 'sweetalert2';

//API CALLS
import Axios from 'axios';
import { API_BASE_URL } from 'index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
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

export default class RegisterB2 extends Component {


    crearSelect(){
        var sel='<option value="0">Selecciona una opción</option>';
        const num=1;
        Axios.get(API_BASE_URL + "headquarters").then(function(resp){
          
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectSede").innerHTML=sel; 
      });
    }

    constructor(props){
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
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
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
              : "" ||value.length > 125
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
    
        this.setState({errors, [name]: value});
    }

    onSubmit(e){
        e.preventDefault()

        //Agarrar los valores 
        let fechaIngreso = document.getElementById("fechaIngreso").value;
        let edadMental = document.getElementById("edadMental").value;
        let canalizador = document.getElementById("canalizador").value;
        let vinculosFam = document.getElementById("vinculosFam").value;
        let dxMedico = document.getElementById("dxMedico").value;
        let sede = document.getElementById("selectSede").value;

        const datosIngreso = {
            fechaIngreso: fechaIngreso,
            edadMental: edadMental,
            canalizador: canalizador,
            vinculosFam: vinculosFam,
            dxMedico: dxMedico,
            headquarter_id: sede,
        };
        localStorage.setItem("ingreso", JSON.stringify(datosIngreso));
    }

    render() {
        this.crearSelect();
        const {errors, formValid} = this.state;

        return (
            <div className="content">
                <h2 className="title">Registrar Beneficiaria</h2>
                <Card>
                    <CardHeader>
                        <h3 className="title">Datos de ingreso</h3>
                        <Progress striped color="primary" value="66.66"></Progress>
                        <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                    </CardHeader>
                    <CardBody>
                        <Form onClick={this.onSubmit} autocomplete="off">
                            <FormGroup>
                                <label>* Seleccione la sede:</label>
                                <Form.Control as="select" id="selectSede" name="selectSede"></Form.Control>
                                
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
                        </Form>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/Beneficiarias/RegisterB1'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link to='/admin/Beneficiarias/RegisterB3'>
                    <Button onClick="onSubmit()">Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}