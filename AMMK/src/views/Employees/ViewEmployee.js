/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/

import React, { useState } from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';
import { Link } from "react-router-dom";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SimpleTooltip from "../General/SimpleTooltip";
import EmployeeCalendarTable from "components/Employees/EmployeeCalendarTable.js"
import TableEmployeeFiles from "components/Employees/TableEmployeeFiles.js"
import TableEmployeeVacations from "components/Employees/TableEmployeeVacations.js"

// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  Row,
  Col,
  Label,
  Badge
} from "reactstrap";

const calculate_age = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

class ViewEmployee extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        markedDays: [],
        statuses: [],
        employees: [],
        id: '',
      }
      this.handleCalendarChange = this.handleCalendarChange.bind(this);
      this.onSaveCalendar = this.onSaveCalendar.bind(this);
    }


    handleCalendarChange(e) {
      this.setState({ markedDays: e });
      console.log(this.state.markedDays);
    }

    componentDidMount() {
      const { id } = this.props.match.params;
      this.state.id = id
      console.log(id);
      console.log(this.state.id);
      axios.get(API_BASE_URL + 'employee/'+id)
        .then(res => {
          const employees = res.data;
          this.setState({ employees });
        })
    }

    renderBirthdate(employee, months){
      if(employee.fechaNac !== null)
         return employee.fechaNac.split("-")[2] + ' de ' + months[employee.fechaNac.split("-")[1] - 1];
         ;
      return null;
   }





    onSaveCalendar() {
      console.log('here');
      this.state.markedDays.forEach((element) => {
        const delParam = {
          //TODO Pasar id de empleado correcto
          idEmployees: this.state.id
        }
        const empShift = {
          nombreTurno: element.nombreTurno,
          //TODO Pasar id de empleado correcto
          idEmployees: this.state.id,
          diaSemana: element.diaSemana
        }
        console.log(empShift);
        // Delete old shifts
        axios.post('http://localhost:8000/api/employeesShifts/delete', delParam)
        .then(res => {
            console.log(res)
            // Insert new shifts
            axios.post('http://localhost:8000/api/employeesShifts', empShift)
            .then(res => console.log(res));
          }
        )
        
      });
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


      let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      let sedes = ["No registrado", "Granja Betania", "Asoc. MMK"];
      let puestos = ["No registrado", "Enfermera(o)", "Director(a)", "Servicios Generales", "Lavandería", "Mayordomo", "Hermana", "Dirección administrativa"];
        return (
            <div className="content">
              {this.state.employees.map((employee) => (
              <h1>{employee.nombreCompleto}</h1>
              ))}
              
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Foto de empleado</Badge>
                          </Col>
                          <Col>
                            <Button  className="float-right" size="sm" id="editarfoto"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                            <SimpleTooltip placement="top" target="editarfoto" >Editar foto</SimpleTooltip>
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody className="justify-content-md-center"  style={{ display: 'flex'}}>
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          src={require("assets/img/default-avatar.png")}
                          width="400in"
                          height="500in"
                          style={{ alignSelf: 'center' }}
                        />
                      </a>
                    </CardBody>

                    </Card>
                </Col>
                <Col>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Datos personales</Badge>
                          </Col>
                          <Col>
                          {this.state.employees.map((employee) => (
                            <Link to=
                            {{
                                  pathname: '/admin/ModifyE1/'+ employee.id,
                                  state:employee.id
                                }}>
                              <Button  className="float-right" size="sm" id="editarpers"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                              <SimpleTooltip placement="top" target="editarpers" >Editar datos personales</SimpleTooltip>
                            </Link>
                            ))}
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    {this.state.employees.map((employee) => (
                    <CardBody>
                      <Row>
                        <Col> 
                          <Label>
                            <strong>Nombre Completo:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.nombreCompleto}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Numero de Seguro Social:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.numSeguroSocial}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Escolaridad:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.scholarship_id}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Cumpleaños:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {this.renderBirthdate(employee, months)}
                           </Label> 
                        </Col>

                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Edad:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            {calculate_age(employee.fechaNac)} años
                          </Label>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col>
                          <Label>
                            <strong>RFC:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.RFC}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>CURP:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.CURP}
                          </Label>
                        </Col>
                      </Row>
                    </CardBody>
                   ))}
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Datos de contacto</Badge>
                          </Col>
                          <Col>
                          {this.state.employees.map((employee) => (
                            <Link to=
                            {{
                                  pathname: '/admin/ModifyE2/'+ employee.id,
                                  state:employee.id
                                }}>
                              <Button  className="float-right" size="sm" id="editarpers"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                              <SimpleTooltip placement="top" target="editarpers" >Editar datos de contacto</SimpleTooltip>
                              </Link>
                               ))}
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    {this.state.employees.map((employee) => (
                    <CardBody>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Telefono:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.telefono}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Celular:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.celular}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Correo:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.correo}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Estado:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.estado}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Ciudad:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.ciudad}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Calle:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.calle}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Número exterior:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.numExterior}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Número interior:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.numInterior}
                          </Label>
                        </Col>
                      </Row>
                      
                    </CardBody>
                   ))}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Datos de empleado</Badge>
                          </Col>
                          <Col>
                          {this.state.employees.map((employee) => (
                          <Link to=
                            {{
                                  pathname: '/admin/ModifyE3/'+ employee.id,
                                  state:employee.id
                                }}>
                              <Button  className="float-right" size="sm" id="editaremp"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                              <SimpleTooltip placement="top" target="editaremp" >Editar datos de empleado</SimpleTooltip>
                            </Link>
                             ))}
                          </Col>

                        </Row>
                      </CardTitle>
                    </CardHeader>
                    {this.state.employees.map((employee) => (
                    <CardBody>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Sede:</strong>
                          </Label>
                        </Col>
                        <Col>

                          <Label style={{'font-size': '25px', 'color':'#3272a7'}} >
                            {sedes[employee.headquarter_id]}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Suscrito en app móvil:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label style={{'font-size': '20px'}} >
                            <FontAwesomeIcon icon={['fas', 'check-circle']} color="green"/>

                            
                          </Label>
                        </Col>
                      </Row>
                        <Row>
                        <Col>
                          <Label>
                            <strong>Antiguedad en la organización:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {calculate_age(employee.fechaIngreso)} años
                          </Label>
                        </Col>
                      </Row> 
                      <Row>
                        <Col>
                          <Label>
                            <strong>Puesto:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {puestos[employee.puesto]}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Frecuencia de pago de salario:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            {employee.frecuenciaSalario}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Salario:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            $ {employee.salarioxhora}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Absencias en la quincena:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            Ninguna
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Retardos en la quincena:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                            2 retardos
                          </Label>
                        </Col>
                      </Row>
                    </CardBody>
                    ))}
                  </Card>
                </Col>
              </Row>
              <Row>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Badge color="primary">Calendario de empleado</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardBody>
                  {this.state.employees.map((employee) => (    
                    <EmployeeCalendarTable employeeId={employee.id} onChange={this.handleCalendarChange} />
                    ))}
                    <button className="btn btn-primary float-right"
                      onClick={() => { this.onSaveCalendar() }}>Guardar Cambios
                      </button>
                     
                  </CardBody>
                </Card>
              </Row>
              <Row>
                <Col>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                        <Col>
                          <Badge color="primary">Documentos</Badge>
                          </Col>
                          <Col>
                            <Button  className="float-right" size="sm" id="RegistrarDocumentos"><FontAwesomeIcon icon={['fas', 'plus-square']} /></Button>
                            <SimpleTooltip placement="top" target="RegistrarDocumentos" >Registrar documentos</SimpleTooltip>
                          </Col>
                          </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <TableEmployeeFiles/>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Vacaciones</Badge>
                          </Col>
                          <Col>
                            <Button  className="float-right" size="sm" id="RegistrarVacaciones"><FontAwesomeIcon icon={['fas', 'plus-square']} /></Button>
                            <SimpleTooltip placement="top" target="RegistrarVacaciones" >Registrar vacaciones</SimpleTooltip>
                          </Col>
                          
                        </Row>

                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <TableEmployeeVacations/>
                    </CardBody>
                  </Card>
                </Col>
              </Row> 
              
            </div>
        )
    }
}

export default ViewEmployee;
