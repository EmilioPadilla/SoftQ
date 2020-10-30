import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

// reactstrap components
import { Badge, Button, Card, CardHeader, CardBody, Row, Progress, Alert, Col, FormGroup, Label, Input, CustomInput} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios';
import { API_BASE_URL } from 'index';

library.add(fas)

export default class RegisterB2 extends Component {


    crearSelect(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        Axios.get(API_BASE_URL + "headquarters").then(function(resp){
          
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectSede").innerHTML=sel; 
      });
    }

    constructor(props){
        super(props)
        this.onSubmit= this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault()

        //Agarrar los valores 
        let fechaIngreso = document.getElementById("fechaIngreso").value;
        let edadMental = document.getElementById("edadMental").value;
        let canalizador = document.getElementById("canalizador").value;
        let vinculosFam = document.getElementById("vinculosFam").value;
        let dxMedico = document.getElementById("dxMedico").value;
        let sede = document.getElementById("selectSede").value;

        const datosIngreso = {
            fechaIngreso: fechaIngreso,
            edadMental: edadMental,
            canalizador: canalizador,
            vinculosFam: vinculosFam,
            dxMedico: dxMedico,
            headquarter_id: sede,
        };
        localStorage.setItem("ingreso", JSON.stringify(datosIngreso));
    }

    render() {
        this.crearSelect();
        return (
            <div className="content">
                <h2 className="title">Registrar Beneficiaria</h2>
                <Card>
                    <CardHeader>
                        <h3 className="title">Datos de ingreso</h3>
                        <Progress striped color="primary" value="66.66"></Progress>
                        <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                    </CardHeader>
                    <CardBody>
                        <Form onClick={this.onSubmit}>
                            <FormGroup>
                                <label>* Seleccione la sede:</label>
                                <Form.Control as="select" id="selectSede" required></Form.Control>
                            </FormGroup>
                            <Row>
                                <Col md="6">
                                    <FormGroup>
                                    <Label htmlFor="fechaIngreso">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha de ingreso:</Label>
                                    <Input type="date" id="fechaIngreso"></Input>
                                    </FormGroup>
                                </Col>
                                <Col md="6">
                                    <FormGroup>
                                    <Label htmlFor="cargaIngreso"><FontAwesomeIcon icon={['fas', 'file-upload']} />&nbsp;Carga de hoja de ingreso:</Label>
                                    <CustomInput id="cargaIngreso" type="file" label="Seleccionar archivo...">
                                    </CustomInput>
                                    <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <FormGroup>
                                <Label htmlFor="dxMedico">*&nbsp;<FontAwesomeIcon icon={['fas', 'notes-medical']} />&nbsp;Diagnóstico médico:</Label>
                                <Input maxLength="125" id="dxMedico" placeholder="Parálisis cerebral"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="edadMental">Edad mental:</Label>
                                <Input id="edadMental" type="number" min="1" max="100"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="canalizador">Canalizador:</Label>
                                <Input maxLength="100" id="canalizador" placeholder="Estefanía Ortíz"></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="vinculosFam">Vínculos familiares:</Label>
                                <Input id="vinculosFam" type="textarea"></Input>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/Beneficiarias/RegisterB1'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link to='/admin/Beneficiarias/RegisterB3'>
                    <Button onClick="onSubmit()">Siguiente&nbsp;<FontAwesomeIcon icon={['fas', 'arrow-circle-right']}/></Button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}