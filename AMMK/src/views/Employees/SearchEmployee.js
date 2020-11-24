/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import axios from 'axios';

import { Link } from "react-router-dom";

import AccountPlusIcon from 'mdi-react/AccountPlusIcon';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import ViewEmployeeTable from "components/Employees/ViewEmployeeTable.js";

// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
  Label,
  InputGroup,
  InputGroupText,
  InputGroupAddon
} from "reactstrap";

function parseStatus(statuses) {
  return statuses.map((status) => {
    return { label: status.nombre, value: status.id };
  });
}
function parseJobTitle(jobTitles) {
  return jobTitles.map((jobTitle) => {
    return { label: jobTitle.nombre, value: jobTitle.id };
  });
}


class SearchEmployee extends React.Component {
  constructor(props){ 
    super(props)
    this.state = {
      statuses: [],
      jobTitles: []
    }
  }

  componentDidMount() {
    this.getStatus();
    this.getJobTitle();
  }
  

  getStatus() {
    axios.get('http://localhost:8000/api/employeeStatus')
    .then(res => this.setState({ statuses: parseStatus(res.data) }));
  }

  getJobTitle() {
    axios.get('http://localhost:8000/api/employeeJobTitles')
    .then(res => this.setState({ jobTitles: parseJobTitle(res.data) }));
  }

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
      <>
        <div className="content">
        <h1 className="title">EMPLEADOS</h1>
          <Row>
            <Col>
              <FormGroup>
                  <Label forHTML="estatus">Filtrar por estatus: </Label>
                  <Input type="select" name="select" id="statusSelect">
                  <option defaultValue="0">Selecciona una opción...</option>
                  {this.state.statuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </Input>
              </FormGroup>
            </Col>
            <Col className="text-right">
              <br/>
              <Link to='/admin/register-employee'>
              <Button className="btn btn-primary ">
                <AccountPlusIcon/> &nbsp;
                Registrar nuevo empleado
              </Button>
            </Link>
            </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
             <Label for="exampleSearch">Búsqueda por nombre:</Label>
             <InputGroup>
                 <InputGroupAddon addonType="prepend">
                   <InputGroupText>
                     <FontAwesomeIcon icon={['fas', 'search']} />
                   </InputGroupText>
                 </InputGroupAddon>
                 <Input placeholder="Juan Artal González"/>
             </InputGroup>
           </FormGroup>
         </Col>
         <Col>
           <FormGroup>
           <Label for="puestoSelect">Filtrar por puesto:</Label>
               <Input type="select" name="select" id="puestoSelect">
               <option defaultValue="0">Selecciona una opción...</option>
                  {this.state.jobTitles.map((jobTitle) => <option key={jobTitle.value} value={jobTitle.value}>{jobTitle.label}</option>)}
               </Input>
           </FormGroup>
         </Col>
        </Row>
        <ViewEmployeeTable/>
        <div>

        </div>
        </div>

    </>
    );
  }
}
export default SearchEmployee;
