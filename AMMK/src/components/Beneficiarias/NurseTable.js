import React from 'react';
import { Link } from "react-router-dom";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import {Table, Button, Row, ModalBody, ModalFooter, Modal, Col, ModalHeader, Alert} from 'reactstrap';
import SimpleTooltip from '../../views/General/SimpleTooltip';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)
  
export default class NurseTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      beneficiaries: [],
    }
  }
  
  componentDidMount() {
    this.getBeneficiaries();
  }

  componentDidUpdate(prevProps) {
    if (this.props.inputValue != prevProps.inputValue || this.props.sedeId != prevProps.sedeId){
      this.getBeneficiaries();
    }
  }

  getBeneficiaries() {
    const params = {
      sedeId: this.props.sedeId,
      inputValue: this.props.inputValue
    }
    axios.post(API_BASE_URL + 'beneficiaries/filterActive', params)
      .then(res => {
        const beneficiaries = res.data;
        
        this.setState({ beneficiaries });

        console.log(this.state);
      })
  }

  render() {
    let sedes = ["", "Asoc. MMK", "Granja Betanía"];
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return (
      <div>
        <Table hover>
            <thead>
              <tr>
                  <th>Nombre</th>
                  <th>Fecha de nacimiento</th>
                  <th>DX médico</th>
                  <th>sede</th>
                  <th>acciones</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id}>
                  <td>{beneficiary.nombreCompleto}</td>
                  <td>{beneficiary.fechaNacimiento.split("-")[2]} de {months[beneficiary.fechaNacimiento.split("-")[1] - 1]} del {beneficiary.fechaNacimiento.split("-")[0]}</td>
                  <td>{beneficiary.dxMedico}</td>
                  <td>{sedes[beneficiary.headquarter_id]}</td>
                  <td>
                  <Row>

                                            <Col md="6">
                                            <Link   to={{
                                                    pathname: 'MedicalRecordView/'+ beneficiary.id,
                                                    state:beneficiary.id
                                                  }} hist={this.props.history}> 
                                                <Button color="warning" size="sm" id="verHistorial"><FontAwesomeIcon icon={['fas', 'notes-medical']} /></Button>
                                                <SimpleTooltip placement="top" target="verHistorial" >Ver historial médico</SimpleTooltip>
                                                </Link>
                                            </Col>

                                            <Col md="6">
                                            <Link   to={{
                                                    pathname: 'SpecificView/'+ beneficiary.id,
                                                    state:beneficiary.id
                                                  }} hist={this.props.history}> 
                                                <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                                <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                                </Link>
                                            </Col>
                                        </Row>
                  </td>
                </tr>
              ))}
            </tbody>
  
        </Table>

        <Modal isOpen={this.state.modalEliminar}>
        <ModalHeader>
                <Alert align="center" color="danger">ATENCIÓN: ELIMINAR UNA CONSULTA ES UNA ACCIÓN PERMANENTE</Alert>
                </ModalHeader>
                <ModalBody align="center">
                   <p style={{'fontSize': '20px'}}>¿Estás segur@ que deseas eliminar la consulta médica?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"onClick={()=>this.setState({modalEliminar: false})}>Cancelar</Button>
                  <Button color="danger" onClick={()=>this.peticionDelete()}>Eliminar</Button>
                </ModalFooter>
        </Modal>

      </div>
    )
  }
} 