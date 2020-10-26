import React, { Component } from 'react'
//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//Components
import { Link } from "react-router-dom";
import {Table, Button, Row, Col, ModalBody, ModalFooter, Modal} from 'reactstrap';
import TakeOutD from '../../views/Donors/TakeOutD';
import ReenterD from '../../views/Donors/ReenterD';
import ModalRegistrarDonacion from '../../views/Donors/ModalRegistrarDonacion';

import SimpleTooltip from '../../views/General/SimpleTooltip';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

export default class AdminTablaD extends Component {
    
    state = {
        donors: [],
      }
      
      componentDidMount() {
        axios.get('http://localhost:8000/api/donantes/')
          .then(res => {
            const donors = res.data;
            this.setState({donors});
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
                      <td>{donor.idTipoDonante}</td>
                      <td>{donor.idRecurrencia}</td>
                      <td>
                          <Row>
                                <ModalRegistrarDonacion/>
                                <Col md="2">
                                <Link to='/admin/VistaDonante'>
                                <Button color="info" size="sm" id="verDetalle"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                <SimpleTooltip placement="top" target="verDetalle">Ver detalle</SimpleTooltip>
                                </Link>
                                </Col>
                                <Col md="2">

                                <TakeOutD/>
                                  </Col>
                                  <Col md="2"> <ReenterD/></Col>
                                
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
