import React, { Component } from "react";
import { Dropdown, Table } from "reactstrap";
import {
  FormGroup,
  Input,
  Row,
  Col,
  Label,
} from "reactstrap";

class PrincipalDonantes extends Component {
  render() {
    return (
      <div className="content">
        <div class="container-fluid">
          <h1 className="title">Donantes</h1>
          <div class="container">
            <Row>
              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <Label for="estadoDonante">Estado</Label>
                  <Input type="select" name="select" id="estadoDonante">
                    <option selected="1">Activos</option>
                    <option>Inactivos</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col className="pl-md-1" md="6">
                <FormGroup>
                  <Label for="tipoDonanteSelect">Registrar Donante</Label>
                  <Input type="select" name="select" id="tipoDonante">
                    <option selected="1"></option>
                    <option>Particular</option>
                    <option>Empresa</option>
                    <option>Gobierno</option>
                    <option>Patronato</option>
                    <option>Fundación</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="6">
                <label>Busqueda por nombre:</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Maria Sandoval"
                  aria-label="buscarDonante"
                  aria-describedby="searchInput"
                ></input>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="tipoDonanteSelect">Filtrar Tipo de Donante:</Label>
                  <Input type="select" name="select" id="tipoDonante">
                    <option selected="1">Selecciona el tipo de donante...</option>
                    <option>Particular</option>
                    <option>Empresa</option>
                    <option>Gobierno</option>
                    <option>Patronato</option>
                    <option>Fundación</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <div class="container">
              <Row>
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PrincipalDonantes;
