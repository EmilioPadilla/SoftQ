import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class Facturacion extends Component {
  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>

          <h3 align="center">Datos de Facturación</h3>

          <ProgressBar now={100} />
          <br />
          <div class="container"></div>
          <Form>
            <Form.Row>
              <Form.Group as={Row} controlId="razonSocial">
                <Form.Label>Razón Social:</Form.Label>
                <Form.Control type="text" placeholder="Ejemplo S.A.S" />
              </Form.Group>

              <Form.Group as={Row} controlId="RFCPatronato">
                <Form.Label>RFC:</Form.Label>
                <Form.Control type="text" placeholder="VECJ880326 XXX" />
              </Form.Group>
            </Form.Row>

            <br />

            <Card>
              <Card.Header>Dirección: </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form.Row>
                    <Form.Group as={Row} controlId="calleFacturacion">
                      <Form.Label>Calle</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group controlId="donanteFacturacion">
                      <Form.Label># Interior</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group controlId="donanteFacturacion">
                      <Form.Label># Exterior </Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group controlId="donanteFacturacion">
                      <Form.Label>C.P. </Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Row} controlId="donantefacturacion">
                      <Form.Label>Colonia</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group as={Row} controlId="donantefacturacion">
                      <Form.Label>Ciudad:</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Row} controlId="donantefacturacion">
                      <Form.Label>Municipio</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group as={Row} controlId="donantefacturacion">
                      <Form.Label>Estado:</Form.Label>
                      <Form.Control />
                    </Form.Group>

                    <Form.Group as={Row} controlId="donantefacturacion">
                      <Form.Label>País:</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Form.Row>
                </Card.Text>
              </Card.Body>
            </Card>

            <Form.Row>
              <Form.Group as={Row} controlId="emailPatronato">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="email" placeholder="ejemplo@ejemplo.com" />
              </Form.Group>
            </Form.Row>
            <Form.Row></Form.Row>
          </Form>
          <Form.Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/RegistroDonante2'>
                    <Button><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Anterior</Button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link>
                    <Button>Registrar</Button>
                    </Link>
                    </Col>
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
        </div>
      </div>
    );
  }
}

export default Facturacion;
