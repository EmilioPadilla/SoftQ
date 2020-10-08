import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";



class RDonanteGobierno extends Component {
  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Registrar Donante</h1>
          
           <h3 align="center">(Gobierno/Empresas/Fundaciones)</h3>
        
          <ProgressBar now={30} />
                  <br/>
          <div class="container"></div>
          <Form>
            <Form.Row>
              <Form.Group as={Row} controlId="nameDonanteE">
                <Form.Label>Nombre de la empresa/asociación/fundación:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Fundación Merced"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Row} controlId="nameDonanteE">
                <Form.Label>Nombre del contacto de empresa/asociación/fundación:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Maria Sandoval Goméz"
                />
              </Form.Group>
            </Form.Row>
            
            <br />

            <Card>
  <Card.Header>Dirección: </Card.Header>
  <Card.Body>
    <Card.Text>
    <Form.Row>
    <Form.Group as={Row} controlId="calleDonante">
      <Form.Label>Calle</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group   controlId="donanteInterior">
      <Form.Label># Interior</Form.Label>
      <Form.Control />

    </Form.Group>

    <Form.Group   controlId="donanteExterior">
      <Form.Label># Exterior </Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group  controlId="donanteCP">
      <Form.Label>C.P. </Form.Label>
      <Form.Control />
    </Form.Group>
  </Form.Row>
  <Form.Row>
    <Form.Group as={Row} controlId="donanteColonia">
      <Form.Label>Colonia</Form.Label>
      <Form.Control />
    </Form.Group>

    <Form.Group as={Row}  controlId="donanteCiudad">
      <Form.Label>Ciudad:</Form.Label>
      <Form.Control />

    </Form.Group>

    
  </Form.Row>
     </Card.Text>
    
  </Card.Body>
</Card>
      
  <br />
             
          </Form>
          <Col align="right">
            <a href="/admin/Facturacion">
                    <Button className="btn btn-outline-primary" onClick={() => { this.handleClick() }}>Siguiente</Button>
                  </a>
                  </Col> 
        </div>
      </div>
    );
  }
}

export default RDonanteGobierno;
