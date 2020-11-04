/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;



  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="egresar" color="danger" className="inline" size="sm" inline onClick={toggle}>{buttonLabel}</Button>
      <SimpleTooltip placement="top" target="egresar">Egresar</SimpleTooltip>
      {/* <Form onSubmit={this.onSubmit}> */}
      <Modal isOpen={modal} toggle={toggle} className={className} color="primary">
        <ModalHeader toggle={toggle}>Egresar empleado</ModalHeader>
        {/* <h3 color="primary">Egresar empleado</h3> */}
        <ModalBody>

              <FormGroup>
                <Label>
                  Fecha de nacimiento
                </Label>
                <Input type="date" />
              </FormGroup>
              <FormGroup>
                <Label for="motivoTextArea">
                  Motivo:
                  <br/>
                  <textarea rows="3" cols="68" id="motivoTextArea"/>
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
          <Button  onClick={toggle}>Egresar</Button>
        </ModalFooter>
      </Modal>
      {/* </Form> */}
    </div>
  );
}

export default ModalExample;
