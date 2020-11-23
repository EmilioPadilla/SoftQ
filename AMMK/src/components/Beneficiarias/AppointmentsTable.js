import React from 'react';
import { Link } from "react-router-dom";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import {Table, Button, Row, Modal, ModalBody, ModalFooter, Col} from 'reactstrap';
import SimpleTooltip from '../../views/General/SimpleTooltip';
import Swal from 'sweetalert2';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ViewMedApp from 'views/Beneficiarias/ViewMedApp';
library.add(fas)
  
export default class AppointmentTable extends React.Component {
  state = {
    appointments: [],
    modalEliminar: false,
    form:{
          id: '',
          fechaConsulta: '',
          horaConsulta: '',
          hospital: ''
    }
  }
  
  componentDidMount() {
    const {id} = this.props.id;
    axios.get(API_BASE_URL + 'medical_appointments/' + id + '/med' )
      .then(res => {
        const appointments = res.data;
        this.setState({ appointments });
      })
  }

  peticionDelete=()=>{
    axios.delete(API_BASE_URL + 'medical_appointments/' + this.state.form.id).then(response=>{
        console.log(response);
        console.log(response.data);
      this.setState({modalEliminar: false});
      Swal.fire(
          'LISTO!',
          'La consulta médica fue eliminada de manera exitosa.',
          'success'
      )

      const appointments = this.state.appointments.filter(item => item.id !== this.state.form.id);
    this.setState({ appointments });
    })
  }

  seleccionarEmpresa=(appointment)=>{
    this.setState({
      form: {
        id: appointment.id,
        fechaConsulta: appointment.fechaConsulta,
        horaConsulta: appointment.horaConsulta,
        hospital: appointment.hospital
      }
    })
  }

  render() {
    let months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return (
      <div>
        <Table hover>
            <thead>
              <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Hospital</th>
                  <th>Especialidad</th>
                  <th>acciones</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.fechaConsulta.split("-")[2]}-{months[appointment.fechaConsulta.split("-")[1] - 1]}-{appointment.fechaConsulta.split("-")[0]}</td>
                  <td>{appointment.horaConsulta.split(":")[0]}:{appointment.horaConsulta.split(":")[1]}</td>
                  <td>{appointment.hospital} Cons. #{appointment.consultorio}</td>
                  <td>{appointment.specialty.nombre}</td>
                  <td>
                  <Row>
                  <Col md="4">
                      <ViewMedApp name={appointment.id}/>
                  </Col>
                  <Col md="4">
                    <Link to={"/admin/Beneficiarias/ModifyMedApp/" + appointment.id}>
                       <Button size="sm" id="editar" variant="info" onClick={()=>{this.seleccionarEmpresa(appointment);}}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
                       <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
                    </Link>
                    </Col>
                    <Col md="4">
                    <Link>
                            <SimpleTooltip placement="top" target="eliminar">Eliminar</SimpleTooltip>
                            <Button size="sm" id="eliminar" color="danger" onClick={()=>{this.seleccionarEmpresa(appointment); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={['fas', 'trash-alt']}/></Button>
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
                   ¿Estás segur@ que deseas eliminar la consulta médica?
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"onClick={()=>this.setState({modalEliminar: false})}>No</Button>
                  <Button color="danger" onClick={()=>this.peticionDelete()}>Sí</Button>
                </ModalFooter>
        </Modal>
      </div>
    )
  }
} 
    