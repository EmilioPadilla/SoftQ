import React, { Component } from 'react'
import { Form, FormGroup, Input } from 'reactstrap'

export default class RegisterMedApp extends Component {
    render() {
        return (
            <div className="content">
                <h1>REGISTRAR CONSULTA MÉDICA</h1>
                <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                <Form>
                    <FormGroup>
                        <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                        <Label for="exampleInputEmail1">Fecha de consulta médica:</Label>
                        <Input type="date" class="form-control" id="fechaConsulta" aria-describedby="emailHelp" placeholder=""></Input>
                    </FormGroup>
                    
                    <FormGroup>
                        <FontAwesomeIcon icon={['fas', 'diagnoses']} />
                        <Label for="exampleInputEmail1">Diagnóstico:</Label>
                        <Input type="text" class="form-control" id="diagnostico" aria-describedby="emailHelp"   placeholder="Amigdalitis"></Input>
                    </FormGroup>

                    <FormGroup>
                        <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
                        <Label for="exampleInputEmail1">Dirección:</Label>
                        <Input type="text" class="form-control" id="hospital" aria-describedby="emailHelp" placeholder="Calle Ignacio Allende 203, Querétero, Querétaro" size="120"></Input>
                    </FormGroup>

                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'hospital']} />
                                <Label for="exampleInputEmail1">Hospital:</Label>
                                <input type="text" class="form-control" id="hospital" aria-describedby="emailHelp" placeholder="Star Medica"></input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'person-booth']} />
                                <Label>Consultorio:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText><FontAwesomeIcon icon={['fas', 'hashtag']} /></InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" class="form-control" placeholder="238" aria-label="busquedaNombre" aria-describedby="magGlass"></Input>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <FontAwesomeIcon icon={['fas', 'stethoscope']} />
                        <Label for="exampleInputEmail1">Especialidad:</Label>
                        <Input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Cardiología"></input>
                    </FormGroup>

                    <FormGroup>
                        <FontAwesomeIcon icon={['fas', 'comment']} />
                        <Label>Comentarios:</Label>
                        <Input type="textarea"></Input>
                    </FormGroup>

                    <FormGroup>
                    <FontAwesomeIcon icon={['fas', 'file-prescription']} />
                    <Label for="exampleInputEmail1">Carga de receta médica:</Label>
                        <CustomInput type="file" label="Seleccionar archivo...">
                        </CustomInput>
                        <span class="badge badge-light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</span>
                    </FormGroup>

                    <Row>
                        <Col md="12">
                            <button type="submit" class="btn btn-primary">Registrar</button>
                        </Col>
                    </Row>

                </Form> 
            </div>
        )
    }
}
