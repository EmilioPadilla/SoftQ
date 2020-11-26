/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Button, Col, Row, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

function editBeneficiary (idEmployee, idBeneficiary) {
  let RFC = document.getElementById("RFC").value;
  let Direccion = document.getElementById("Direccion").value;
  let telefono = document.getElementById("telefono").value;
  let Nombre = document.getElementById("Nombre").value;
  let Parentesco = document.getElementById("Parentesco").value;
  let porcentaje = document.getElementById("porcentaje").value;

  if (Nombre !== ''&& porcentaje !== '' && Parentesco !== '') {
    const registrarBeneficiario = {
      employees_id : idEmployee,
      nombreCompleto: Nombre,
      kinship_id: Parentesco,
      porcentaje: porcentaje,
      telefono : telefono,
      rfc : RFC,
      direccion: Direccion
    }
  const link = FRONT_BASE_URL+"admin/view-employee/"+idEmployee
  axios.put(API_BASE_URL+'empBeneficiary/'+idBeneficiary,registrarBeneficiario).then(res => {console.log(res)});

  Swal.fire(
    '¡Listo!',
    'Vacaciones modificadas de manera exitosa',
    'success'
    ).then(function() {
        window.location = link;
    });
  } else {
    Swal.fire( {
      icon: 'error',
      title: 'Oops...',
      text: 'No se han llenado todos los campos obligatorios!',
    })
  }
}



const ModalEditEmpBeneficiary = (props) => {
  const {
    className,
    id,
    beneficiaries
  } = props;

  useEffect(() => {
    getKinship();
  });



  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="editarbeneficairio" className="inline float-right" size="sm" inline onClick={toggle}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
      <SimpleTooltip placement="top" target="editarbeneficairio">Editar</SimpleTooltip>
      <Form>
      <Modal isOpen={modal} toggle={toggle} className={className} color="primary">
        <ModalHeader>
        <h3 className="title">Editar beneficiario</h3>
        </ModalHeader>
        <ModalBody>
        <Alert color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Alert>

        <Col className="pl-md-1" md="12">
            <FormGroup>
            <Label htmlFor="Nombre">* Nombre Completo</Label>
            <Input
                placeholder="Emilio Padilla Miranda"
                type="text"
                id="Nombre"
                defaultValue={beneficiaries.nombreCompleto}
            />
            </FormGroup>
        </Col>
        <Col className="pl-md-1" md="12">
            <FormGroup>
            <Label htmlFor="Parentesco">* Parentesco</Label>
            <Input type="select" name="select" id="Parentesco" defaultValue={beneficiaries.kinship_id}>
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
                  defaultValue={beneficiaries.telefono}
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
                  defaultValue={beneficiaries.porcentaje}
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
                defaultValue={beneficiaries.rfc}
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
                defaultValue={beneficiaries.direccion}
            />
            </FormGroup>
        </Col>


        </ModalBody>

        <ModalFooter>
          <Button color="info" visibility="none" onClick={toggle}>Cancelar</Button>{' '}
          <Button  onClick={editBeneficiary.bind("this", id, beneficiaries.id)}>Modificar</Button>
        </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}

export default ModalEditEmpBeneficiary;
