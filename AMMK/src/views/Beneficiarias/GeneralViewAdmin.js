import React, { Component } from 'react';
import { Link } from "react-router-dom";

//COMPONENTS
import { Row, Col, Button, FormGroup, Input, Label, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import AdminTable from "../../components/Beneficiarias/AdminTable";
import StatusDrop from "../General/StatusDrop";
import HeadquartersDrop from "../General/HeadquartersDrop";

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class GeneralViewAdmin extends Component {
    state = { data : "1" } 
    render() {

    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
      window.location = "http://localhost:3000/login";
    }else if(idRol==2){
      window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
      window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }
    
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
