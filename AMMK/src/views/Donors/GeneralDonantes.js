import React, { Component } from "react";
import { Prompt } from 'react-router';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//COMPONENTS
import Button from "react-bootstrap/Button";
import { FormGroup, Alert, Progress, Card, CardHeader, CardBody } from "reactstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";

//API
import axios from "axios";

export default class GeneralDonantes extends Component {
  /* TIPO DE DONANTE */
  crearSelectTipoDonante() {
    var sel = '<option value="0" selected>Selecciona una opción...</option>';
    axios.get("http://localhost:8000/api/tipodonante/").then(function (resp) {
      console.log(resp.data);
      resp.data.forEach(element => {
        sel = sel.concat('<option value="' + element.id + ' " > ' + element.nombre + '</option>');
      });
      document.getElementById("selectTipoDonante").innerHTML = sel;
    });
  }


  /* TIPO DE RECURRENCIA */
  crearSelectRecurrencia() {
    var sel = '<option value="0" selected>Selecciona una opción...</option>';
    axios.get("http://localhost:8000/api/recurrencia/").then(function (resp) {
      console.log(resp.data);
      resp.data.forEach(element => {
        sel = sel.concat('<option value="' + element.id + ' " > ' + element.nombreR + '</option>');
      });
      document.getElementById("selectRecurrencia").innerHTML = sel;
    });
  }
  //POST DONANTE
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this);
  }
  //validar campos 
    handleInvalidSubmit(event, errors, values) {
    this.setState({ errors, values });
  }

  onSubmit(e) {
    e.preventDefault()
    var tipoDonante = document.getElementById("selectTipoDonante").value;
    console.log(tipoDonante);
    var recurrencia = document.getElementById("selectRecurrencia").value;
    console.log(recurrencia);

    if (tipoDonante === '0' || recurrencia === '0') {
      Swal.fire( {
        icon: 'error',
        title: '¡ERROR!',
        text: 'Verifica que todos los campos obligatorios estén completos.',
      })
    } else {
      const tipoDonante2 = {
        idTipoDonante: tipoDonante
      }
  
      const tipoRecurrencia = {
        idRecurrencia: recurrencia
      }
      localStorage.setItem("tipoDonante2", JSON.stringify(tipoDonante2));
      localStorage.setItem("recurrencia", JSON.stringify(tipoRecurrencia));
      window.location = "http://localhost:3000/admin/RegistroDonante1";
    }
  }


  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    /*if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }*/
    this.crearSelectTipoDonante();
    this.crearSelectRecurrencia();

    return (
      <div className="content">
        <Prompt
            when={true}
            message="Te encuentras en proceso de registro...                                                ¿Estás segur@ de querer salir?"
          />
        <div className="container-fluid">
          <h1 className="title">Registrar Donante</h1>

          <Card>
          <CardHeader>
          <h3 className="title" align="center">Datos Generales</h3>
          <Progress striped color="primary" value="10"></Progress>
          <br></br>
          <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
          </CardHeader>
          <CardBody>
          <Form>
            <FormGroup>
              <label>* Tipo de donante:</label>
              <Form.Control as="select" id="selectTipoDonante" required></Form.Control>
            </FormGroup>
            <FormGroup>
              <label>* Recurrencia de donaciones:</label>
              <Form.Control as="select" id="selectRecurrencia" required></Form.Control>
            </FormGroup>
            <Col align="right">
              <>
                  <Button onClick={this.onSubmit}>Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']} /></Button>
              </>
            </Col>
          </Form>
          </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
