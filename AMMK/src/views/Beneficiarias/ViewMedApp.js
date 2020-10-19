import React, { useState } from 'react';

// reactstrap components
import {Alert, Card, CardBody, Form, InputGroupAddon, Button, Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Input, Label, Row, Col, InputGroup, InputGroupText, CustomInput, Badge} from 'reactstrap';
import SimpleTooltip from "../General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

const ViewMedApp = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="content">
    
    <Button onClick={toggle} size="sm" id="verDetalle" color="info"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
    <SimpleTooltip placement="top" target="verDetalle" >Ver detalle</SimpleTooltip>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
        <h3 className="title">CONSULTA MÉDICA</h3>
        </ModalHeader>
        <ModalBody>
                        <Form>
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'calendar-alt']} />
                                <Label for="fechaConsulta">&nbsp;Fecha de consulta médica:</Label>
                                <p>08/09/2020</p>
                            </FormGroup>
                            
                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'diagnoses']} />
                                <Label for="diagnostico">&nbsp;Diagnóstico:</Label>
                                <p>amigdalitis</p>                            
                            </FormGroup>

                            <FormGroup>
                                <FontAwesomeIcon icon={['fas', 'comment']} />
                                <Label for="comentarios">&nbsp;Comentarios:</Label>
                                <p>asdfghjklssdfghjklcvbnmwertyuisdfghjk</p>
                            </FormGroup>

                            <FormGroup>
                            <FontAwesomeIcon icon={['fas', 'file-prescription']} />
                            <Label for="cargaReceta">&nbsp;Receta médica:</Label>
                            <Row>
                                <Col md="12">
                            <img src="archivosBeneficiarias/<?php echo obtenerImagen($idBeneficiaria.'_receta_')?>" width="500" class="img-fluid" alt="Imagen de receta médica" id="recetaMedica" onerror="this.onerror=null; this.src='avatar.jpg';"></img>
                                </Col>
                            </Row>
                            </FormGroup>
                            </Form>
                            <Row align="center">
                                <Col md="12">
                                    <Button color="primary" onClick={toggle}>Ok</Button>
                                </Col>
                            </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ViewMedApp;