/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 19, 2020

*/

import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

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

  function parseVacations(vacations) {
    return vacations.map((vacation) => {
      return { label: vacation.nombre, value: vacation.id };
    });
  }

  class TableEmployeeVacations extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        vacations: [],
      }
    }

    componentDidMount() {
      this.getVacations();
    }

    getVacations() {
      axios.get('http://localhost:8000/api/employeeVacations/1')
      .then(res => {
        const vacations = res.data;
        this.setState({ vacations })
      });
    }

    render() {
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Fecha de registro</th>
                        <th>Fecha de salida</th>
                        <th>Días</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                  {this.state.vacations.map((vacation) => (
                      <tr key={vacation.id}>
                        <td>{vacation.fechaRegistro}</td>
                        <td>{vacation.fechaSalida}</td>
                        <td>{vacation.fechaRegreso}</td>
                        <td>
                            <Row>
                            <a href="/admin/view-employee">
                              <button id="editar" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'edit']} />
                              </button>
                              <SimpleTooltip placement="top" target="editar">Editar registro</SimpleTooltip>
                            </a>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                              <Button color="danger" size="sm" id="eliminar">
                              <FontAwesomeIcon icon={['fas', 'trash-alt']} /> </Button>
                              <SimpleTooltip placement="top" target="eliminar" >Elimina registro</SimpleTooltip>
                          
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

  export default TableEmployeeVacations;
