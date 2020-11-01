import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Card, CardHeader, CardBody, Form, Row, Progress, Alert, Col, FormGroup, Label, CustomInput} from 'reactstrap';

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterB3 extends Component {

    constructor(props){
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault()
        
        let jsonArray1 = JSON.parse(localStorage.getItem("personal"));
        let jsonArray2 = JSON.parse(localStorage.getItem("ingreso"));

        const jsonArray = {...jsonArray1, ...jsonArray2};
        console.log(jsonArray);
        localStorage.clear();

        axios.post(API_BASE_URL + "beneficiaries/", jsonArray); 

    }
    render() {
        return (
            <div className="content">
                <h2 className="title">Registrar Beneficiaria</h2>
                <Form onSubmit={this.onSubmit}>
                <Card>
                    <CardHeader>
                        <h3 className="title">Carga de archivos religiosos</h3>
                        <Progress striped color="primary" value="100"></Progress>
                        <br></br>
                        <Alert color="primary">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Alert>
                    </CardHeader>
                    <CardBody>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="cargaBautismo">&nbsp;Carga de fe de bautismo:</Label>
                                <CustomInput id="cargaBautismo" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="cargaConfirmacion">&nbsp;Carga de boleta de confirmación:</Label>
                                <CustomInput id="cargaConfirmacion" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'file-upload']} />
                                <Label for="cargaComunion">&nbsp;Carga de primera comunión:</Label>
                                <CustomInput id="cargaComunion" type="file" label="Seleccionar archivo...">
                                </CustomInput>
                            </FormGroup>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/Beneficiarias/RegisterB2'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
 
                    <Button type="submit">Registrar</Button>

                    </Col>
                </Row>
                </Form>
            </div>
        );
    }
}