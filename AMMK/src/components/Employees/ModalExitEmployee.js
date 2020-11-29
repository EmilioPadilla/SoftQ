/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';
import FileUpload from '../../views/Beneficiarias/FileUpload';

function exitEmployee (id) {
  let motivoEgreso = document.getElementById("motivoEgreso").value;
  let fechaEgreso = document.getElementById("fechaEgreso").value;

  if (fechaEgreso !== '' && motivoEgreso !== '') {
  const egresarEmpleado = {
    status_id: 2,
    fechaEgreso: fechaEgreso,
    motivoEgreso: motivoEgreso
  }
  axios.put(API_BASE_URL+'employee/exit/'+id, egresarEmpleado).then(function() {
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

function getEmployee (id, employee) {
  
}

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    id,
    employee
  } = props;







  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="egresar" color="danger" className="inline" size="sm" onClick={toggle}><FontAwesomeIcon icon={['fas', 'trash-alt']}/></Button>
      <SimpleTooltip placement="top" target="egresar">Egresar</SimpleTooltip>
      <Form>
      <Modal isOpen={modal} toggle={toggle} className={className} color="primary">
        <ModalHeader ><h3 className="title">Egresar empleado</h3></ModalHeader>
        {/* <h3 color="primary">Egresar empleado</h3> */}
        <ModalBody>

              <FormGroup>
                <Label htmlFor="fechaEgreso">
                 * Fecha de egreso
                </Label>
                <Input type="date" id="fechaEgreso" defaultValue={employee.fechaEgreso}/>
              </FormGroup>
              <FormGroup>
                <Label HtmlFor="motivoEgreso">
                 * Motivo:
                  <br/>
                  <textarea rows="3" cols="64" id="motivoEgreso" defaultValue={employee.motivoEgreso}/>
                </Label>
              </FormGroup>

              <FormGroup>
              <Label>Carga de finiquito</Label>
              <FileUpload id={employee.id} view="3"/>
              </FormGroup>
              <br></br>
              <br/>
              <FormGroup>
              <Label>Carga de renuncia</Label>
              <FileUpload id={employee.id} view="3"/>
              </FormGroup>


        </ModalBody>

        <ModalFooter>
          <Button color="info" visibility="none" onClick={toggle}>Cancelar</Button>{' '}
          <Button  onClick={exitEmployee.bind("this", id)}>Egresar</Button>
        </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}

export default ModalExample;
