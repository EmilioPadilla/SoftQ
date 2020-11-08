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
import SimpleTooltip from "../../views/General/SimpleTooltip";

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
       diasLaborales: null,
       monto: null,
       numBenef: null,
       selectedOption: null
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
    let headquarter_id = document.getElementById("sede").value;
    let frecuenciaSalario = document.getElementById("frecuenciaSalario").value;
    let puesto = document.getElementById("puesto").value;
    let turnosQuincena = document.getElementById("diasLaborales").value;
    let salarioxhora = document.getElementById("monto").value;
    let numBeneficiarios = document.getElementById("numBenef").value;

    const datosEmpleado = {
      fechaIngreso: fechaIngreso,
      headquarter_id: headquarter_id, 
      frecuenciaSalario: frecuenciaSalario,
      puesto: puesto, 
      diasLaborales: turnosQuincena,
      salarioxhora: salarioxhora,
      numBeneficiarios: numBeneficiarios
    };

    localStorage.setItem("empleado", JSON.stringify(datosEmpleado));

    let jsonPersonal = JSON.parse(localStorage.getItem("personal"));
    let jsonContacto = JSON.parse(localStorage.getItem("contacto"));
    let jsonEmpleado = JSON.parse(localStorage.getItem("empleado"));
    
    const json = {...jsonPersonal, ...jsonContacto, ...jsonEmpleado};
    console.log(json);
    localStorage.clear();

    axios.post('http://localhost:8000/api/employee/', json).then(res => {console.log(res)});

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
                            * Fecha de ingreso
                          </Label>
                          <Input type="date" id="fechaIngreso"/>
                        </FormGroup>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Row>
                        <Col>
                        <Col>
                          <FormGroup>
                          <Label htmlFor="sede">* Sede</Label>
                              <Input type="select" name="select" id="sede">
                              <option defaultValue="0">Selecciona una sede...</option>
                              <option value="1">Asoc. MMK</option>
                              <option value="2">Granja Betanía</option>
                              </Input>
                          </FormGroup>
                          </Col>
                          </Col>  
                           </Row>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Col>
                        <FormGroup>
                        <Label htmlFor="puesto">* Puesto</Label>
                            <Input type="select" name="select" id="puesto">
                            <option defaultValue="0">Selecciona un puesto...</option>
                            {this.state.jobTitles.map((jobTitle) => <option key={jobTitle.value} value={jobTitle.value}>{jobTitle.label}</option>)}
                            </Input>
                        </FormGroup>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Col>
                         <FormGroup>
                          <Label htmlFor="frecuenciaSalario">* Frecuencia de salario</Label>
                              <Input type="select" name="select" id="frecuenciaSalario">
                              <option defaultValue="0">Selecciona una frecuencia de salario...</option>
                              <option value="1">Variable</option>
                              <option value="2">Fijo</option>
                              </Input>
                          </FormGroup>
                          </Col>
                       </Col>
                    </Row>
                    <Row>
                      <Col  md="6">
                        <Col className="pl-md-1">
                          <FormGroup>
                            <Label htmlFor="monto">* Monto</Label>
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
                            <Label htmlFor="diasLaborales">* Dias Laborales</Label>
                            <Input
                              placeholder="" type="number" id="diasLaborales"
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
                         <Col md="6">
                           <FormGroup>
                           <Label for="numBenef">Número de beneficiarios</Label>
                           <Input
                              placeholder="2"
                              type="number"
                              id="numBenef"
                            />
                            <SimpleTooltip placement="top" target="numBenef">Beneficiarios a quienes se les puede otorgar porcion del salario del empleado</SimpleTooltip>
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