/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/

import React from "react";
import { Link } from "react-router-dom";
import { Prompt } from 'react-router'
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import Swal from 'sweetalert2';
import axios from 'axios';
import GoBackButton  from '../../components/General/goBackButton.js';


// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Progress,
  Label,
  CustomInput,
  Alert,
  Button
} from "reactstrap";

function parseStates(states){
  return states.map((states) => {
    return { label: states.descripcion, value: states.id };
  });
}

const validTextInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,}$/);
const validEmail = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
const validNumber = RegExp(/^[0-9]*$/);
class RegisterEmployee2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      estados: [],
      ciudad: null, 
      calle: null,
      numExt: null, 
      numInt: null, 
      cp: null, 
      colonia: null,
      municipio: null,
      correo: null, 
      telefono: null,
      celular: null,
      errors: {
        ciudad: '',
        calle: '',
        colonia: '',
        municipio: '',
        correo: '',
    }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  onSubmit(e){
    e.preventDefault()
    //Agarrar los valores 
    let estado = document.getElementById("estadoSelect").value;
    let ciudad = document.getElementById("ciudad").value;
    let calle = document.getElementById("calle").value;
    let numExterior = document.getElementById("numExt").value;
    let numInterior = document.getElementById("numInt").value;
    let codigoPostal = document.getElementById("cp").value;
    let colonia = document.getElementById("colonia").value;
    let municipio = document.getElementById("municipio").value;
    let correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value;
    let celular = document.getElementById("celular").value;

    if (estado !== '' && ciudad !== '' && municipio !== '' && celular !== '') {
    const datosContacto = {
      estado: estado,
      ciudad: ciudad, 
      calle: calle,
      numExterior: numExterior, 
      numInterior: numInterior, 
      codigoPostal: codigoPostal, 
      colonia: colonia,
      municipio: municipio,
      correo: correo, 
      telefono: telefono,
      celular: celular,
      errors: {
        ciudad: '',
        calle: '',
        colonia: '',
        municipio: '',
    }
    };
    localStorage.setItem("contacto", JSON.stringify(datosContacto));
    this.props.history.push("admin/RE3");
  } else{
    Swal.fire( {
      icon: 'error',
      title: '¡Error!',
      text: 'Verifica que todos los campos obligatorios estén completos.',
    })
  }
}

handleChange = (event) => {
  event.preventDefault();
  const { name, value } = event.target;
  let errors = this.state.errors;

  switch (name) {
      case 'ciudad':
          errors.ciudad =
          validTextInput.test(value)
          ? ""
          : "El campo solo acepta letras.";
          break;
      case 'calle':
          errors.calle =
              validTextInput.test(value)
              ? ""
              : "El campo solo acepta letras.";
          break;
      case 'municipio':
          errors.municipio =
          validTextInput.test(value)
          ? ""
          : "El campo solo acepta letras.";
          break;
      case 'colonia':
          errors.colonia =
          validTextInput.test(value)
          ? ""
          : "El campo solo acepta letras.";
          break;
      case 'correo':
          errors.correo =
          validEmail.test(value)
          ? ""
          : "Escribe un correo válido.";
      break;
      case 'num':
          errors.num = 
          validNumber.test(value)
          ? ""
          : "El campo solo acepta numeros.";
      break;
      default:
          break;
  }

  this.setState({ errors, [name]: value });
}

componentDidMount() {
  this.getStates();
}

getStates() {
  axios.get(API_BASE_URL+'Estados')
  .then(res => this.setState({ estados: parseStates(res.data) }));
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
      <>
        <div className="content">
        <Prompt
            when={true}
            message="Te encuentras en proceso de registro                                                ¿Estás seguro de querer salir?"
          />
           <Row>
            <Col >
              <h2 className="title">Registrar empleado</h2>
            </Col>
          </Row>
          <Form autocomplete="off">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                 
                <h3 className="title">Datos de contacto</h3>
                    <Progress value="66.66" striped color="primary"/>
                    <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                  
                </CardHeader>
                <CardBody>
                  
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="estadoSelect">* Estado</Label>
                          <Input type="select" name="select" id="estadoSelect">
                          {this.state.estados.map((estado) => <option key={estado.value} value={estado.value}>{estado.label}</option>)}
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                      <FormGroup>
                          <Label htmlFor="ciudad">* Ciudad</Label>
                          <Input
                            defaultValue=""
                            placeholder="Irapuato"
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            onChange={this.handleChange}
                          />
                          {errors.ciudad.length > 0 && <span className='error'>{errors.ciudad}</span>}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="calle">Calle</Label>
                          <Input
                            defaultValue="Castillo Breton"
                            placeholder=""
                            type="text"
                            id="calle"
                            name="calle"
                            onChange={this.handleChange}
                          />
                          {errors.calle.length > 0 && <span className='error'>{errors.calle}</span>}
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="numExt">#Ext</Label>
                          <Input
                            placeholder="925"
                            type="text"
                            id="numExt"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="numInt">
                            #Int
                          </Label>
                          <Input
                            placeholder="12"
                            type="text"
                            id="numInt"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="2">
                        <FormGroup>
                          <Label htmlFor="cp">
                            C.P
                          </Label>
                          <Input
                            placeholder="36690"
                            type="text"
                            id="cp"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="colonia">Colonia</Label>
                          <Input
                            placeholder="La moderna"
                            type="text"
                            id="colonia"
                            name="colonia"
                            onChange={this.handleChange}
                          />
                          {errors.colonia.length > 0 && <span className='error'>{errors.colonia}</span>}
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="municipio">* Municipio</Label>
                          <Input
                            placeholder="Corregidora"
                            type="text"
                            id="municipio"
                            name="municipio"
                            onChange={this.handleChange}
                          />
                          {errors.municipio.length > 0 && <span className='error'>{errors.municipio}</span>}
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col className="pl-md-1" md="7">
                        <FormGroup>
                        <Label htmlFor="CompDom">Comprobante de Domicilio</Label>
                        <CustomInput type="file" name="customFile" id="CompDom" label="Selecciona un archivo"/>
                        </FormGroup>
                      </Col>
                    </Row> */}
                    <Row>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="correo">Correo</Label>
                          <Input
                            placeholder="mike@email.com" type="email"
                            id="correo"
                            name="correo"
                            onChange={this.handleChange}
                            />
                            {errors.correo.length > 0 && <span className='error'>{errors.correo}</span>}
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="telefono">Teléfono</Label>
                          <Input
                            placeholder="62 69 569" type="tel" id="telefono"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <Label htmlFor="celular">* Celular</Label>
                          <Input
                            placeholder="462 264 2021" type="tel" id="celular"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  
                </CardBody>
              </Card>
              <Row>
              <Col  md="6">
              <Link to='/admin/register-employee'>
                <button className="btn btn-primary" >Regresar</button>
              </Link>
              </Col>
              <Col md="6" align="right">
              <Link to='/admin/RE3'>
                <Button className="btn btn-primary" onClick={this.onSubmit}>Siguiente</Button>
                {this.props.children}
              </Link>
              </Col>
              </Row>
            </Col>
          </Row>
          </Form>

        </div>
      </>
    );
  }
}

export default RegisterEmployee2;
