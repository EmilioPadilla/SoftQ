import React, { Component } from 'react';
import { Link } from "react-router-dom";

//COMPONENTS
import { DropdownItem, Row, Table, Col, Alert, Button, Badge, CardBody, Card, CardHeader, CardTitle } from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import ModifyTakeOut from './ModifyTakeOut';
import FileUpload from './FileUpload';
import FilesTable from 'components/Beneficiarias/FilesTable';
import ModalEditPhoto from "components/Employees/ModalEditPhoto.js";

//API CALLS
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL, IMAGE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ExitStatus } from 'typescript';
library.add(fas)

const calculate_age = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10);

export default class SpecificView extends Component {

    state = {
        beneficiaries: [],
    }

    componentDidMount() {
        this.getBeneficiaries();
        this.getPath();
    }

    getPath() {
        const { id } = this.props.match.params;
        axios.get(API_BASE_URL + 'beneficiary_files/ingreso/' + id)
            .then(res => {
                if (!Object.keys(res.data).length) {
                    console.log("NO DATA!");
                    return;
                }
                //const path = res.data;
                const path = res.data[0].path;
                console.log(path);

                let pathFinal = IMAGE_URL + "beneficiary_files/" + path;
                document.getElementById("imagenIngreso").src = pathFinal;
            })
    }


