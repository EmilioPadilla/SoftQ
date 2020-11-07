/*!
@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020
*/
import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { API_BASE_URL } from 'index';
import Swal from 'sweetalert2';
import EmployeeCalendarTable from "components/Employees/EmployeeCalendarTable.js";
// reactstrap components
  import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Progress,
    Label,
    CustomInput,
    Button,
  } from "reactstrap";


 function parseJobTitles(jobTitles){
  return jobTitles.map((jobTitles) => {
    return { label: jobTitles.nombre, value: jobTitles.id };
  });
}

 class RegisterEmployee3 extends React.Component {
   constructor(props){
     super(props)
     this.state = {
       markedDays: [],
       jobTitles: [],
       fechaIngreso: null,
       sede: null, 
       salario: null,
       puesto: null, 
       turnosQuincena: null,
       monto: null
     }
     this.onChange = this.onChange.bind(this);
      this.handleCalendarChange = this.handleCalendarChange.bind(this);
    
  }

   onChange(e) {
     this.setState({ value: e.value });
     console.log('scholarship selected: ', e.value);
   }

   handleCalendarChange(e) {
     this.setState({ markedDays: e });
   }

   componentDidMount() {
     this.getJobTitles();
   }

   getJobTitles() {
    axios.get('http://localhost:8000/api/employeeJobTitles')
    .then(res => this.setState({ jobTitles: parseJobTitles(res.data) }));
  }

   onSubmit(e){
    e.preventDefault()
    //Agarrar los valores 
    let fechaIngreso = document.getElementById("fechaIngreso").value;
    let sede = document.getElementById("sede").value;
    let salario = document.getElementById("salario").value;
    let puesto = document.getElementById("puesto").value;
    let turnosQuincena = document.getElementById("turnosQuincena").value;
    let monto = document.getElementById("monto").value;

    const datosEmpleado = {
      fechaIngreso: fechaIngreso,
      sede: sede, 
      salario: salario,
      puesto: puesto, 
      turnosQuincena: turnosQuincena,
      monto: monto
    };
    
    let jsonEmpleado = localStorage.setItem("empleado", JSON.stringify(datosEmpleado));
    let jsonPersonal = JSON.parse(localStorage.getItem("personal"));
    let jsonContacto = JSON.parse(localStorage.getItem("ingreso"));
    const json = {...jsonPersonal, ...jsonContacto, ...jsonEmpleado};
    console.log(json);
    localStorage.clear();

    axios.post(API_BASE_URL + "employee/", json); 

    Swal.fire(
      '¡Listo!',
      'Empleado registrado de manera exitosa',
      'success'
      ).then(function() {
          window.location = "http://localhost:3000/admin/search-employee";
      }
  );

}


   render() {
     return (
        <>
        <div className="content">
        <h2 className="title">Registrar empleado</h2>
        <Form onSubmit={this.onSubmit}>
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Progress value="100" />
                  <br/>
                  <h3 className="title">Datos de empleado</h3>
                </CardHeader>
                <CardBody>
                  
                    <Row>
                    <Col className="pl-md-1" md="6">
                      <Col>
                        <FormGroup>
                          <Label htmlFor="fechaIngreso">
                            Fecha de ingreso
                          </Label>
                          <Input type="date" id="fechaIngreso"/>
                        </FormGroup>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Label for="sedeCheckbox">Sede</Label>
                        <Row>
                          <Col>
                        <FormGroup check inline>
                          <Label check htmlFor="MK">
                            <Input id="MK" defaultValue="Asoc. MMK" name="sede" type="radio" />
                          </Label>
                        María Kolbe
                        </FormGroup>
                      </Col>  
                      <Col>
                        <FormGroup check inline>
                          <Label check htmlFor="GB">
                             <Input id="GB" defaultValue="Granja Betania" name="sede" type="radio" />
                          </Label>
                          Granja Bretania
                        </FormGroup>
                      </Col>
                    </Row>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Col>
                        <FormGroup>
                        <Label htmlFor="puesto">Puesto</Label>
                            <Input type="select" name="select" id="puesto">
                            <option defaultValue="0">Selecciona un puesto...</option>
                            {this.state.jobTitles.map((jobTitle) => <option key={jobTitle.value} value={jobTitle.value}>{jobTitle.label}</option>)}
                            </Input>
                        </FormGroup>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Label htmlFor="salario">Salario</Label>
                        <Row>
                          <Col>
                        <FormGroup check inline>
                          <Label check>
                            <Input id="Fijo" defaultValue="Fijo" name="salario" type="radio" />
                          </Label>
                        Fijo
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup check inline>
                          <Label check>
                             <Input id="Variable" defaultValue="Variable" name="salario" type="radio" />
                          </Label>
                          Variable
                        </FormGroup>
                      </Col>
                    </Row>
                       </Col>
                    </Row>
                    <Row>
                      <Col  md="6">
                        <Col className="pl-md-1">
                          <FormGroup>
                            <Label htmlFor="monto">Monto</Label>
                            <Input
                              placeholder="1500"
                              type="text"
                              id="monto"
                            />
                          </FormGroup>
                        </Col>
                      </Col>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="turnosQuincena">Turnos por quincena</Label>
                            <Input
                              placeholder="" type="number" id="turnosQuincena"
                            />
                           </FormGroup>
                         </Col>
                     </Row>
                     <Row>
                         <Col md="6">
                           <FormGroup>
                           <Label for="Contrato">Copia de Contrato</Label>
                           <CustomInput type="file" name="customFile" id="Contraro" label="Selecciona un archivo"/>
                           </FormGroup>
                         </Col>
                         </Row>
                    <Row>
                      <Col>
                        <h4 className="text-center">Calendario de empleado</h4>
                        <EmployeeCalendarTable onChange={this.handleCalendarChange} />
                      </Col>
                    </Row>
                    
                </CardBody>
              </Card>
              <Row>
                <Col  md="6">
                {/* <a href="/admin/RE2"> */}
                <Link to="/admin/RE2">
                  <button className="btn btn-primary">Regresar</button>
                  </Link>
                {/* </a> */}
                </Col>
                <Col md="6" align="right">
                <a href="/admin/RE3">
                  <button  className="btn btn-primary" onClick="onSubmit()">Terminar</button>
                </a>
                </Col>
              </Row>
            </Col>
          </Row>
          </Form>
        </div>
      </>
    );
  }
}
export default RegisterEmployee3;