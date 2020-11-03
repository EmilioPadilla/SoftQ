/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 19, 2020

*/

import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { API_BASE_URL } from '../../index';

import SimpleTooltip from "../../views/General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// reactstrap components
import {
  Table,
  Row,
  Button,
  Col,
  Modal, 
  ModalBody, 
  ModalFooter
  } from "reactstrap";


  class TableEmployeeVacations extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        vacations: [],
        modalEliminar: false,
        form:{
          id: '',
          fechaRegistro: '',
          fechaSalida: '',
          fechaRegreso: ''
    }
      }
    }

    componentDidMount() {
      this.getVacations();
    }


  peticionDelete=()=>{
    axios.delete(API_BASE_URL + 'employeeVacations/' + this.state.form.id).then(response=>{
        console.log(response);
        console.log(response.data);
      this.setState({modalEliminar: false});

      const vacations = this.state.vacations.filter(item => item.id !== this.state.form.id);
    this.setState({ vacations });
    })
  }

  seleccionarVacacion=(vacations)=>{
    this.setState({
      form: {
        id: vacations.id,
        fechaRegistro: vacations.fechaRegistro,
        fechaSalida: vacations.fechaSalida,
        fechaRegreso: vacations.fechaRegreso
      }
    })
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
                        <th>Fecha de regreso</th>
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
                              <Link>
                                <SimpleTooltip placement="top" target="eliminar">Eliminar</SimpleTooltip>
                                <Button size="sm" id="eliminar" color="danger" onClick={()=>{this.seleccionarVacacion(vacation); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={['fas', 'trash-alt']}/></Button>
                              </Link>
                            </Row>
                        </td>
                      </tr>
                    ))}
                    </tbody>
              </Table>
              <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                   ¿Estás segur@ que deseas eliminar el registro de estas vacaciones?
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"onClick={()=>this.setState({modalEliminar: false})}>No</Button>
                  <Button color="danger" onClick={()=>this.peticionDelete()}>Sí</Button>
                </ModalFooter>
        </Modal>
            </Col>
          </Row>
        );
    }
  }

  export default TableEmployeeVacations;
