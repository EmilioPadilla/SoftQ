import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Row, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import AdminTable from "../../components/Beneficiarias/AdminTable";
import StatusDrop from "../General/StatusDrop";
import HeadquartersDrop from "../General/HeadquartersDrop";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class GeneralViewAdmin extends Component {
    state = { data : "1" } 
    render() {
        return (
            <div className="content">
                <h1 className="title">BENEFICIARIAS</h1>
                <Row>
                    <Col md="6">
                        <StatusDrop/>
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
                                <Input type="text" className="form-control" placeholder="Maria Sandoval Arrieta" aria-label="busquedaNombre" aria-describedby="magGlass"></Input>
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col md="4">
                        <HeadquartersDrop/>
                    </Col>
                </Row>
                
                <AdminTable dataFromParent = {this.state.data}/>

            </div>
        )
    }
}
