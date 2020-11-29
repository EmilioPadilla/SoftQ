/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';

import { Button, Col, Row, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, CustomInput, Label, Form } from 'reactstrap';
import SimpleTooltip from "../../views/General/SimpleTooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ModalEditPhoto = (props) => {
  const {
      className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button id="editarPhoto" className="inline float-right" size="sm" onClick={toggle}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
      <SimpleTooltip placement="top" target="editarPhoto">Editar</SimpleTooltip>
      <Form>
      <Modal isOpen={modal} toggle={toggle} className={className} color="primary">
        <ModalHeader>
        <h3 className="title">Editar foto de ingreso</h3>
        </ModalHeader>
        <ModalBody>
            <Row>
                <Col>
                Para poder editar la foto de ingreso, carga un archivo con categoría 'Imagen de ingreso'.
                </Col>
            </Row>
        </ModalBody>

        <ModalFooter>
          <Button color="success" visibility="none" onClick={toggle}>Entendido!</Button>{' '}
        </ModalFooter>
      </Modal>
      </Form>
    </div>
  );
}

export default ModalEditPhoto;
