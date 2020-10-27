import React, { useState } from 'react';

// reactstrap components
import {Badge, Button, Modal, ModalBody, ModalHeader, FormGroup, Input, Label, Row, Col, CustomInput} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const TakeOutB = (props) => {
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
        <h3 className="title">EGRESAR</h3>
        <Badge color="primary">Los campos marcados con un asterisco (*) son obligatorios.</Badge>
        </ModalHeader>
        <ModalBody>
            <FormGroup>
                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                <Label htmlFor="fechaEgreso">&nbsp;Fecha de egreso:</Label>
                <Input type="date" id="fechaEgreso" autocomplete="off" required></Input>
            </FormGroup>

            <FormGroup>
                <FontAwesomeIcon icon={['fas', 'comment']} />
                <Label htmlFor="motivoEgreso">&nbsp;Motivo:</Label>
                <Input type="textarea" id="motivoEgreso"></Input>
            </FormGroup>

            <FormGroup>
                <FontAwesomeIcon icon={['fas', 'file-uplaod']} />
                <Label htmlFor="hojaEgreso">&nbsp;Hoja de egreso:</Label>
                <CustomInput id="hojaEgreso" type="file" label="Seleccionar archivo..."></CustomInput>
                <Badge color="light">* Recuerda subir un archivo .pdf, .doc/x, .xls/x or .ppt/x</Badge>
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

export default TakeOutB;
