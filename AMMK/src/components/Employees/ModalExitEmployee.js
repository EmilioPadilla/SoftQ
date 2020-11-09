/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import axios from 'axios';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function exitEmployee (id) {
  let motivoEgreso = document.getElementById("motivoEgreso").value;
  let fechaEgreso = document.getElementById("fechaEgreso").value;
  
  const egresarEmpleado = {
    status_id: 2,
    fechaEgreso: fechaEgreso,
    motivoEgreso: motivoEgreso
  }
  axios.put('http://localhost:8000/api/employee/exit/'+id, egresarEmpleado).then(function() {
    window.location = "http://localhost:3000/admin/search-employee";
});

}

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    id
  } = props;


  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="egresar" color="danger" className="inline" size="sm" inline onClick={toggle}><FontAwesomeIcon icon={['fas', 'trash-alt']}/></Button>
      <SimpleTooltip placement="top" target="egresar">Egresar</SimpleTooltip>
      <Form>
      <Modal isOpen={modal} toggle={toggle} className={className} color="primary">
        <ModalHeader toggle={toggle}>Egresar empleado</ModalHeader>
        {/* <h3 color="primary">Egresar empleado</h3> */}
        <ModalBody>

              <FormGroup>
                <Label htmlFor="fechaEgreso">
                  Fecha de egreso
                </Label>
                <Input type="date" id="fechaEgreso"/>
              </FormGroup>
              <FormGroup>
                <Label HtmlFor="motivoEgreso">
                  Motivo:
                  <br/>
                  <textarea rows="3" cols="64" id="motivoEgreso"/>
                </Label>
              </FormGroup>

              <FormGroup>
              <Label for="DocCurp">Carga de finiquito</Label>
              <CustomInput type="file" name="customFile" id="DocFiniq" label="Selecciona un archivo"/>
              </FormGroup>

              <FormGroup>
              <Label for="DocCurp">Carga de renuncia</Label>
              <CustomInput type="file" name="customFile" id="DocRenuncia" label="Selecciona un archivo"/>
              </FormGroup>


        </ModalBody>

        <ModalFooter>
          <Button color="info" visibility="none" onClick={toggle}>salir</Button>{' '}
          <Button  onClick={exitEmployee.bind("this", id)}>Egresar</Button>
        </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}

export default ModalExample;
