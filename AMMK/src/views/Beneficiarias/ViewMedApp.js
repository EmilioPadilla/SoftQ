import React, { Component } from 'react';

//COMPONENTS
import { Input, Row, Col, Label} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class ViewMedApp extends Component {
    
  state = {
    appointments: []
  }

componentDidMount () {
  const { id } = this.props.match.params;
  console.log(id);
    axios.get(API_BASE_URL + 'medical_appointments/' + id)
    .then(res => {
        const appointments = res.data;
        this.setState({ appointments });
        console.log(appointments);
      })
  }

    render() {
        return (
            <div className="content">
                <h3 className="title">DETALLE CONSULTA MÉDICA</h3>
                {this.state.appointments.map((appointment) => (
                <>
                <Row>
                  <Col md="3">
                    <Row><Col>
                    <p className="font-weight-bold">Fecha:&nbsp;</p>
                    <p>{appointment.fechaConsulta}</p>
                    </Col></Row>
                  </Col>
                  <Col md="3">
                    <Row><Col>
                    <p className="font-weight-bold">Hora:&nbsp;</p>
                    <p>{appointment.horaConsulta}</p>
                    </Col></Row>
                  </Col>
                  <Col md="6">
                    <Row><Col>
                    <p className="font-weight-bold">Especialidad:&nbsp;</p>
                    <p>{appointment.specialty_id}</p>
                    </Col></Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="3">
                    <Row><Col>
                    <p className="font-weight-bold">Hospital:&nbsp;</p>
                    <p>{appointment.hospital}</p>
                    </Col></Row>
                  </Col>
                  <Col md="3">
                    <Row><Col>
                    <p className="font-weight-bold">Consultorio:&nbsp;</p>
                    <p>{appointment.consultorio}</p>
                    </Col></Row>
                  </Col>
                  <Col md="6">
                    <Row>
                    <Col>
                    <p className="font-weight-bold">Dirección:&nbsp;</p>
                    <p>{appointment.direccion}</p>
                    </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col md="4">
                    <p className="font-weight-bold">Comentario:&nbsp;</p>
                    <Input type="textarea" value={appointment.comentario}></Input>
                  </Col>
                  <Col md="8">
                    
                  </Col>
                </Row>
                </>
                ))}
            </div>
        )}  
}
