import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';

//Components
import Form from "react-bootstrap/Form";
import SimpleTooltip from "../General/SimpleTooltip";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Card, Input, CardBody, FormGroup, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup} from 'reactstrap';

//API calls
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import Swal from 'sweetalert2';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

// REGEX FOR VALIDATIONS
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+[\w]+$/);
const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+[\w]+$/);
const validAmount = RegExp(/^((0?\.((0[1-9])|[1-9]\d))|([1-9]\d*(\.\d{2})?))$/);
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

//SELECT FOR HEADQUARTERS
function parseSede(sedes){
  return sedes.map((sede) => {
    return { label: sede.nombre, value: sede.id };
  });
}

export default class RegisterExpense extends Component {
    
  //CALL PARA SELECT 
    getSedes() {
      axios.get(API_BASE_URL + 'headquarters')
      .then(res => this.setState({ sedes: parseSede(res.data) }));
    }

    crearSelect(){
        var sel='<option value="0" selected>Selecciona una opción...</option>';
        const num=1;
        axios.get(API_BASE_URL + "categories").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectCategory").innerHTML=sel; 
      });
    }
    
    state={
        modalEliminar: false,
    }

    constructor(props){
        super(props);
        this.state = {
            formValid: false,
            errorCount: null,
            fecha: null,
            pagoA: null,
            monto: null,
            descripcion: null,
            nombre: null,
            sedes: [],
            errors: {
                fecha: '',
                pagoA: '',
                descripcion: '',
                monto: '',
                nombre: '',
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
            case 'fecha': 
            errors.fecha =
            value.length < 1
              ? "La fecha del egreso es un campo requerido."
              : "" ||
            validDate.test(value)
              ? "La fecha ingresada no es válida."
              : "";
            break;
            case 'pagoA': 
            errors.pagoA =
            value.length < 1
              ? "El receptor del egreso es requerido."
              : "" || value.length > 70
              ? "El campo permite máximo 70 caracteres."
              : "" || validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
            break;
            case 'descripcion': 
            errors.descripcion =
            value.length > 200
              ? "El campo permite máximo 200 caracteres."
              : "" || validAlphanumericInput.test(value)
              ? ""
              : "El campo solo acepta letras y números.";
            break;
            case 'monto': 
            errors.monto =
            value.length < 1
              ? "El monto del egreso es un campo requerido."
              : "" ||
            value.length > 10
              ? "El campo permite un número de hasta 10 cifras."
              : "" || 
            validAmount.test(value)
              ? ""
              : "El campo solo acepta números representativos de montos de dinero.";
            break;
            case 'nombre': 
            errors.nombre =
            value.length === 0
              ? "El nombre de la categoría es requerido."
              : "" ||
            value.length > 30
              ? "El campo permite máximo 30 caracteres."
              : "" || validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
            break;
            default:
                break;
        }
    
        this.setState({errors, [name]: value});
    }

    onSubmit(e){
        e.preventDefault();

        if(validateForm(this.state.errors)) {
        //Agarrar los valores 
        let fecha = document.getElementById("fecha").value;
        let pagoA = document.getElementById("pagoA").value;
        let descripcion = document.getElementById("descripcion").value;
        let monto = document.getElementById("monto").value;
        let category_id = document.getElementById("selectCategory").value;
        let headquarter_id = document.getElementById("sede").value;

        if(fecha === '' || pagoA === '' || monto === '' || category_id === '0' || headquarter_id === '0'){
          Swal.fire(
            'ERROR!',
            'Verifica que los campos obligatorios estén completos.',
            'error'
        )
        }else{
          const expense = {
            category_id: category_id,
            fecha: fecha,
            pagoA: pagoA,
            descripcion: descripcion,
            monto: monto,
            headquarter_id: headquarter_id,
        };

        axios.post(API_BASE_URL + "expenses/", expense).then(res => {console.log(res)});

        Swal.fire(
            '¡Listo!',
            'Egreso registrado de manera exitosa.',
            'success'
            ).then(function() {
                this.props.history.push("admin/Finanzas/MonthlyView");
            });     
        }
      }else{
        Swal.fire(
          '!ERROR!',
          'Verifica que todos los campos sean correctos.',
          'error'
        )
      }
    }

    onPost(e){
        e.preventDefault()
        
        //Agarrar los valores 
        let nombre = document.getElementById("nombre").value;

        if(nombre != ''){
        const category = {
            nombre: nombre,
        };

        axios.post(API_BASE_URL + "categories/", category); 
        //this.setState({modalEliminar: false});

        Swal.fire(
            '¡Listo!',
            'Categoría registrada de manera exitosa',
            'success'
            ).then(function() {
                this.props.history.push("admin/Finanzas/RegisterExpense");
            });
        }else{
                Swal.fire(
                    'ERROR!',
                    'Ingresa alguna categoría',
                    'error'
                )
        }
    }

    componentDidMount() {
      this.getSedes();
      this.crearSelect();
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

        const {errors} = this.state;
        return (
            <div className="content">
              <Prompt
            when={true}
            message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
          />
                <h1 className="title">REGISTRAR EGRESO</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onSubmit={this.onSubmit} autocomplete="off">
                        <FormGroup>
                            <Label htmlFor="sede">* Sede:</Label>
                            <Input type="select" name="sede" id="sede" value={this.state.value} onChange={this.onChange}>
                            <option value="0" selected>Selecciona una opción...</option>
                            {this.state.sedes.map((sede) => <option key={sede.value} value={sede.value}>{sede.label}</option>)}
                            </Input>
                          </FormGroup>

                            <FormGroup>
                                <Label htmlFor="fecha">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha:</Label>
                                <Input type="date" id="fecha" name="fecha" onChange={this.handleChange}></Input>
                                {errors.fecha.length > 0 && <span className='error'>{errors.fecha}</span> 
                                || 
                                 errors.fecha.length == 0 && <span className='error'>{errors.fecha}</span>}
                            </FormGroup>
                            
                            <FormGroup>
                                <Label htmlFor="pagoA">*&nbsp;Pago a:</Label>
                                <Input id="pagoA" placeholder="CEA" onChange={this.handleChange} name="pagoA"></Input>
                                {errors.pagoA.length > 0 && <span className='error'>{errors.pagoA}</span> 
                                || 
                                 errors.pagoA.length == 0 && <span className='error'>{errors.pagoA}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="descripcion">Descripción:</Label>
                                <Input id="descripcion" placeholder="Pago de agua noviembre y octubre" onChange={this.handleChange} name="descripcion"></Input>
                                {errors.descripcion.length > 0 && <span className='error'>{errors.descripcion}</span> 
                                || 
                                 errors.descripcion.length == 0 && <span className='error'>{errors.descripcion}</span>}
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="monto">*&nbsp;<FontAwesomeIcon icon={['fas', 'coins']} />&nbsp;Monto:</Label>
                                <Input id="monto" type="text" placeholder="50000.00" onChange={this.handleChange} name="monto"></Input>
                                {errors.monto.length > 0 && <span className='error'>{errors.monto}</span> 
                                || 
                                 errors.monto.length == 0 && <span className='error'>{errors.monto}</span>}
                            </FormGroup>

                            <Label>Categoría:</Label>
                            <Row>
                                <Col md="11">
                                    <FormGroup>
                                        <Form.Control as="select" id="selectCategory" ></Form.Control>
                                    </FormGroup>
                                    </Col>
                                   <Col md="1">
                                <Button className="float-right" size="sm" id="añadir" onClick={()=>{this.setState({modalEliminar: true})}} color="primary"><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
                                <SimpleTooltip placement="top" target="añadir" >Añadir categoría</SimpleTooltip>
                                </Col>
                            </Row>


                                <Row className="text-center">
                                    <Col md="12">
                                        <Button type="submit">Registrar</Button>
                                    </Col>
                                </Row>
                            </Form> 
                        </CardBody>
                    </Card>


        <Modal isOpen={this.state.modalEliminar}>
        <Form onSubmit={this.onPost} autocomplete="off">
          <ModalHeader>
            <h3 className="title" align="center">Añadir Categoría</h3>
          </ModalHeader>
                <ModalBody>
                    <Label>Nueva categoría:</Label>
                    <Input type="text" id="nombre" name="nombre" onChange={this.handleChange}></Input>
                    {errors.nombre.length > 0 && <span className='error'>{errors.nombre}</span> 
                    || 
                    errors.nombre.length == 0 && <span className='error'>{errors.nombre}</span>}
                </ModalBody>
                <ModalFooter>
                  <Button color="info"onClick={()=>this.setState({modalEliminar: false})}>Cancelar</Button>
                  <Button color="primary" type="submit">Añadir</Button>
                </ModalFooter>
        </Form>
        </Modal>
        <div class="fixed-bottom"  style={{margin: '15px'}}>
                <Link to='../Finanzas/MonthlyView'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button color="primary" id="regresar"><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Regresar</Button>
              </Link>
            </div>

            </div>
        )
    }
}