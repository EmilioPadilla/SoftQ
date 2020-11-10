import React, { useState } from 'react';

// reactstrap components
import {Button, Modal, ModalBody, ModalHeader, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const ReenterD = (props) => {
  const login = localStorage.getItem("isLoggedIn");
  const idRol = localStorage.getItem("idRol");
  //Redirect in case of wrong role or no login
  if (!login ) {
      window.location = "http://localhost:3000/login";
  }else if(idRol==2){
      window.location = "http://localhost:3000/general/NurseIndex";
  }else if (idRol==1){
      window.location = "http://localhost:3000/admin/Nomina/Nomina";
  }

  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="content">
      <Button color="success" size="sm" id="reingresar" onClick={toggle}><FontAwesomeIcon icon={['fas', 'redo-alt']} /></Button>
      <SimpleTooltip placement="top" target="reingresar">Reingresar</SimpleTooltip>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
        <h3 className="title">REINGRESAR DONANTE</h3>
        </ModalHeader>
        <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                            <Label for="fechaR">&nbsp;Fecha de reingreso:</Label>
                            <Input type="date" id="fechaR"></Input>
                        </FormGroup>
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "comment"]} />
                            <Label for="motivo">&nbsp;Motivo de reingreso</Label>
                            <Input type="textarea" name="motivo" id="motivo" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col md="12">
                        <Button color="success" onClick={toggle}>Reingresar</Button>
                    </Col>
                </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ReenterD;