import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Row, Col, Button, FormGroup} from 'reactstrap';
import Form from "react-bootstrap/Form";
import ExpensesTable from "../../components/Finanzas/ExpensesTable";
import SimpleTooltip from "../General/SimpleTooltip";

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class MonthlyView extends Component {
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

    crearSelect2(){
        var sel='<option value="NA" disabled selected>Selecciona una opcion</option>';
        const num=1;
        axios.get(API_BASE_URL + "headquarters").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectSede").innerHTML=sel; 
      });
    }

    render() {
        this.crearSelect();
        this.crearSelect2();
        return (
            <div className="content">
                <h1 className="title">FINANZAS</h1>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <label>Selecciona la sede...</label>
                            <Form.Control as="select" id="selectSede"></Form.Control>
                        </FormGroup>
                    </Col>
                    
                    <Col md="6">
                        <Link to='/admin/Finanzas/Record'>
                        <Button className="btn btn-primary float-right"><FontAwesomeIcon icon={['fas', 'user-plus']} />Ver histórico</Button>
                        </Link>
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col md="6">
                        <h3 className="title">INGRESOS</h3>
                    </Col>
                    <Col md="6">
                        <Row>
                        <h3 className="title">EGRESOS</h3>
                        <Link to='/admin/Finanzas/RegisterExpense'>
                        <Button className="float-right" size="sm" id="registrarEgreso"><FontAwesomeIcon icon={['fas', 'plus']}/></Button>
                        <SimpleTooltip placement="right" target="registrarEgreso" >Registrar egreso</SimpleTooltip>
                        </Link>
                        </Row>

                        <Row>
                            <Col md="6">
                            total
                            </Col>
                            <Col md="6">
                            <FormGroup>
                                <label>Filtra por categoría...</label>
                                <Form.Control as="select" id="selectCategory"></Form.Control>
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <ExpensesTable/>
                        </Row>
                    </Col>
                </Row>        
                
            </div>
        )
    }
}

