import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import {Card, CardBody, Row, Col, Button} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import TreatmentTable from "../../components/Beneficiarias/TreatmentTable";
import AppointmentsTable from "../../components/Beneficiarias/AppointmentsTable";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class MedicalRecordView extends Component {

    render() {
        return (
            <div className="content">
                <h1 className="title">HISTORIAL MÉDICO</h1>
                <Row>
                    <Col md="3">
                        <h3 className="title" align="left">TRATAMIENTOS</h3>
                    </Col>
                    <Col md="9">
                        <Link to='/admin/Beneficiarias/RegisterTreatment'>
                        <Button className="float-left" size="sm" id="registrarTratamiento"><FontAwesomeIcon icon={['fas', 'plus']}/></Button>
                        <SimpleTooltip placement="right" target="registrarTratamiento" >Registrar tratamiento</SimpleTooltip>
                        </Link>
                    </Col>
                </Row>

                <Card>
                    <CardBody>
                        <Row>
                            <Col md="12">
                            <TreatmentTable/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Row>
                    <Col md="3">
                    <h3 className="title">CONSULTAS MÉDICAS</h3>
                    </Col>
                    <Col md="9">
                        <Link to='/admin/Beneficiarias/RegisterMedApp'>
                        <Button size="sm" id="registrarConsulta" className="float-left"><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
                        <SimpleTooltip placement="right" target="registrarConsulta" >&nbsp;&nbsp;&nbsp;&nbsp;Registrar consulta</SimpleTooltip>
                        </Link>
                    </Col>
                </Row>
                

                <Card>
                    <CardBody>
                        <Row>
                            <Col md="12">
                                <AppointmentsTable/>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
