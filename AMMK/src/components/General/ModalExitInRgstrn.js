import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';

const ModalExitInRegistration = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} 
        toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Salir del registro</ModalHeader>
        <ModalBody>
            <Row className="text-center">
                ¿Estas seguro de querer salir?
                <br/><br/>Se perderán todos los cambios que hayas hecho hasta el momento.
             </Row>
         </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>Salir</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExitInRegistration;