import React, { Component } from "react";
import { Row, Modal, Form, Dropdown,Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleTooltip from "../General/SimpleTooltip";

class ModalRegistrarDonacion extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (

      <React.StrictMode>
        <Col>
     <Button  size="sm" id="registrarDonacion" className="btn btn-primary float-right" onClick={() => {
            this.handleModal();
          }}><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
      <SimpleTooltip placement="top" target="registrarDonacion" >Registrar Donación</SimpleTooltip>

</Col>

      {/* <React.StrictMode> */}
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            this.handleModal();
          }}
        >
          Iniciar Sesión
        </button>
        <Modal show={this.state.show} onHide={() => this.handleModal()} top>
          <Modal.Header closeButton>
            <Modal.Title>Registrar Donación:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="container">
            <Form>
              <Form.Row>
                <Form.Group as={Row} controlId="birthdayPatronato">
                  <Form.Label>Fecha en que se realizó:</Form.Label>
                  <Form.Control type="date" placeholder=" / / " />
                </Form.Group>
              </Form.Row>

                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Monetario"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Especie"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                  </div>
                ))}

              {/*Donacion Monetaria*/}
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Selecciona medio de pago...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Efectivo</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Cheque</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Transferencia</Dropdown.Item>
                  <Dropdown.Item href="#/action-4">Cargo a tarjeta</Dropdown.Item>
                  <Dropdown.Item href="#/action-5">Paypal</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Row>
                <Form.Group as={Row} controlId="birthdayPatronato">
                  <Form.Label>Monto:</Form.Label>
                  <Form.Control type="date" placeholder="$3,000.00" />
                </Form.Group>
              </Form.Row>

                            {/*Donacion en especie*/}

            <Form.Row>
              <Form.Group as={Row} controlId="razonSocial">
                <Form.Label>Descripción:</Form.Label>
                <Form.Control type="text" placeholder="15 paquetes de arroz, 3 latas de atún y 5kg de frijols" />
              </Form.Group>
              </Form.Row>


              <Col align="center">

              <Button
                className="btn btn-outline-primary"
                onClick={() => {
                  this.handleClick();
                }}
              >
                Registrar
              </Button>

          </Col>

          </Form>
            </div>
          </Modal.Body>

          <Modal.Footer></Modal.Footer>
        </Modal>
      </React.StrictMode>
    );
  }
}

export default ModalRegistrarDonacion;
