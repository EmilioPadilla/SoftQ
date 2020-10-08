import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";


class RDonantesPatronato extends Component {
  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          <br/>
          <ProgressBar now={30} />
                  <br/>
          <div class="container"></div>
          <Form>
            <Form.Row>
              <Form.Group as={Row} controlId="namePatronato">
                <Form.Label>Nombre Completo:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Maria Sandoval Arrieto"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Row} controlId="birthdayPatronato">
                <Form.Label>Fecha de Cumpleaños:</Form.Label>
                <Form.Control type="date" placeholder=" / / " />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Row} controlId="RFCPatronato">
                <Form.Label>RFC:</Form.Label>
                <Form.Control type="text" placeholder="VECJ880326 XXX" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Row} controlId="emailPatronato">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@ejemplo.com" />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Row} controlId="celularPatronato">
                <Form.Label>Celular:</Form.Label>
                <Form.Control type="text" placeholder="442 343 3233" />
              </Form.Group>
                &nbsp;&nbsp;&nbsp;
              <Form.Group as={Row} controlId="telefonoPatronato">
                <Form.Label>Telefono:</Form.Label>
                <Form.Control type="text" placeholder="234 3344" />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default RDonantesPatronato;
