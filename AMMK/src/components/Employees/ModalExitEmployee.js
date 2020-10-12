/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Input, FormGroup, CustomInput, Label } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" className="inline" size="sm" inline onClick={toggle}>{buttonLabel}</Button>

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
          <Button color="info" visibility="none" onClick={toggle}>Salir</Button>{' '}
          <Button color="danger" onClick={toggle}>Egresar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;
