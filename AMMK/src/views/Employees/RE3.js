/*!
@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020
*/
import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Prompt } from 'react-router'
import Swal from 'sweetalert2';
import EmployeeCalendarTable from "components/Employees/EmployeeCalendarTable.js";
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import GoBackButton  from '../../components/General/goBackButton.js';

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
    Alert,
  } from "reactstrap";


 function parseJobTitles(jobTitles){
  return jobTitles.map((jobTitles) => {
    return { label: jobTitles.nombre, value: jobTitles.id };
  });
}

const validDate = RegExp(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
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
       selectedOption: null,
       errors: {
         date: '',
       }
     }
      this.onChange = this.onChange.bind(this);
      this.handleCalendarChange = this.handleCalendarChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
        case 'date':
            errors.date =
            validDate.test(value)
                            ? ""
                            : "La fecha no es correcta.";
            break;
        default:
            break;
    }

    this.setState({ errors, [name]: value });
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
    axios.get(API_BASE_URL+'employeeJobTitles')
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

    if (fechaIngreso !== '' && headquarter_id !== '' && frecuenciaSalario !== '' && puesto !== '' && turnosQuincena !== '') {
    const datosEmpleado = {
      fechaIngreso: fechaIngreso,
      headquarter_id: headquarter_id, 
      frecuenciaSalario: frecuenciaSalario,
      puesto: puesto, 
      diasLaborales: turnosQuincena,
      salarioxhora: salarioxhora,
    };

    localStorage.setItem("empleado", JSON.stringify(datosEmpleado));

    let jsonPersonal = JSON.parse(localStorage.getItem("personal"));
    let jsonContacto = JSON.parse(localStorage.getItem("contacto"));
    let jsonEmpleado = JSON.parse(localStorage.getItem("empleado"));
    
    const json = {...jsonPersonal, ...jsonContacto, ...jsonEmpleado};
    console.log(json);
    localStorage.clear();

    axios.post(API_BASE_URL+'employee/', json).then(res => {
      console.log(res);
      const employeeId = res.data.id;
      this.state.markedDays.forEach((element) => {
        const empShift = {
          nombreTurno: element.nombreTurno,
          idEmployees: employeeId,
          diaSemana: element.diaSemana
        }
        console.log(empShift);
        // Insert new shifts
        axios.post(API_BASE_URL+'employeesShifts', empShift)
        .then((res) => {
          console.log(res);
        })
      });
    });

    Swal.fire(
      '¡Listo!',
      'Empleado registrado de manera exitosa',
      'success'
      ).then(function() {
          window.location = FRONT_BASE_URL+"admin/search-employee";
      });
    } else{
      Swal.fire( {
        icon: 'error',
        title: '¡Error!',
        text: 'Verifica que todos los campos obligatorios estén completos.',
      })
    }

}


   render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    // Redirect in case of wrong role or no login
    if (!login ) {
      window.location = FRONT_BASE_URL+"login";
    }else if(idRol==2){
        window.location = FRONT_BASE_URL+"general/NurseIndex";
    }else if (idRol==1){
        window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
    }
    const { errors } = this.state;
     return (
        <>
        <div className="content">
        <Prompt
            when={true}
            message="Te encuentras en proceso de registro                                                ¿Estás seguro de querer salir?"
          />
        <Row>
            <Col >
              <h2 className="title">Registrar empleado</h2>
            </Col>
          </Row>
        <Form autocomplete="off">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Progress value="100" />
                  <br/>
                  <h3 className="title">Datos de empleado</h3>
                </CardHeader>
                <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                <CardBody>
                  
                    <Row>
                    <Col className="pl-md-1" md="6">
                      <Col>
                        <FormGroup>
                          <Label htmlFor="fechaIngreso">
                            * Fecha de ingreso
                          </Label>
                          <Input type="date" id="fechaIngreso" name="date"   onChange={this.handleChange}/>
                          {errors.date.length > 0 && <span className='error'>{errors.date}</span>}
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
                              <option value="Variable">Variable</option>
                              <option value="Fijo">Fijo</option>
                              </Input>
                          </FormGroup>
                          </Col>
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
                            <Label htmlFor="diasLaborales">* Dias Laborales</Label>
                            <Input
                              placeholder="3" type="number" id="diasLaborales"
                            />
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
                  <button  className="btn btn-primary" onClick={this.onSubmit}>Terminar</button>
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