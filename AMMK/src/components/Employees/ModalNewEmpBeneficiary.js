/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Button, Alert, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus } from '@fortawesome/free-solid-svg-icons';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

var kinships = [];

function parseKinship(kinships){
  return kinships.map((kinship) => {
    return { label: kinship.descripcion, value: kinship.id };
  });
}

function getKinship() {
  axios.get(API_BASE_URL+"Kinship")
  .then(res => kinships =  parseKinship(res.data));
}

function newEmpBeneficiary (id) {
  let RFC = document.getElementById("RFC").value;
  let Direccion = document.getElementById("Direccion").value;
  let telefono = document.getElementById("telefono").value;
  let Nombre = document.getElementById("Nombre").value;
  let Parentesco = document.getElementById("Parentesco").value;
  let porcentaje = document.getElementById("porcentaje").value;

  if (Nombre !== ''&& porcentaje !== '' && Parentesco !== '') {
    const registrarBeneficiario = {
      employees_id : id,
      nombreCompleto: Nombre,
      kinship_id: Parentesco,
      porcentaje: porcentaje,
      telefono : telefono,
      rfc : RFC,
      direccion: Direccion
    }
    axios.post(API_BASE_URL+'empBeneficiary',registrarBeneficiario).then(res => {console.log(res)});

    Swal.fire(
      '¡Listo!',
      'Beneficiario registrado de manera exitosa',
      'success'
      ).then(function() {
        this.props.history.push("admin/view-employee/"+id);
      });
  } else {
    Swal.fire( {
      icon: 'error',
      title: 'Oops...',
      text: 'No se han llenado todos los campos obligatorios!',
    })
  }
}


const ModalNewEmpBeneficiary = (props) => {
  const {
    buttonLabel,
    id,
    employee
  } = props;

  useEffect(() => {
    getKinship();
  });

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="registrarBenef" className="inline float-right" size="sm" onClick={toggle}><FontAwesomeIcon icon={faPlus} /></Button>
      <SimpleTooltip placement="top" target="registrarBenef">Agregar beneficiario</SimpleTooltip>
      <Form autoComplete="off">
      <Modal isOpen={modal} toggle={toggle} color="primary">
        <ModalHeader><h3 className="title">Agregar beneficiario</h3></ModalHeader>
        <ModalBody>
        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>

        <Col className="pl-md-1" md="12">
            <FormGroup>
            <Label htmlFor="Nombre">* Nombre Completo</Label>
            <Input
                placeholder="Emilio Padilla Miranda"
                type="text"
                id="Nombre"
            />
            </FormGroup>
        </Col>
        <Col className="pl-md-1" md="12">
            <FormGroup>
            <Label htmlFor="Parentesco">* Parentesco</Label>
            <Input type="select" name="select" id="Parentesco" >
              <option defaultValue="0">Selecciona un parentesco...</option>
              {kinships.map((kinship) => <option key={kinship.value} value={kinship.value}>{kinship.label}</option>)}
            </Input>
            </FormGroup>
        </Col>
        <Col>
        <Row>
          <Col className="pl-md-1" md="6">
              <FormGroup>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                  placeholder="462 264 2021"
                  type="text"
                  id="telefono"
              />
              </FormGroup>
          </Col>
          <Col className="pl-md-1" md="6">
              <FormGroup>
              <Label htmlFor="porcentaje">* Porcentaje</Label>
              <Input
                  placeholder="12"
                  type="number"
                  id="porcentaje"
              />
              </FormGroup>
          </Col>
        </Row>
        </Col>
        <Col className="pl-md-1" md="12">
            <FormGroup>
            <Label htmlFor="RFC">RFC</Label>
            <Input
                placeholder="PAMP951233QQ3"
                type="text"
                id="RFC"
            />
            </FormGroup>
        </Col>
        <Col className="pl-md-1" md="12">
            <FormGroup>
            <Label htmlFor="Direccion">Direccion</Label>
            <Input
                placeholder="Castillo Breton "
                type="text"
                id="Direccion"
            />
            </FormGroup>
        </Col>


        </ModalBody>
        <ModalFooter>
        
          <Button color="info" visibility="none" onClick={toggle}>Cancelar</Button>{' '}
          <Button  onClick={newEmpBeneficiary.bind("this", id)}>Agregar</Button>
        </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}

export default ModalNewEmpBeneficiary;
