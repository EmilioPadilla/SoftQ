import React, { useState } from 'react';

// reactstrap components
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import Swal from 'sweetalert2';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

function reEnterEmployee (id) {
  let motivoReingreso = document.getElementById("motivoReingreso").value;
  let fechaReingreso = document.getElementById("fechaReingreso").value;
  
  if (fechaReingreso !== '' && motivoReingreso !== '') {
  const reingresarEmpleado = {
    status_id: 1,
    fechaReingreso: fechaReingreso,
    motivoReingreso: motivoReingreso
  }
  axios.put(API_BASE_URL+'employee/reenter/'+id, reingresarEmpleado).then(function() {
    window.location = FRONT_BASE_URL+"admin/search-employee";
  });
  } else {
    Swal.fire( {
      icon: 'error',
      title: 'Oops...',
      text: 'No se han llenado todos los campos obligatorios!',
    })
}
}

const ReenterEmp = (props) => {
  const {
    className,
    id,
    employee
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <div className="content">
      <Button color="success" size="sm" id="reingresar" onClick={toggle}><FontAwesomeIcon icon={['fas', 'redo-alt']} /></Button>
      <SimpleTooltip placement="top" target="reingresar">Reingresar</SimpleTooltip>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader >
        <h3 className="title">Reingresar empleado</h3>
        </ModalHeader>
        <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                            <Label for="fechaR">&nbsp;Fecha de reingreso:</Label>
                            <Input type="date" id="fechaReingreso" defaultValue={employee.fechaReingreso}></Input>
                        </FormGroup>
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "comment"]} />
                            <Label for="motivo">&nbsp;Motivo de reingreso</Label>
                            <textarea rows="3" cols="64" id="motivoReingreso" defaultValue={employee.motivoReingreso}/>
                        </FormGroup>
                    </Col>
                </Row>
                <ModalFooter>
                    <Button color="info" visibility="none" onClick={toggle}>Cancelar</Button>{' '}
                    <Button color="success" onClick={reEnterEmployee.bind("this", id)}>Reingresar</Button>
                 </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ReenterEmp;