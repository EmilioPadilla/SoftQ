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
        donations: [],
        modalEliminar: false,
        form: { id:'', fechaDonacion:''}
      }
      
      componentDidMount() {
        axios.get('http://localhost:8000/api/donaciones/')
          .then(res => {
            const donations = res.data;
            this.setState({donations});
          })
      }
      seleccionarEmpresa=(donation)=>{
        this.setState({
          form: {
            id: donation.id,
            fechaDonacion: donation.fechaConsulta,
            
          }
        })
      }
      peticionDelete=()=>{
        axios.delete('http://localhost:8000/api/donaciones/' + this.state.form.id).then(response=>{
            console.log(response);
            console.log(response.data);
          this.setState({modalEliminar: false});
    
          const donations = this.state.donations.filter(item => item.id !== this.state.form.id);
        this.setState({ donations });
        })
      }

    render() {
        return (
            <div>
            <Table hover>
                <thead>
                  <tr>
                      <th>Nombre Donante</th>
                      <th>Tipo Donacion</th>
                      <th>Fecha</th>
                      <th>Monto</th>
                      <th>Descripcion</th>

                  </tr>
                </thead>
      
                <tbody>
                  {this.state.donations.map((donor) => (
                    <tr key={donation.id}>
                      <td>{donor.nombreCompleto1}</td>
                      <td>{donor.idTipoDonante}</td>
                      <td>{donor.idRecurrencia}</td>
                      <td>
                          <Row>
                                
                                <Col md="2">

                              <SimpleTooltip placement="top" target="eliminar">Eliminar</SimpleTooltip>
                              <Button size="sm" id="eliminar" color="danger" onClick={()=>{this.seleccionarEmpresa(donation); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={['fas', 'trash-alt']}/></Button>                                  
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
