import React, { Component } from "react";
import { Input} from "reactstrap"
import { Link } from "react-router-dom";
import { Prompt } from 'react-router';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import { Row, Modal, Form, FormGroup,  Dropdown,Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleTooltip from "../General/SimpleTooltip";
import axios from "axios";
import Swal from 'sweetalert2';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Progress, Alert,  Card, CardBody, CardHeader } from "reactstrap";

library.add(fas)


const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/); //Solo letras al menos 3 caracteres
const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+$/); //acepta numeros y letras y saltos de linea
const validMoney = RegExp(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/); 
const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
const validateForm = (errors) => {  let valid = true;  Object.values(errors).forEach(    (val) => val.length > 0 && (valid = false)  );  return valid;}

//form de registerDonation
class RegistroDonacion extends Component {
   
  //const {id}= props.match.params;  
  constructor(props){
        super(props)
        this.state = {
          fecha: null,
          monto: null,
          descripcion: null,
          errors: {
            fecha: '',
            monto: '',
            descripcion: '',
          }
        };
      this.onSubmit= this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);

    }
   
    crearSelectTipoDonacion(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        axios.get(API_BASE_URL+"tipodonacion").then(function(resp){
           resp.data.forEach(element =>{
          sel = sel.concat('<option value="'+ element.id + ' " > '+ element.nombre+'</option>');
          //console.log(element.nombre);
        });
        document.getElementById("tipoDonacion").innerHTML=sel; 
      });
      }

     

    onSubmit(e){

        e.preventDefault()
      //agarrrar los valores con el id del forms
        var fecha = document.getElementById("fecha").value;
        var  monto= document.getElementById("monto").value;
        var descripcion = document.getElementById("descripcion").value;
        var tipoDonacion = document.getElementById("tipoDonacion").value;
        if(validateForm(this.state.errors)) {

        if (fecha!="" && monto !="" && descripcion !="" && tipoDonacion !=""){
           //nombre + F de facturacion
        const donacion = {
          fechaDonacion: fecha,
          descripcion: descripcion,
          monto: monto,
          idTipoDonacion:tipoDonacion

        };
        
        
        localStorage.setItem("prueba", JSON.stringify(donacion));
        var jsonArray0 = JSON.parse(localStorage.getItem("donante"));
        var jsonArray1 = JSON.parse(localStorage.getItem("prueba"));
        const jsonArray= {...jsonArray0,...jsonArray1};
        //console.log(jsonArray0);
        localStorage.clear();

       // var jsonArray3=  JSON.parse(localStorage.getItem("prueba"));

      

        axios.post(API_BASE_URL+'donaciones', jsonArray).then(res => {console.log(res)});
        
       //validacion
      
       Swal.fire(
        '¡Listo!',
        'Datos guardados',
        'success'
        ).then(function() {
            this.props.history.push("admin/ViewDonors");
        });
        } else {
          Swal.fire( {
            icon: 'error',
            title: '¡ERROR!',
            text: 'Verifica que todos los campos obligatorios estén completos.',
          })
     
        
        }
      }else{    Swal.fire(      '!ERROR!',      'Verifica que todos los campos sean correctos.',      'error'    )  }

      
    }
    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
  
      switch (name) {
        case 'descripcion':
          errors.descripcion =
            value.length < 5
              ? 'Recuerda ingresar la descripción con cantidades'
              : '' ||  validAlphanumericInput.test(value)
              ? ""
              : "El campo solo acepta números y letras.";
          break;
          case 'monto': 
              errors.monto =
              validMoney.test(value)
               ? ""
                : "El campo solo acepta números.";
              break;
        
          case 'fecha':
            errors.fecha =
            "" ||
            validDate.test(value)
            ? "La fecha no es correcta"
            : "";
            break;
        default:
          break;
      }
      this.setState({ errors, [name]: value });
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      if (validateForm(this.state.errors)) {
        console.info('Valid Form')
      } else {
        console.error('Invalid Form')
      }
    }
    componentDidMount(){
      this.crearSelectTipoDonacion();

    }
    render() { 
        const { errors } = this.state;

        return ( 
<div className="justify-content-center">
<Prompt
            when={true}
            message="Te encuentras en proceso de registro... ¿Estás segur@ de querer salir?"
          />
        <div class="container-fluid ">
          <h1 className="title">Registrar Donación</h1>
          <Card>
          <CardHeader>
          <h3 align="center" className="title">Datos Donación</h3>
          <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
            <div class="container">

            <Form autoComplete="off">
              <Form.Row>
                <Form.Group as={Col} >
                  <Form.Label>*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;FECHA EN QUE SE REALIZÓ</Form.Label>
                  <Form.Control name="fecha" id="fecha" type="date"  placeholder=" / / " />
                  {errors.fecha.length > 0 &&
                    <span className='error'>{errors.fecha}</span>}
                </Form.Group>
              
                
              <FormGroup name="tipoDonacion"  as={Col}>
         <label>* SELECCIONE TIPO DE DONACIÓN:</label>
         <Form.Control as="select" id="tipoDonacion" name="tipoDonacion" >
         

         </Form.Control>
        </FormGroup>

       </Form.Row>
               
              
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>*&nbsp;<FontAwesomeIcon icon={['fas', 'money-bill']} />&nbsp;MONTO:</Form.Label>
                  <Form.Control type="text" id="monto" name="monto"placeholder="$3,000.00" onChange={this.handleChange} />{errors.monto.length > 0 &&
                    <span className='error'>{errors.monto}</span>}
                
                </Form.Group>
              
              <Form.Group as={Col} >
                <Form.Label>* DESCRIPCIÓN:</Form.Label>
                <Form.Control type="text" id="descripcion" name="descripcion"placeholder="15 paquetes de arroz, 3 latas de atún y 5kg de frijols" onChange={this.handleChange} /> {errors.descripcion.length > 0 &&
                    <span className='error'>{errors.descripcion}</span>}
              </Form.Group>
              </Form.Row>
              <div class="row justify-content-center">

              <Form.Row>
                <Link to='/admin/ViewDonors'>
              <Form.Group as={Col} >
              <Button type="submit" class="danger">Cancelar</Button>
              </Form.Group>
              </Link>
              <Form.Group as={Col} >
              <Button onClick={this.onSubmit} type="submit">Registrar</Button>
              </Form.Group>
              </Form.Row>
</div>
              

          </Form>
         </div>
         </CardBody>
         </Card>
            </div>
            </div>
          
         );
    }
}

 
export default RegistroDonacion;