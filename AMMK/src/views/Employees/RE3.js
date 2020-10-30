/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import axios from 'axios';


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
  CustomInput
} from "reactstrap";
import EmployeeCalendarTable from "components/Employees/EmployeeCalendarTable.js";


function parseScholarships(scholarships){
  return scholarships.map((scholarship) => {
    return { label: scholarship.descripcion, value: scholarship.id };
  });
}
let Scholarship = [];

class RegisterEmployee3 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      scholarships: [
      ],
    }
    this.onChange = this.onChange.bind(this);
    
    
  }

  onChange(e) {
    this.setState({ value: e.value });
    console.log('scholarship selected: ', e.value);
  }

  componentDidMount() {
    this.getScholarships();
  }

  getScholarships() {
    axios.get('http://localhost:8000/api/scholarship')
    .then(res => this.setState({ scholarships: parseScholarships(res.data) }));
  }


  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Progress value="100" />
                  <br/>
                  <h3 className="title">Registrar Empleado</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                    <Col className="pl-md-1" md="6">
                      <Col>
                        <FormGroup>
                          <label>
                            Fecha de ingreso
                          </label>
                          <Input type="date" />
                        </FormGroup>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Label for="sedeCheckbox">Sede</Label>
                        <Row>
                          <Col>
                        <FormGroup check inline>
                          <Label check>
                            <Input id="MK" defaultValue="" name="sedeRadio" type="radio" />
                          </Label>
                        María Kolbe
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup check inline>
                          <Label check>
                             <Input id="GB" defaultValue="" name="sedeRadio" type="radio" />
                          </Label>
                          Granja Bretania
                        </FormGroup>
                      </Col>
                    </Row>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Col>
                        <FormGroup>
                        <Label for="puestoSelect">Puesto</Label>
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
                        </FormGroup>
                      </Col>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <Label for="sedeCheckbox">Salario</Label>
                        <Row>
                          <Col>
                        <FormGroup check inline>
                          <Label check>
                            <Input id="MK" defaultValue="" name="salarioRadio" type="radio" />
                          </Label>
                        Fijo
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup check inline>
                          <Label check>
                             <Input id="GB" defaultValue="" name="salarioRadio" type="radio" />
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
                            <label>Monto</label>
                            <Input
                              placeholder="1500"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Col>
                        <Col>
                          <FormGroup>
                            <label>Turnos por quincena</label>
                            <Input
                              placeholder="" type="number"
                            />
                          </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col  md="6">
                        <Col className="pl-md-1">
                          <FormGroup>
                            <label target="puestoSelect">Escolaridad</label>
                            <Input type="select" name="select" id="puestoSelect" value={this.state.value} onChange={this.onChange}>
                            <option defaultValue="0">Selecciona una escolaridad...</option>
                            {this.state.scholarships.map((scholarship) => <option key={scholarship.value} value={scholarship.value}>{scholarship.label}</option>)}
                            </Input>
                          </FormGroup>
                        </Col>
                      </Col>
                        <Col md="6">
                          <FormGroup>
                          <Label for="Contrato">Copia de Contrato</Label>
                          <CustomInput type="file" name="customFile" id="Contraro" label="Selecciona un archivo"/>
                          </FormGroup>
                        </Col>
                    <Col>
                      <h4 className="text-center">Calendario de empleado</h4>
                      <EmployeeCalendarTable/>
                    </Col>
                  </Row>


                  </Form>
                </CardBody>
              </Card>
              <Row>
                <Col  md="6">
                <a href="/admin/RE2">
                  <button className="btn btn-primary" onClick={() => { this.handleClick() }}>Regresar</button>
                </a>
                </Col>
                <Col md="6" align="right">
                <a href="/admin/RE3">
                  <button  className="btn btn-primary" onClick={() => { this.handleClick() }}>Terminar</button>
                </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default RegisterEmployee3;