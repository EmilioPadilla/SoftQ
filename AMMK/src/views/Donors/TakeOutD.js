import React, { useState } from 'react';

// reactstrap components
import {Alert,  Badge, Button, Modal, ModalBody, ModalHeader, FormGroup, Input, Label, Row, Col, CustomInput} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const TakeOutD = (props) => {
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
      <Button onClick={toggle} color="danger" size="sm" id="egresar"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
      <SimpleTooltip placement="top" target="egresar" >Egresar</SimpleTooltip>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
        <h3 className="title">EGRESAR DONANTE</h3>
        <Badge color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Badge>
        </ModalHeader>
        <ModalBody>
            <FormGroup>
                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                <Label>&nbsp;Fecha de egreso:</Label>
                <Input type="date" id="fechaEgreso" autocomplete="off" required></Input>
            </FormGroup>

            <FormGroup>
                <FontAwesomeIcon icon={['fas', 'comment']} />
                <Label for="motivoEgreso">&nbsp;Motivo:</Label>
                <Input type="textarea" id="motivoEgreso"></Input>
            </FormGroup>

            
                <Row className="text-center">
                    <Col md="12">
                        <Button color="danger" onClick={toggle}>Egresar</Button>
                    </Col>
                </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default TakeOutD;
