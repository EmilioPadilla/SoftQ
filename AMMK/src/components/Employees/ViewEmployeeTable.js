/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 12, 2020

*/

import React from "react";


import { Link } from "react-router-dom";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';


import ModalExitEmployee from "components/Employees/ModalExitEmployee.js";
import ReenterEmp from "components/Employees/Re_enter_emp.js";
import SimpleTooltip from "../../views/General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



// reactstrap components
import {
  Table,
  Row,
  Button,
  Col
  } from "reactstrap";



  class ViewEmployeeTable extends React.Component {
    state = {
      employeesA:[],
      employeesI:[],
      action:''
    }

    componentDidMount() {
      let id = this.props.dataFromParent;
      console.log(id);
      //Active employees
      axios.get(API_BASE_URL + 'employee/')
        .then(res => {
          const employeesA = res.data;
          this.setState({ employeesA });
        });
      //Inactive employees
      axios.get(API_BASE_URL + 'inactiveEmployee')
      .then(res => {
        const employeesI = res.data;
        this.setState({ employeesI });
      });
    }



    render() {
      let puesto = ["No registrado", "Enfermera", "Director(a)", "Servicios Generales", "Lavanderia", "Mayordomo", "Hermana", "Dirección administrativa"];
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Celular</th>
                        <th>Puesto</th>
                        <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>

                    {this.state.employeesA.map((employees) => (
                      <tr key={employees.id}>
                        <td>{employees.nombreCompleto}</td>
                        <td>{employees.celular}</td>
                        <td>{puesto[employees.puesto]}</td>
                        <td>
                            <Row>
                                <Link to=
                                {{
                                  pathname: 'view-employee/'+ employees.id,
                                  state:employees.id
                                }}>
                                <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp; 
                                <ModalExitEmployee id={employees.id} employee={employees}/>
                                
                            </Row>
                        </td>
                      </tr>
                    ))}
                    {/* {this.state.action} */}
                    {this.state.employeesI.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.nombreCompleto}</td>
                        <td>{employee.celular}</td>
                        <td>{puesto[employee.puesto]}</td>
                        <td>
                            <Row>
                                <Link to=
                                {{
                                  pathname: '=view-employee/'+ employee.id,
                                  state:employee.id
                                }}>
                                  <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                  <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp; 
                                <ReenterEmp id={employee.id} employee={employee}></ReenterEmp>;
                                
                            </Row>
                        </td>
                      </tr>
                    ))}
                    </tbody>
              </Table>
            </Col>
          </Row>
        );
      }

  }

  export default ViewEmployeeTable;
