import React from 'react';
import { Link } from "react-router-dom";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import {Table, Button, Row, ModalBody, ModalFooter, Modal, Col} from 'reactstrap';
import TakeOutB from '../../views/Beneficiarias/TakeOutB';
import ReenterB from '../../views/Beneficiarias/ReenterB';
import SimpleTooltip from '../../views/General/SimpleTooltip';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)
  
export default class DonorsTable extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      donors: [],
    }
  }
  
 
  componentDidMount() {
   this.getDonors();
  }

  componentDidUpdate(prevProps){
    if (this.props.statusId != prevProps.statusId || this.props.tipoId != prevProps.tipoId || this.props.inputValue != prevProps.inputValue) {
      this.getDonors();
    }
  }
  getDonors() {
    const params = {
      status_id: this.props.statusId,
      idTipoDonante: this.props.tipoId,
      inputValue: this.props.inputValue

    }
    axios.post(API_BASE_URL + 'donors/filter', params)
      .then(res => {
        const donors = res.data;

        this.setState({ donors });

        console.log(this.state);
      })
  }

  render() {
    return (
      <div>
        <Table hover>
            <thead>
              <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Recurrencia</th>
                  <th>Acciones</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.donors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.nombreCompleto1}</td>
                  <td>{donor.nombre}</td>
                  <td>{donor.nombreR}</td>
                  <td>
                      <Row>
                      <Col md="4">
                      <Link   to={{
                        pathname: '/admin/ViewSpecificDonor'+ donor.id,
                        state:donor.id
                      }}> 
                          <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                          <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                      </Link>
                      </Col>

                          {(() => {
                        switch (donor.status_id) {
                          case 1: return
                          <Col md="4">
                          <Link   to={{
                            pathname: '/admin/donacion/'+ donor.id,
                            state:donor.id
                          }}> 
                              <Button color="info" size="sm" id="verDetalle"><i class="fa fa-plus" aria-hidden="true"></i></Button>
                              <SimpleTooltip placement="top" target="donacion">Registrar Donación</SimpleTooltip>
                          </Link>
                          </Col>
                          case 2: return
                          <ReenterB name={donor.id}/>
                          default: return <TakeOutB id={beneficiary.id} />
                        }
                      })()}
                      </Row>
                  </td>
                </tr>
              ))}
            </tbody>
  
        </Table>

       

      </div>
    )
  }
} 