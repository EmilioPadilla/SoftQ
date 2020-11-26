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
import  EditVacationModal  from './ModalEditVacation';

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
      axios.get('http://localhost:8000/api/employeeVacations/'+this.props.idEmployee)
      .then(res => {
        const vacations = res.data;
        this.setState({ vacations })
      });
    }

    render() {
      let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
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
                  {this.state.vacations.map((vacation, i) => (
                      <tr key={vacation.id}>
                        <td>{vacation.fechaRegistro.split("-")[2].split(" ")[0]} de {months[vacation.fechaRegistro.split("-")[1] - 1]} del {vacation.fechaRegistro.split("-")[0]} </td>
                        <td>{vacation.fechaSalida.split("-")[2]} de {months[vacation.fechaSalida.split("-")[1] - 1]} del {vacation.fechaSalida.split("-")[0]}</td>
                        <td>{vacation.fechaRegreso.split("-")[2]} de {months[vacation.fechaRegreso.split("-")[1] - 1]} del {vacation.fechaRegreso.split("-")[0]}</td>
                        <td>
                          <Row>
                          <Col md="4">
                            <EditVacationModal id={this.props.idEmployee} vacations={this.state.vacations[i]}/>
                          </Col>
                          <Col md="4">
                              <Link>
                                <SimpleTooltip placement="top" target="eliminar">Eliminar</SimpleTooltip>
                                <Button size="sm" id="eliminar" color="danger" onClick={()=>{this.seleccionarVacacion(vacation); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={['fas', 'trash-alt']}/></Button>
                              </Link>
                              </Col>
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
