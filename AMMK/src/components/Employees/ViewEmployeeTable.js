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
import SimpleTooltip from "../../views/General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';



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
                        <td>{employee.civil_status_id}</td>
                        <td>
                            <Row>
                                <Link to='/admin/view-employee'>
                                <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                </Link>
                                &nbsp;&nbsp;&nbsp;&nbsp; 
                                <ModalExitEmployee buttonLabel={<FontAwesomeIcon icon={['fas', 'trash-alt']} />}/>
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
