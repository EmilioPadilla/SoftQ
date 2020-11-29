/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/

import React, { useState } from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL, IMAGE_URL } from 'index';
import { Link } from "react-router-dom";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileUpload from '../Beneficiarias/FileUpload';
import Swal from 'sweetalert2';
import SimpleTooltip from "../General/SimpleTooltip";
import EmployeeCalendarTable from "components/Employees/EmployeeCalendarTable.js"
import TableEmployeeFiles from "components/Employees/TableEmployeeFiles.js"
import TableEmployeeVacations from "components/Employees/TableEmployeeVacations.js"
import ModalNewVacation from "components/Employees/ModalNewVacation.js";
import ModalNewEmpBeneficiary from "components/Employees/ModalNewEmpBeneficiary.js";
import ModalEditPhoto from "components/Employees/ModalEditPhoto.js";
import TableEmployeeBeneficiary from "components/Employees/TableEmployeeBeneficiary.js";

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
  Badge,
  Alert
} from "reactstrap";

const calculate_age = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

class ViewEmployee extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        markedDays: [],
        statuses: [],
        employees: [],
        absences: [],
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
      this.getEmployees(id);
      this.getAbsences(id);
      this.getPath();
    }

    getPath() {
      const { id } = this.props.match.params;
      axios.get(API_BASE_URL + 'employee_files/ingreso/' + id)
          .then(res => {
              if (!Object.keys(res.data).length) {
                  console.log("NO DATA!");
                  return;
              }
              //const path = res.data;
              const path = res.data[0].path;

              let pathFinal = IMAGE_URL + "employee_files/" + path;
              document.getElementById("imagenIngreso").src = pathFinal;
          })
  }

    getEmployees(id) {
      axios.get(API_BASE_URL + 'employee/'+id)
      .then(res => {
        const employees = res.data;
        this.setState({ employees });
      })
    }

    getAbsences(id) {
      const employee = {
        idEmployee: id,
      }
      axios.post(API_BASE_URL + 'payrolls',employee)
        .then(res => {
          const absences = res.data;
          this.setState({ absences });
        })
    }

    renderBirthdate(employee, months){
      if(employee.fechaNac !== null)
         return employee.fechaNac.split("-")[2] + ' de ' + months[employee.fechaNac.split("-")[1] - 1];
         ;
      return null;
   }

    onSaveCalendar() {
      let failed = false;
      const delParam = {
        idEmployees: this.state.id
      }
      // Delete old shifts
      axios.post(API_BASE_URL+'employeesShifts/delete', delParam)
      .then(res => {
        console.log(res);
        this.state.markedDays.forEach((element) => {
          const empShift = {
            nombreTurno: element.nombreTurno,
            idEmployees: this.state.id,
            diaSemana: element.diaSemana
          }
          console.log(empShift);
          // Insert new shifts
          axios.post(API_BASE_URL+'employeesShifts', empShift)
          .then((res) => {
            console.log(res);
            // Show success modal if the last modification was successful
            if (element.label == this.state.markedDays.slice(-1)[0].label) {
              Swal.fire(
                '¡Listo!',
                'Calendario modificado de manera exitosa',
                'success'
              )
            }
          })
        });
      });
    }

    getLastPayrollAbsence() {
      if (this.state.absences[0] !== undefined) {
        const absence = this.state.absences[0].faltas;
        return absence;
      } else {
        return "No hay registro";
      }
    }

    render() {
        let scholarship = ["No registrado", 'Sin estudios', 'Primaria', 'Secundaria', 'Preparatoria', 'Carrera técnica', 'Licenciatura', 'Maestría', 'Doctorado'];
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


      let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      let estados = ["no registrado", "AGUASCALIENTES", "BAJA CALIFORNIA", "BAJA CALIFORNIA SUR", "CHIHUAHUA", "CHIAPAS", "CAMPECHE", "CIUDAD DE MEXICO", "COAHUILA", "COLIMA", "DURANGO", "GUERRERO", "GUANAJUATO", "HIDALGO", "JALISCO", "MICHOACAN", "ESTADO DE MEXICO", "MORELOS", "NAYARIT", "NUEVO LEON", "OAXACA", "PUEBLA", "QUINTANA ROO", "QUERETARO", "SINALOA", "SAN LUIS POTOSI"];
      let sedes = ["No registrado", "Granja Betania", "Asoc. Maximiliano María Kolbe"];
      let status = ["", "EMPLEADO ACTIVO", "EMPLEADO INACTIVO"];
      let puestos = ["No registrado", "Enfermera(o)", "Director(a)", "Servicios Generales", "Lavandería", "Mayordomo", "Hermana", "Dirección administrativa"];
        return (
            <div className="content">
              {this.state.employees.map((employee) => (
                 <>
                <h1>{employee.nombreCompleto}</h1>
            

          {(() => {
                  switch (employee.status_id) {
                    case 1:   return <Alert color="primary" style={{ 'fontSize': '25px', 'fontWeight': 'bold', 'textAlign': 'center'  }}>{status[employee.status_id]}</Alert>;
                    case 2:   return <Alert color="danger" style={{ 'fontSize': '25px', 'fontWeight': 'bold', 'textAlign': 'center'  }}>{status[employee.status_id]}</Alert>;
                    default:return '';
                  }
                })()}
              
              <Row>
                <Col md="5">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Foto de empleado</Badge>
                          </Col>
                          <Col>
                            <ModalEditPhoto/>
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody className="justify-content-md-center"  style={{ display: 'flex'}}>
                      <img src="" 
                      width="400in" 
                      height="500in"
                      className="img-fluid" 
                      alt="Imagen de Ingreso" 
                      id="imagenIngreso" 
                      onError={(e) => { e.target.onerror = null; 
                      e.target.src = "https://www.pngitem.com/pimgs/m/22-223925_female-avatar-female-avatar-no-face-hd-png.png" }}></img>
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
                          {/* {this.state.employees.map((employee) => ( */}
                            <Link to=
                            {{
                                  pathname: '/admin/ModifyE1/'+ employee.id,
                                  state:employee.id
                                }}>
                              <Button  className="float-right" size="sm" id="editarpers"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                              <SimpleTooltip placement="top" target="editarpers" >Editar datos personales</SimpleTooltip>
                            </Link>
                            {/* ))} */}
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    {/* {this.state.employees.map((employee) => ( */}
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
                            <strong>Numero de Infonavit:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                          {employee.infonavit}
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
                          {scholarship[employee.scholarship_id]}
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
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        <Row>
                          <Col>
                            <Badge color="primary">Datos de contacto</Badge>
                          </Col>
                          <Col>
                            <Link to=
                            {{
                                  pathname: '/admin/ModifyE2/'+ employee.id,
                                  state:employee.id
                                }}>
                              <Button  className="float-right" size="sm" id="editarpers"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                              <SimpleTooltip placement="top" target="editarpers" >Editar datos de contacto</SimpleTooltip>
                              </Link>
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
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
                          {estados[employee.estado]}
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
                          <Link to=
                            {{
                                  pathname: '/admin/ModifyE3/'+ employee.id,
                                  state:employee.id
                                }}>
                              <Button  className="float-right" size="sm" id="editaremp"><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                              <SimpleTooltip placement="top" target="editaremp" >Editar datos de empleado</SimpleTooltip>
                            </Link>
                          </Col>

                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Sede:</strong>
                          </Label>
                        </Col>
                        <Col>

                          <Label style={{'fontSize': '25px', 'color':'#3272a7'}} >
                            {sedes[employee.headquarter_id]}
                          </Label>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>
                            <strong>Fecha de ingreso:</strong>
                          </Label>
                        </Col>
                        <Col>
                          <Label>
                              {employee.fechaIngreso.split("-")[2]} de {months[employee.fechaIngreso.split("-")[1] - 1]} del {employee.fechaIngreso.split("-")[0]}
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
                            <Label style={{color:'#ce4258'}}>
                              <strong>Ausencias:</strong>
                            </Label>
                        </Col>
                        <Col>
                          <Label>
                            {this.getLastPayrollAbsence()}
                          </Label>
                        </Col>
                      </Row>
                    </CardBody>
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
                    <EmployeeCalendarTable employeeId={this.state.id} onChange={this.handleCalendarChange} />
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
                          <Badge color="primary">Archivos</Badge>
                          </Col>
                          <Col>
                          {/* view will be used to change paths within same component */}
                          <FileUpload id={this.state.id} view="2"/>
                          </Col>
                          </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <TableEmployeeFiles id={employee.id} />
                    </CardBody>
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
                            <Badge color="primary">Beneficiarios de nómina</Badge>
                          </Col>
                          <Col>
                            <ModalNewEmpBeneficiary id={employee.id}/>
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <TableEmployeeBeneficiary idEmployee={employee.id}/>
                    </CardBody>
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
                            <Badge color="primary">Vacaciones</Badge>
                          </Col>
                          <Col>
                            <ModalNewVacation id={employee.id}/>
                          </Col>
                        </Row>
                      </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <TableEmployeeVacations idEmployee={employee.id}/>
                    </CardBody>
                  </Card>
                </Col>
              </Row> 
              </>
                ))}
            </div>
        )
    }
}

export default ViewEmployee;
