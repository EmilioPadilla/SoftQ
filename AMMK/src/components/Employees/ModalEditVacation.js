/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';

import axios from 'axios';
import { API_BASE_URL } from '../../index';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleTooltip from "../../views/General/SimpleTooltip";

//  function   onSubmit(e) {
//   Swal.fire(
//     '¡Listo!',
//     'Datos guardados',
//     'success'
//     ).then(function() {
//       window.location = "http://localhost:3000/admin/view-employee";
//   });
// }

const EditVacationModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;



  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="editar" color="gray" className="inline" size="sm" inline onClick={toggle}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
      <SimpleTooltip placement="top" target="editar">Editar</SimpleTooltip>
      {/* <Form onSubmit={this.onSubmit}> */}
      <Modal isOpen={modal} toggle={toggle} className={className} color="primary">
        <ModalHeader toggle={toggle}>Modificar vacaciones</ModalHeader>
        {/* <h3 color="primary">Egresar empleado</h3> */}
        <ModalBody>

              <FormGroup>
                <Label>
                  Fecha de salida
                </Label>
                <Input type="date" />
              </FormGroup>
              <FormGroup>
                <Label>
                  Fecha de regreso
                </Label>
                <Input type="date" />
              </FormGroup>

        </ModalBody>

        <ModalFooter>
          <Button color="info" visibility="none" onClick={toggle}>salir</Button>{' '}
          <Button  onClick={toggle}>Modificar</Button>
        </ModalFooter>
      </Modal>
      {/* </Form> */}
    </div>
  );
}

export default EditVacationModal;
