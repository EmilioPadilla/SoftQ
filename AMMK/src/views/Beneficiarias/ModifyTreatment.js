import React, { Component } from 'react';

//COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, Col, Label, Input, FormGroup, Row, Button, Form, ModalHeader, Badge} from 'reactstrap';
import Swal from 'sweetalert2';

//API CALLS
import axios from "axios";
import { API_BASE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

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

const countErrors = (errors) => {
  let count = 0;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (count = count+1)
  );
  return count;
}

export default class ReenterB extends Component {
  constructor(props){
    super(props);
    this.state = {
        formValid: false,
        errorCount: null,
        fechaInicio: null,
        fechaTermino: null,
        treatments: [],
        errors: {
            fechaInicio: '',
            fechaTermino: '',
        }
      };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
}
  state={
    modalEditar: false,
    treatments: [],
  }

  componentDidMount() {
    let id = this.props.id;
    console.log(id);
    axios.get(API_BASE_URL + 'treatments/' + id)
    .then(res => {
        const treatments = res.data;
        this.setState({ treatments });
        console.log(treatments);
      })
  }
  
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
        case 'fechaInicio': 
        errors.fechaInicio =
        value.length < 1
          ? "La fecha de reingreso es un campo obligatorio"
          : "" ||
        validDate.test(value)
          ? "La fecha ingresada no es válida"
          : "";
        break;
        case 'fechaTermino': 
        errors.fechaTermino =
        value.length < 1
          ? "La fecha de fin del tratamiento es un campo obligatorio"
          : "" ||
        validDate.test(value)
          ? "La fecha ingresada no es válida"
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
    let id = document.getElementById("id").value;
    let beneficiary_id = document.getElementById("beneficiary_id").value;
    let nombreMed = document.getElementById("nombreMed").value;
    let funcionMed = document.getElementById("funcionMed").value;
    let dosis = document.getElementById("dosis").value;
    let mode_id = document.getElementById("mode_id").value;
    let lapso = document.getElementById("lapso").value;
    let fechaInicio = document.getElementById("fechaInicio").value;
    let fechaTermino = document.getElementById("fechaTermino").value;
    if(fechaInicio !== ''){
    const treatment = {
        id: id,
        beneficiary_id: beneficiary_id,
        funcionMed: funcionMed,
        nombreMed: nombreMed,
        dosis: dosis,
        mode_id: mode_id,
        lapso: lapso,
        fechaInicio: fechaInicio,
        fechaTermino: fechaTermino,
    };
    axios.put(API_BASE_URL + "treatments/" + id, treatment).then(res => {console.log(res)});
    
    Swal.fire(
        '¡Listo!',
        'Reingreso registrado de manera exitosa',
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
    const {errors, formValid} = this.state;
  return (
    <div className="content">
      <Button color="secondary" size="sm" onClick={()=>{this.setState({modalEditar: true})}}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>

          <Modal isOpen={this.state.modalEditar}>
          <Form onSubmit={this.onSubmit} autocomplete="off">
          <ModalHeader>
            <h3 className="title">MODIFICAR TRATAMIENTO</h3>
            <Badge color="primary"><p style={{'font-size': '15px'}} >Los campos marcados con un asterisco (*) son obligatorios.</p></Badge>
          </ModalHeader>
          <ModalBody>
                  <Row>
                    <Col md="12">
                    {this.state.treatments.map((treatment) => (
                <>
                            <Input type="text" id="id" name="id" value={treatment.id} ></Input>
                            <Input type="text" id="beneficiary_id" name="beneficiary_id" value={treatment.beneficiary_id} ></Input>
                            <Input type="text" id="nombreMed" name="nombreMed" value={treatment.nombreMed} hidden></Input>
                            <Input type="text" id="funcionMed" name="funcionMed" value={treatment.funcionMed} hidden></Input>
                            <Input type="text" id="dosis" name="dosis" value={treatment.dosis} hidden></Input>
                            <Input type="text" id="mode_id" name="mode_id" value={treatment.mode_id} hidden></Input>
                            <Input type="text" id="lapso" name="lapso" value={treatment.lapso} hidden></Input>
                            </>
                ))}
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                            <Label for="fechaInicio">&nbsp;Fecha de inicio:</Label>
                            <Input type="date" id="fechaInicio" name="fechaTermino" onChange={this.handleChange}></Input>
                            {errors.fechaInicio.length > 0 && <span className='error'>{errors.fechaInicio}</span> 
                                || 
                                 errors.fechaInicio.length == 0 && <span className='error'>{errors.fechaInicio}</span>}
                        </FormGroup>
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                            <Label for="fechaTermino">&nbsp;Fecha de finalización:</Label>
                            <Input type="date" id="fechaTermino" name="fechaTermino" onChange={this.handleChange}></Input>
                            {errors.fechaTermino.length > 0 && <span className='error'>{errors.fechaTermino}</span> 
                                || 
                                 errors.fechaTermino.length == 0 && <span className='error'>{errors.fechaTermino}</span>}
                        </FormGroup>
                    </Col>
                </Row>
        </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={()=>this.setState({modalEditar: false})}>Cancelar</Button>
              <Button color="secondary" type="submit">Modificar</Button>
            </ModalFooter>
            </Form>
          </Modal>
  </div>
  );
}
}