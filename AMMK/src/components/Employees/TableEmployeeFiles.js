/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 19, 2020

*/

import React from "react";
import axios from 'axios';

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

  class TableEmployeeFiles extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        employeeFiles: [],
      }
    }

    componentDidMount() {
      this.getVacations();
    }

    getVacations() {
      axios.get('http://localhost:8000/api/employeeFiles/1')
      .then(res => {
        const employeeFiles = res.data;
        this.setState({ employeeFiles })
      });
    }
    render() {
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Documento</th>
                        <th>Comentarios</th>
                        <th>Fecha de registro</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                  {this.state.employeeFiles.map((employeeFile) => (
                      <tr key={employeeFile.id}>
                        <td>{employeeFile.nombre}</td>
                        <td>{employeeFile.comentarios}</td>
                        <td>{employeeFile.fecha}</td>
                        <td className="text-right">
                        <Row>
                          <Col md="3">
                            <a href="/admin/view-employee">
                              <button id="verDetalle" type="button" class="btn btn-info btn-sm">
                                <FontAwesomeIcon icon={['fas', 'eye']} />
                              </button>
                              <SimpleTooltip placement="top" target="verDetalle">Ver en web</SimpleTooltip>
                            </a>

                          </Col>
                          <Col md="3">
                            <Button color="success" size="sm" id="edit"><FontAwesomeIcon icon={['fas', 'upload']} /></Button>
                            <SimpleTooltip placement="top" target="edit" >Subir nuevo documento</SimpleTooltip>
                          </Col>
                          <Col md="3">
                            <Button color="primary" size="sm" id="descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                            <SimpleTooltip placement="top" target="descargar" >Descargar documento</SimpleTooltip>
                          </Col>

                          <Col md="3">

                            <Button color="danger" size="sm" id="eliminar">
                            <FontAwesomeIcon icon={['fas', 'trash-alt']} /> </Button>
                            <SimpleTooltip placement="top" target="eliminar" >Elimina documentor</SimpleTooltip>
                          </Col>
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

  export default TableEmployeeFiles;
