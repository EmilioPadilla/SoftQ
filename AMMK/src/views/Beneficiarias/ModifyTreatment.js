import React, { Component } from 'react';

//COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, Col, Label, Input, FormGroup, Row, Button, Form, ModalHeader, Badge } from 'reactstrap';
import Swal from 'sweetalert2';

//API CALLS
import axios from "axios";
import { API_BASE_URL, FRONT_BASE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class ModifyTreatment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      nombreMed: null,
      funcionMed: null,
      dosis: null,
      mode_id: null,
      lapso: null,
      fechaInicio: null,
      fechaTermino: null,
      treatments: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  fillData() {
    let urlElements = window.location.href.split('/');
    axios.get(API_BASE_URL + 'treatments/' + urlElements[6] + '/med')
      .then(function (res) {
        document.getElementById("nombreMed").value = res.data[1].nombreMed;
        document.getElementById("funcionMed").value = res.data[0].funcionMed;
        document.getElementById("dosis").value = res.data[0].dosis;
        document.getElementById("lapso").value = res.data[0].lapso;
        document.getElementById("mode_id").value = res.data[0].specialty_id;
        document.getElementById("fechaInicio").value = res.data[0].fechaInicio;
        document.getElementById("fechaTermino").value = res.data[0].fechaTermino;
      })
  }

  state = {
    modalEditar: false,
  }

  onSubmit(e) {

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

    if (fechaInicio !== '' && fechaTermino !== '') {
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
      axios.put(API_BASE_URL + "treatments/" + id, treatment).then(res => { console.log(res) });

      Swal.fire(
        '¡Listo!',
        'Tratamiento modificado de manera exitosa',
        'success',
      ).then(function () {
        this.props.history.push("admin/Beneficiarias/MedicalRecordView/" + beneficiary_id);
      });
    } else {
      Swal.fire(
        'ERROR!',
        'Verifica que los campos obligatorios estén llenos',
        'error'
      )
    }

  }
  
  componentDidMount() {
    //this.fillData();
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

    return (
      <div className="content">
        <Button color="secondary" size="sm" onClick={() => { this.setState({ modalEditar: true }) }}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>

        <Modal isOpen={this.state.modalEditar}>
          <Form onSubmit={this.onSubmit} autocomplete="off">
          <ModalHeader className="text-center">
              <h3 className="title">MODIFICAR TRATAMIENTO</h3>
              <Badge color="primary"><p style={{ 'font-size': '15px' }} >Los campos marcados con un asterisco (*) son obligatorios.</p></Badge>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md="12">
                  <Input type="text" id="beneficiary_id" name="beneficiary_id" value={this.props.name}></Input>
                  <Input type="text" id="id" name="id" ></Input>
                  <Input type="text" id="nombreMed" name="nombreMed" ></Input>
                  <Input type="text" id="funcionMed" name="funcionMed" hidden></Input>
                  <Input type="text" id="dosis" name="dosis" hidden></Input>
                  <Input type="text" id="mode_id" name="mode_id" hidden></Input>
                  <Input type="text" id="lapso" name="lapso" hidden></Input>

                  <FormGroup>
                    <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                    <Label for="fechaInicio">&nbsp;Fecha de inicio:</Label>
                    <Input type="date" id="fechaInicio" name="fechaInicio" ></Input>
                  </FormGroup>
                  <FormGroup>
                    <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                    <Label for="fechaTermino">&nbsp;Fecha de finalización:</Label>
                    <Input type="date" id="fechaTermino" name="fechaTermino"></Input>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={() => this.setState({ modalEditar: false })}>Cancelar</Button>
              <Button color="secondary" type="submit">Modificar</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}