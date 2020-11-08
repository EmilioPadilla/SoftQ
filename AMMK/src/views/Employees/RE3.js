/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
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
  Alert,
  Button,
} from "reactstrap";


export default class RegisterEmployee3 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      markedDays: []
    }
    this.onChange = this.onChange.bind(this);
    this.handleCalendarChange = this.handleCalendarChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.value });
  }

  handleCalendarChange(e) {
    this.setState({ markedDays: e });
  }

  onSubmit(e) {
  Swal.fire(
    '¡Listo!',
    'Datos guardados',
    'success'
    ).then(function() {
      window.location = "http://localhost:3000/admin/view-employee";
  });
}


  render() {
    return (
      <>
        <div className="content">
         <h2 className="title">Registrar empleado</h2>
          <Row>
          <Form onSubmit={this.onSubmit}>
            <Col md="12">
              <Card>
                <Card.Header>
                  
                <h3 className="title">Datos de empleado</h3>
                    <Progress value="100" striped color="primary"/>
                    <br></br>
                        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                   </Card.Header>
                <Card.Body>
                  
                    <Form.Row>
                    <Col className="pl-md-1" md="6">
                      <Col>
                        <Form.Group>
                          <label>
                            Fecha de ingreso
                          </label>
                          <Input type="date" />
                        </Form.Group>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Form.Label for="sedeCheckbox">Sede</Form.Label>
                        <Form.Row>
                          <Col>
                        <Form.Group check inline>
                          <Form.Label check>
                            <Input id="MK" defaultValue="" name="sedeRadio" type="radio" />
                          </Form.Label>
                        María Kolbe
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group check inline>
                          <Form.Label check>
                             <Input id="GB" defaultValue="" name="sedeRadio" type="radio" />
                          </Form.Label>
                          Granja Bretania
                        </Form.Group>
                      </Col>
                    </Form.Row>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Col>
                        <Form.Group>
                        <Form.Label for="puestoSelect">Puesto</Form.Label>
                            <Input type="select" name="select" id="puestoSelect">
                            <option defaultValue="1">Selecciona un puesto...</option>
                            <option >Enfermera</option>
                            <option>Servicios Generales</option>
                            <option >Cocina</option>
                            <option >Lavandería</option>
                            <option >Mayordomo</option>
                            <option >Hermana</option>
                            <option >Dirección Administrativa</option>
                            <option >Directora</option>
                            </Input>
                        </Form.Group>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Form.Label for="sedeCheckbox">Salario</Form.Label>
                        <Form.Row>
                          <Col>
                        <Form.Group check inline>
                          <Form.Label check>
                            <Input id="MK" defaultValue="" name="salarioRadio" type="radio" />
                          </Form.Label>
                        Fijo
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group check inline>
                          <Label check>
                             <Input id="GB" defaultValue="" name="salarioRadio" type="radio" />
                          </Label>
                          Variable
                        </Form.Group>
                      </Col>
                    </Form.Row>
                       </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col  md="6">
                        <Col className="pl-md-1">
                          <Form.Group>
                            <label>Monto</label>
                            <Input
                              placeholder="1500"
                              type="text"
                            />
                          </Form.Group>
                        </Col>
                      </Col>
                        <Col>
                          <Form.Group>
                            <Form.Label>Turnos por quincena</Form.Label>
                            <Input
                              placeholder="" type="number"
                            />
                          </Form.Group>
                        </Col>
                    </Form.Row>

                  <Form.Row>
                    <Col>
                      <h4 className="text-center">Calendario de empleado</h4>
                      <EmployeeCalendarTable onChange={this.handleCalendarChange} />
                    </Col>
                  </Form.Row>


                  
                </Card.Body>
              </Card>
              <Row>
                <Col  md="6">
                <Link to='/admin/RE2'>
                  <Button >Regresar</Button>
                  </Link>
                </Col>
                <Col md="6" align="right">
                  <Button type="submit"> Registrar</Button>
                </Col>
              </Row>
            </Col>
            </Form>
          </Row>
        </div>
      </>
    );
  }
}