    getBeneficiaries() {
        const { id } = this.props.match.params;
        axios.get(API_BASE_URL + 'beneficiaries/' + id)
            .then(res => {
                const beneficiaries = res.data;
                this.setState({ beneficiaries });
                console.log(beneficiaries);
            })
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
        let sedes = ["", "Asoc. Maximiliano María Kolbe", "Granja Betanía"];
        let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let status = ["", "BENEFICIARIA ACTIVA", "BENEFICIARIA INACTIVA"];

        const { id } = this.props.match.params;
        console.log(id);

        return (
            <div className="content">
                <h3 className="title">DETALLE BENEFICIARIA</h3>
                {this.state.beneficiaries.map((beneficiary) => (
                    <>
                        {(() => {
                            switch (beneficiary.status_id) {
                                case 1: return <Alert color="primary" style={{ 'fontSize': '25px', 'fontWeight': 'bold', 'textAlign': 'center' }}>{status[beneficiary.status_id]}</Alert>;
                                case 2: return <Alert color="danger" style={{ 'fontSize': '25px', 'fontWeight': 'bold', 'textAlign': 'center' }}>{status[beneficiary.status_id]}</Alert>;
                                default: return '';
                            }
                        })()}

                        <Row>
                            {/* <Col md="4">
                                <img src="" width="250" className="img-fluid" alt="Imagen de Ingreso" id="imagenIngreso" onError={(e) => { e.target.onerror = null; e.target.src = "https://www.pngitem.com/pimgs/m/22-223925_female-avatar-female-avatar-no-face-hd-png.png" }}></img>
                            </Col> */}
                            <Col md="5">
                                <Card>
                                    <CardHeader>
                                    <CardTitle>
                                        <Row>
                                        <Col>
                                            <Badge color="primary">Foto de beneficiaria</Badge>
                                        </Col>
                                        <Col>
                                            <ModalEditPhoto/>
                                        </Col>
                                        </Row>
                                    </CardTitle>
                                    </CardHeader>
                                    <CardBody className="justify-content-md-center"  style={{ display: 'flex'}}>
                                    <img src="" 
                                    width="400in" 
                                    height="500in"
                                    className="img-fluid" 
                                    alt="Imagen de Ingreso" 
                                    id="imagenIngreso" 
                                    onError={(e) => { e.target.onerror = null; 
                                    e.target.src = "https://www.pngitem.com/pimgs/m/22-223925_female-avatar-female-avatar-no-face-hd-png.png" }}></img>
                                    </CardBody>

                                    </Card>
                            </Col>
                            <Col md="7">
                                <Card>
                                    <CardBody>
                                        <h1 className="title">{beneficiary.nombreCompleto}</h1>
                                        <DropdownItem divider />
                                        <Badge color="primary" style={{ 'fontSize': '12px' }}>DATOS PERSONALES</Badge>
                                        <Link to={{
                                            pathname: '../ModifyPersonal/' + id,
                                            state: id
                                        }}>

                                            <Button color="info" size="sm" id="verDetalle" className="float-right"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                                            <SimpleTooltip placement="top" target="verDetalle">Modificar</SimpleTooltip>
                                        </Link>
                                        <p className="font-weight-bold">Apodo: {beneficiary.apodo}</p>                                        <p className="font-weight-bold">Fecha de nacimiento: {beneficiary.fechaNacimiento.split("-")[2]} de {months[beneficiary.fechaNacimiento.split("-")[1] - 1]} del {beneficiary.fechaNacimiento.split("-")[0]}</p>
                                        <p className="font-weight-bold">Edad:&nbsp;{calculate_age(beneficiary.fechaNacimiento)} años</p>
                                        <p className="font-weight-bold">CURP:{beneficiary.curp}</p>
                                        <p className="font-weight-bold">Vínculos familiares:{beneficiary.vinculosFam}</p>
                                    </CardBody>
                                </Card>
                                <Row className="text-center">
                                    <Col md="12">
                                        <Link to={{
                                            pathname: '../MedicalRecordView/' + id,
                                            state: id
                                        }}>
                                            <Button id="historialMedico" color="warning" className=""><FontAwesomeIcon icon={['fas', 'notes-medical']} />&nbsp;VER HISTORIAL MÉDICO</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <br></br>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        <Badge color="primary" style={{ 'fontSize': '12px' }}>DATOS DE INGRESO</Badge>
                                    </Col>
                                    <Col md="6">
                                        <Link to={{
                                            pathname: '../ModifyEntry/' + id,
                                            state: id
                                        }}>

                                            <Button color="info" size="sm" id="verDetalle" className="float-right"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                                            <SimpleTooltip placement="top" target="verDetalle">Modificar</SimpleTooltip>
                                        </Link>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <p className="font-weight-bold">Fecha de ingreso: {beneficiary.fechaIngreso.split("-")[2]} de {months[beneficiary.fechaIngreso.split("-")[1] - 1]} del {beneficiary.fechaIngreso.split("-")[0]}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="font-weight-bold">Sede: {sedes[beneficiary.headquarter_id]}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="font-weight-bold">Canalizador: {beneficiary.canalizador}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="4">
                                        <p className="font-weight-bold">Diagnóstico médico: {beneficiary.dxMedico}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="font-weight-bold">Edad mental: {beneficiary.edadMental}</p>
                                    </Col>
                                    <Col md="4">
                                        <p className="font-weight-bold">Motivo de ingreso: {beneficiary.motivoIngreso}</p>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <br></br>
                        {(() => {
                            switch (beneficiary.status_id) {
                                case 1: return "";
                                case 2: return <Card>
                                    <CardBody>
                                        <Row>
                                            <Col md="6">
                                                <Badge color="primary" style={{ 'fontSize': '12px' }}>DATOS DE EGRESO</Badge>
                                            </Col>
                                            <Col md="6">
                                                <ModifyTakeOut id={beneficiary.id} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4">
                                                <p className="font-weight-bold">Fecha de egreso: {beneficiary.fechaEgreso.split("-")[2]} de {months[beneficiary.fechaEgreso.split("-")[1] - 1]} del {beneficiary.fechaEgreso.split("-")[0]}</p>
                                            </Col>
                                            <Col md="4">
                                                <p className="font-weight-bold">Motivo: {beneficiary.motivoEgreso}</p>
                                            </Col>
                                            <Col md="4">
                                                <p className="font-weight-bold">Destino: {beneficiary.destino}</p>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>;
                                default: return "";
                            }
                        })()}
                        <br></br>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        <Badge color="primary" style={{ 'fontSize': '12px' }}>ARCHIVOS DE REGISTRO</Badge>
                                    </Col>
                                    <Col md="6">
                                        <FileUpload id={beneficiary.id} view="1" />
                                    </Col>
                                </Row>
                                <div style={{
                                    maxHeight: '300px',
                                    overflowY: 'auto'
                                }}>
                                    <FilesTable id={beneficiary.id} />
                                </div>
                            </CardBody>
                        </Card>
                    </>
                ))}

                <div className="static-bottom">
                    <Link to='../GeneralViewAdmin'>
                        <Button color="primary" id="regresar"><FontAwesomeIcon icon={['fas', 'arrow-circle-left']} />&nbsp;Regresar</Button>
                    </Link>
                </div>

            </div>
        )
    }
}
