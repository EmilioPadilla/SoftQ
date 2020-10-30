import React, { Component } from 'react';
import { Link } from "react-router-dom";

//Components
import Form from "react-bootstrap/Form";
import SimpleTooltip from "../General/SimpleTooltip";
import { Button, Modal, ModalBody, ModalFooter, Card, Input, CardBody, FormGroup, Alert, Label, CustomInput, Row, Col, InputGroupText, InputGroupAddon, InputGroup} from 'reactstrap';

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class RegisterExpense extends Component {

    crearSelect(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        axios.get(API_BASE_URL + "categories").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectCategory").innerHTML=sel; 
      });
    }
    
    state={
        modalEliminar: false,
    }

    constructor(props){
        super(props)
        this.onSubmit= this.onSubmit.bind(this);
        this.onPost= this.onPost.bind(this);
    }

    onSubmit(e){
        e.preventDefault()

        //Agarrar los valores 
        let fecha = document.getElementById("fecha").value;
        let pagoA = document.getElementById("pagoA").value;
        let descripcion = document.getElementById("descripcion").value;
        let monto = document.getElementById("monto").value;
        let category_id = document.getElementById("selectCategory").value;

        const expense = {
            category_id: category_id,
            fecha: fecha,
            pagoA: pagoA,
            descripcion: descripcion,
            monto: monto,
        };
        localStorage.setItem("expense", JSON.stringify(expense));

        let jsonArray = JSON.parse(localStorage.getItem("expense"));
        console.log(jsonArray);
        localStorage.clear();

        axios.post(API_BASE_URL + "expenses/", jsonArray); 
    }

    onPost(e){
        e.preventDefault()
        
        //Agarrar los valores 
        let nombre = document.getElementById("nombre").value;

        const category = {
            nombre: nombre,
        };
        localStorage.setItem("category", JSON.stringify(category));

        let jsonArray = JSON.parse(localStorage.getItem("category"));
        console.log(jsonArray);
        localStorage.clear();

        axios.post(API_BASE_URL + "categories/", jsonArray); 

        this.setState({modalEliminar: false});
    }

    render() {
        this.crearSelect();
        return (
            <div className="content">
                <h1 className="title">REGISTRAR EGRESO</h1>
                <Card>
                    <CardBody>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                        <Form onClick={this.onSubmit}>
                            <FormGroup>
                                <Label htmlFor="fecha">*&nbsp;<FontAwesomeIcon icon={['fas', 'calendar-alt']} />&nbsp;Fecha:</Label>
                                <Input type="date" id="fecha"></Input>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label htmlFor="pagoA">*&nbsp;<FontAwesomeIcon icon={['fas', 'diagnoses']} />&nbsp;Pago a:</Label>
                                <Input id="pagoA" placeholder="CEA" maxLength=""></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="descripcion"><FontAwesomeIcon icon={['fas', 'map-marker-alt']} />&nbsp;Descripción:</Label>
                                <Input id="descripcion" placeholder="Pago de agua noviembre y octubre" maxLength=""></Input>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="monto">*&nbsp;<FontAwesomeIcon icon={['fas', 'clock']} />&nbsp;Monto:</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>$</InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="monto" type="number" min="1" placeholder="2100"></Input>
                                </InputGroup>
                            </FormGroup>

                            <Row>
                                <Col md="10">
                                    <FormGroup>
                                        <label>Selecciona categoría:</label>
                                        <Form.Control as="select" id="selectCategory"></Form.Control>
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                <Button size="sm" id="añadir" onClick={()=>{this.setState({modalEliminar: true})}} color="primary"><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
                                <SimpleTooltip placement="top" target="añadir" >Añadir categoría</SimpleTooltip>
                                </Col>
                            </Row>


                                <Row className="text-center">
                                    <Col md="12">
                                        <Link to='/admin/Finanzas/MonthlyView'>
                                        <Button onClick="this.onSubmit">Registrar</Button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Form> 
                        </CardBody>
                    </Card>


        <Modal isOpen={this.state.modalEliminar}>
        <Form onSubmit={this.onPost}>
                <ModalBody>
                    <Label>Nueva categoría:</Label>
                    <Input type="text" id="nombre" name="nombre" onChange={this.handleChange}></Input>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger"onClick={()=>this.setState({modalEliminar: false})}>Cancelar</Button>
                  <Button color="primary" type="submit">Añadir</Button>
                </ModalFooter>
        </Form>
        </Modal>

            </div>
        )
    }
}