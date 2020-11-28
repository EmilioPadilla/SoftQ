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
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default class ViewMedApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }
  state = {
    modalReingresar: false,
    beneficiaries1: []
  }

  componentDidMount() {
    let id = this.props.name;
    console.log(id);
    axios.get(API_BASE_URL + 'medical_appointments/' + id)
      .then(res => {
        const appointments = res.data;
        this.setState({ appointments });
        console.log(appointments);
      })
  }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login) {
      window.location = FRONT_BASE_URL + "login";
    } else if (idRol == 2) {
      window.location = FRONT_BASE_URL + "general/NurseIndex";
    } else if (idRol == 1) {
      window.location = FRONT_BASE_URL + "admin/Nomina/Nomina";
    }

    return (
      <div className="content">
        <Button color="info" size="sm" id="ver" onClick={() => { this.setState({ modalReingresar: true }) }}><FontAwesomeIcon icon={faEye} /></Button>
        <SimpleTooltip placement="top" target="ver">Ver consulta</SimpleTooltip>

        <Modal isOpen={this.state.modalReingresar}>
          <ModalHeader>
            <Button color="danger" size="sm" id="cerrar" onClick={() => { this.setState({ modalReingresar: false }) }}>x</Button>
            <h3 className="title" align="center">Detalle Consulta</h3>
          </ModalHeader>
          <ModalBody>
            {this.state.appointments.map((appointment) => (
              <>
                <Row>
                  <Col md="3">
                    <p className="font-weight-bold">Fecha:&nbsp;</p>
                    <p>{appointment.fechaConsulta}</p>
                  </Col>
                  <Col md="3">
                    <p className="font-weight-bold">Hora:&nbsp;</p>
                    <p>{appointment.horaConsulta}</p>
                  </Col>
                  <Col md="6">
                    <p className="font-weight-bold">Especialidad:&nbsp;</p>
                    <p>{appointment.specialty.nombre}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <p className="font-weight-bold">Hospital:&nbsp;</p>
                    <p>{appointment.hospital}</p>
                  </Col>
                  <Col md="3">
                    <p className="font-weight-bold">Consultorio:&nbsp;</p>
                    <p>{appointment.consultorio}</p>
                  </Col>
                  <Col md="6">
                    <p className="font-weight-bold">Dirección:&nbsp;</p>
                    <p>{appointment.direccion}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <p className="font-weight-bold">Comentario:&nbsp;</p>
                    <Input type="textarea" value={appointment.comentario}></Input>
                  </Col>
                </Row>
              </>
            ))}
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
