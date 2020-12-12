import React from 'react';
import { Link } from "react-router-dom";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import { Table, Button, Row, ModalBody, ModalFooter, Modal, Col } from 'reactstrap';
import TakeOutB from '../../views/Beneficiarias/TakeOutB';
import ReenterB from '../../views/Beneficiarias/ReenterB';
import SimpleTooltip from '../../views/General/SimpleTooltip';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class AdminTable extends React.Component {

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
    if (this.props.statusId != prevProps.statusId || this.props.sedeId != prevProps.sedeId || this.props.inputValue != prevProps.inputValue) {
      this.getBeneficiaries();
    }
  }

  getBeneficiaries() {
    const params = {
      statusId: this.props.statusId,
      sedeId: this.props.sedeId,
      inputValue: this.props.inputValue
    }
    axios.post(API_BASE_URL + 'beneficiaries/filter', params)
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
                    <Col md="4">
                      <Link to={{
                        pathname: 'SpecificView/' + beneficiary.id,
                        state: beneficiary.id
                      }} hist={this.props.history}>

                        <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                        <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                      </Link>
                    </Col>
                    <Col md="4">
                      {(() => {
                        switch (beneficiary.status_id) {
                          case 1: return <TakeOutB id={beneficiary.id} history={this.props.history} />
                          case 2: return <ReenterB name={beneficiary.id} history={this.props.history}/>
                          default: return <TakeOutB id={beneficiary.id} history={this.props.history}/>
                        }
                      })()}
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
            <Button color="primary" onClick={() => this.setState({ modalEliminar: false })}>No</Button>
            <Button color="danger" onClick={() => this.peticionDelete()}>Sí</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
} 