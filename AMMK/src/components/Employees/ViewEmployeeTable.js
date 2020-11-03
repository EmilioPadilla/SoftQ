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
      employees:[],
      status:1,
    }

    componentDidMount() {
      let id = this.props.dataFromParent;
      console.log(id);
      axios.get(API_BASE_URL + 'employee/')
        .then(res => {
          const employees = res.data;
          this.setState({ employees });
        })
    }


    render() {
      let action;
      if (this.state.status == 1) {
        action = <ModalExitEmployee buttonLabel={<FontAwesomeIcon icon={['fas', 'trash-alt']} />}/>;
      } else {
        action = <ReenterEmp></ReenterEmp>;
      }
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>RFC</th>
                        <th>Puesto</th>
                        <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>

                    {this.state.employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.nombreCompleto}</td>
                        <td>{employee.RFC}</td>
                        <td>{employee.puesto}</td>
                        <td>
                            <Row>
                                <Link to='/admin/view-employee'>
                                <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp; 
                                {action}
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
