/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
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


class SearchEmployee extends React.Component {
  constructor(props){ 
    super(props)
    this.state = {
      statuses: [],
      selectedStatus: 0,
      selectedSede: 0,
      inputValue:'',
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

  componentDidMount() {
    this.getStatus();
  }
  

  getStatus() {
    axios.get(API_BASE_URL+'employeeStatus')
    .then(res => this.setState({ statuses: parseStatus(res.data) }));
  }


  render() {
    
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
        window.location = FRONT_BASE_URL+"login";
    }else if(idRol==2){
        window.location = FRONT_BASE_URL+"general/NurseIndex";
    }else if (idRol==1){
        window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
    }

    return (
      <>
        <div className="content">
        <h1 className="title">EMPLEADOS</h1>
          <Row>
            <Col>
              <FormGroup>
                  <Label forHTML="estatus">Filtrar por estatus: </Label>
                  <Input type="select" name="select" id="statusSelect" onChange={this.onStatusChange} >
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
          <Col md="8">
            <FormGroup>
             <Label for="exampleSearch">Búsqueda por nombre:</Label>
             <InputGroup>
                 <InputGroupAddon addonType="prepend">
                   <InputGroupText>
                     <FontAwesomeIcon icon={['fas', 'search']} />
                   </InputGroupText>
                 </InputGroupAddon>
                 <Input placeholder="Juan Artal González" onChange={this.onInputChange}/>
             </InputGroup>
           </FormGroup>
         </Col>
         <Col md="4">
           <FormGroup>
           <Label for="puestoSelect">Filtrar por sede:</Label>
               <Input type="select" name="select" id="puestoSelect" onChange={this.onSedeChange}>
               <option defaultValue="0">Selecciona una opción...</option>
               <option value="1">Asoc. MMK.</option>
               <option value="2">Granja Betanía</option>
               </Input>
           </FormGroup>
         </Col>
        </Row>
        
         <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
        <ViewEmployeeTable statusId={this.state.selectedStatus} sedeId={this.state.selectedSede} inputValue={this.state.inputValue}/>
        </div>
        </div>

    </>
    );
  }
}
export default SearchEmployee;
