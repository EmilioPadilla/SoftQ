import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FRONT_BASE_URL } from 'index';

//COMPONENTS
import { Card, CardBody, Row, Col, Button, Badge } from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import TreatmentTable from "../../components/Beneficiarias/TreatmentTable";
import AppointmentsTable from "../../components/Beneficiarias/AppointmentsTable";
import PrescriptionsTable from 'components/Beneficiarias/PrescriptionsTable';
import FileUpload from './FileUpload';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class MedicalRecordView extends Component {

    render() {
        const { id } = this.props.match.params;
        console.log(id);

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
                <h1 className="title">HISTORIAL MÉDICO</h1>
                <Row>
                    <Col md="3">
                        <h3 className="title" align="left">TRATAMIENTOS</h3>
                    </Col>
                    <Col md="9">
                        <Link className="float-right" to={{
                            pathname: '../RegisterTreatment/' + id,
                            state: id
                        }}>
                            <Button className="float-left" size="sm" id="registrarTratamiento"><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
                            <SimpleTooltip placement="right" target="registrarTratamiento" >Registrar tratamiento</SimpleTooltip>
                        </Link>
                    </Col>
                </Row>

                <Card>
                    <CardBody>
                        <div style={{
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            <Row>
                                <Col md="12">
                                    <TreatmentTable id={this.props.match.params} />
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>

                <Row>
                    <Col md="3">
                        <h3 className="title">CONSULTAS MÉDICAS</h3>
                    </Col>
                    <Col md="9">
                        <Link className="float-right" to={{
                            pathname: '../RegisterMedApp/' + id,
                            state: id
                        }}>
                            <Button size="sm" id="registrarConsulta" className="float-left"><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
                            <SimpleTooltip placement="right" target="registrarConsulta" >&nbsp;&nbsp;&nbsp;&nbsp;Registrar consulta</SimpleTooltip>
                        </Link>
                    </Col>
                </Row>


                <Card>
                    <CardBody>
                        <div style={{
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            <Row>
                                <Col md="12">
                                    <AppointmentsTable id={this.props.match.params} />
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <Row>
                            <Col md="6">
                                <Badge color="primary" style={{ 'fontSize': '12px' }}>RECETAS MÉDICAS</Badge>
                            </Col>
                            <Col md="6">
                                <FileUpload id={id} view="1" />
                            </Col>
                        </Row>
                        <div style={{
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            <PrescriptionsTable id={id} />
                        </div>
                    </CardBody>
                </Card>

                <div class="fixed-bottom" style={{ margin: '15px' }}>
                    <Link to={{
                        pathname: '../SpecificView/' + id,
                        state: id
                    }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button color="primary" id="regresar"><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Regresar</Button>
                    </Link>
                </div>

            </div>
        )
    }
}
