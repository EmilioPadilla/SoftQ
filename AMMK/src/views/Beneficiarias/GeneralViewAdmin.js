import React, { Component } from 'react';
import { Link } from "react-router-dom";

//COMPONENTS
import { Row, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import AdminTable from "../../components/Beneficiarias/AdminTable";
import Form from "react-bootstrap/Form";

//API calls
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class GeneralViewAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStatus: 0,
            selectedSede: 0,
            inputValue: '',
        }
        this.onStatusChange = this.onStatusChange.bind(this);
        this.onSedeChange = this.onSedeChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onStatusChange(e) {
        e.preventDefault();
        this.setState({ selectedStatus: e.target.value });
        console.log(this.state)
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

    crearSelect() {
        var sel = '<option value=0 selected>Selecciona una opcion...</option>';
        const num = 1;
        axios.get(API_BASE_URL + "headquarters").then(function (resp) {
            console.log(resp.data);
            resp.data.forEach(element => {
                sel = sel.concat('<option value=' + element.id + '>' + element.nombre + '</option>');
            });
            document.getElementById("selectSede").innerHTML = sel;
        });
    }

    crearSelect2() {
        var sel = '<option value=0 selected>Selecciona una opcion...</option>';
        const num = 1;
        axios.get(API_BASE_URL + "status").then(function (resp) {
            console.log(resp.data);
            resp.data.forEach(element => {
                sel = sel.concat('<option value=' + element.id + '>' + element.nombre + '</option>');
            });
            document.getElementById("selectStatus").innerHTML = sel;
        });
    }

    componentDidMount() {
        this.crearSelect();
        this.crearSelect2();
    }

    render() {

        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login) {
            window.location = (FRONT_BASE_URL + "login");
        } else if (idRol == 2) {
            window.location = (FRONT_BASE_URL + "general/NurseIndex");
        } else if (idRol == 1) {
            window.location = (FRONT_BASE_URL + "admin/Nomina/Nomina");
        }

        return (
            <div className="content">
                <h1 className="title">BENEFICIARIAS</h1>
                <Row>
                    <Col md="6">
                        <FormGroup>
                            <label>Filtrar por estatus: </label>
                            <Form.Control onChange={this.onStatusChange} as="select" id="selectStatus"></Form.Control>
                        </FormGroup>
                    </Col>

                    <Col md="6">
                        <Link to='/admin/Beneficiarias/RegisterB1'>
                            <Button className="btn btn-primary float-right"><FontAwesomeIcon icon={['fas', 'user-plus']} /> Registrar beneficiaria</Button>
                        </Link>
                    </Col>
                </Row>

                <br></br>

                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label>Búsqueda por nombre:</Label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText><FontAwesomeIcon icon={['fas', 'search']} /></InputGroupText>
                                </InputGroupAddon>
                                <Input onChange={this.onInputChange} type="text" className="form-control" placeholder="Maria Sandoval Arrieta" aria-label="busquedaNombre" aria-describedby="magGlass"></Input>
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
                <div style={{
                    maxHeight: '400px',
                    overflowY: 'auto'
                }}>
                    <AdminTable statusId={this.state.selectedStatus} sedeId={this.state.selectedSede} inputValue={this.state.inputValue}
                    />
                </div>
            </div>
        )
    }
}
