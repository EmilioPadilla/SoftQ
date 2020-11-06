import React, { useState } from 'react';

// COMPONENTS
import {Button, Modal, ModalBody, ModalHeader, FormGroup, Input, Label, Row, Col} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";
import Swal from 'sweetalert2';

//API CALLS
import { API_BASE_URL } from '../../index';
import axios from 'axios';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const ModifyTreatment = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="content">
      <Button onClick={toggle} size="sm" id="editar" color=""><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>
      <SimpleTooltip placement="top" target="editar" >Editar</SimpleTooltip>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
        <h3 className="title">MODIFICAR TRATAMIENTO</h3>
        </ModalHeader>
        <ModalBody>
                <Row>
                    <Col md="12">
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                            <Label for="fechaInicio">&nbsp;Fecha de inicio:</Label>
                            <Input type="date" id="fechaInicio"></Input>
                        </FormGroup>
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                            <Label for="exampleInputEmail1">&nbsp;Fecha de finalización:</Label>
                            <Input type="date" id="fechaFin"></Input>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col md="12">
                        <Button color="primary" onClick={toggle}>Modificar</Button>
                    </Col>
                </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModifyTreatment;