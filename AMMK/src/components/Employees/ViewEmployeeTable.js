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
      employees: []
    }

    componentDidMount() {
      let id = this.props.dataFromParent;
      console.log(id);
      this.getEmployees();
    }

    componentDidUpdate(prevProps) {
      console.log("updated"+prevProps);
      if (this.props.statusId != prevProps.statusId || 
        this.props.sedeId != prevProps.sedeId || 
        this.props.inputValue != prevProps.inputValue) {
        this.getEmployees();
      }
    }

    getEmployees() {
      const params = {
        statusId: this.props.statusId,
        sedeId: this.props.sedeId,
        inputValue: this.props.inputValue
      }
      axios.post(API_BASE_URL + 'filterEmployee', params)
        .then(res => {
          console.log(res);
          const employees = res.data;
          
          this.setState({ employees });
  
          console.log(this.state);
        })
    }



    render() {
      let sedes = ["", "Asoc. MMK", "Granja Betanía"];
      let puesto = ["No registrado", "Enfermera", "Director(a)", "Servicios Generales", "Lavanderia", "Mayordomo", "Hermana", "Dirección administrativa"];
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Sede</th>
                        <th>Puesto</th>
                        <th>Acciones</th>
                      </tr>
                  </thead>
                  <tbody>

                  {this.state.employees.map((employees) => (
                      <tr key={employees.id}>
                        <td>{employees.nombreCompleto}</td>
                        <td>{sedes[employees.headquarter_id]}</td>
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
                                {(() => {
                                  switch (employees.status_id) {
                                    case 1:   return <ModalExitEmployee id={employees.id} employee={employees}/>
                                    case 2: return <ReenterEmp id={employees.id} employee={employees}></ReenterEmp>
                                    default:return<ModalExitEmployee id={employees.id}/>
                                  }
                                })()}
                                
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
