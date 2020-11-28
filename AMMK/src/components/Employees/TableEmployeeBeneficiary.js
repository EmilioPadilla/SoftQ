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
import ModalEditEmpBeneficiary from './ModalEditEmpBeneficiary';

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


  class TableEmployeeBeneficiary extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        beneficiaries: [],
        modalEliminar: false,
        form:{
          id: '',
          nombreCompleto: '',
          porcentaje: '',
          Direccion: '',
          rfc: '',
          telefono: '',
          Parentesco: ''
    }
      }
    }
   

    componentDidMount() {
      this.getBeneficiaries();
    }


  peticionDelete=()=>{
    axios.delete(API_BASE_URL + 'empBeneficiary/' + this.state.form.id).then(response=>{
        console.log(response);
        console.log(response.data);
      this.setState({modalEliminar: false});

      const beneficiaries = this.state.beneficiaries.filter(item => item.id !== this.state.form.id);
    this.setState({ beneficiaries });
    })
  }

  seleccionarBeneficiario=(beneficiaries)=>{
    this.setState({
      form: {
        id: beneficiaries.id,
        nombreCompleto: beneficiaries.nombreCompleto,
        Direccion: beneficiaries.Direccion,
        rfc: beneficiaries.rfc,
        porcentaje: beneficiaries.porcentaje,
        telefono: beneficiaries.telefono,
        kinship_id: beneficiaries.kinship_id,
      }
    })
  }

    getBeneficiaries() {
      axios.get(API_BASE_URL + 'empBeneficiary/'+this.props.idEmployee)
      .then(res => {
        const beneficiaries = res.data;
        this.setState({ beneficiaries })
      });
      console.log();
    }

    render() {
      let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let kinships = ["No registrado", "Hija/o", "Hermana/o", "Padre", "Madre", "Prima/o", "Compadre", "Comadre", "Amiga/o", "Cuñada/o"]
        return (
          <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Parentesco</th>
                        <th>Porcentaje</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>RFC</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                  </thead>
                  <tbody>
                  {this.state.beneficiaries.map((beneficiary, i) => (
                      <tr key={beneficiary.id}>
                        <td>{beneficiary.nombreCompleto}</td>
                        <td>{kinships[beneficiary.kinship_id]}</td>
                        <td>{beneficiary.porcentaje}</td>
                        <td>{beneficiary.telefono}</td>
                        <td>{beneficiary.direccion}</td>
                        <td>{beneficiary.rfc}</td>
                        <td>
                          <Row>
                          <Col md="4">
                            <ModalEditEmpBeneficiary id={this.props.idEmployee} beneficiaries={this.state.beneficiaries[i]}/>
                          </Col>
                          <Col md="4">
                              <Link>
                                <SimpleTooltip placement="top" target="eliminar">Eliminar</SimpleTooltip>
                                <Button size="sm" id="eliminar" color="danger" onClick={()=>{this.seleccionarBeneficiario(beneficiary); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={['fas', 'trash-alt']}/></Button>
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
                   ¿Estás segur@ que deseas eliminar el registro de beneficiario?
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

  export default TableEmployeeBeneficiary;
