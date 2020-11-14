import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Button, Input, InputGroupText, InputGroupAddon, InputGroup, Label, FormGroup, Row, Col, Table, Card, CardBody } from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import NurseTable from "../../components/Beneficiarias/NurseTable";
import Form from "react-bootstrap/Form";

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class GeneralViewNurse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedSede: 0,
            inputValue:'',
        }
      this.onSedeChange = this.onSedeChange.bind(this);
      this.onInputChange = this.onInputChange.bind(this);
    }
    onInputChange(e) {
        e.preventDefault();
        this.setState({ inputValue: e.target.value });
        console.log(e.target.value)
    }

    onSedeChange(e) {
        e.preventDefault();
        this.setState({ selectedSede: e.target.value });
        console.log(this.state)
    }

    crearSelect(){
        var sel='<option value=0 selected>Selecciona una opcion...</option>';
        const num=1;
        axios.get(API_BASE_URL + "headquarters").then(function(resp){
        console.log(resp.data);
        resp.data.forEach(element =>{
          sel = sel.concat('<option value='+ element.id + '>' + element.nombre +'</option>');
        });
        document.getElementById("selectSede").innerHTML=sel; 
      });
    }

    componentDidMount() {
        this.crearSelect();
    }

    render() {
        return (
            <div className="content">
                <h1 className="title">BENEFICIARIAS</h1>

                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label for="busquedaNombre">Búsqueda por nombre:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><FontAwesomeIcon icon={['fas', 'search']} /></InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={this.onInputChange} placeholder="Maria Sandoval Arrieta" id="busquedaNombre"></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col md="4">
                        <FormGroup>
                            <label>Filtrar por sede:</label>
                            <Form.Control onChange={this.onSedeChange} as="select" id="selectSede"></Form.Control>
                        </FormGroup>
                    </Col>
                </Row>

                <Card>
                    <CardBody>
                        <NurseTable sedeId={this.state.selectedSede} inputValue={this.state.inputValue} />
                    </CardBody>
                </Card>
            </div>
        )
    }
}
