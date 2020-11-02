import React from "react";
import axios from 'axios';

// reactstrap components
import {
    Table,
    Row,
    Button,
    Col
    } from "reactstrap";

class IncomesTable extends React.Component {
    render() {
        return (
            <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Recibe de</th>
                        <th>Monto</th>
                        <th>Folio</th>
                        <th>Factura</th>
                      </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2020-10-10</td>
                      <td>Fondeo Bancomer</td>
                      <td>$15,000</td>
                      <td>57961</td>
                      <td>FE43243G</td>
                    </tr>
                    <tr>
                      <td>2020-10-10</td>
                      <td>Fondeo Bancomer</td>
                      <td>$15,000</td>
                      <td>57961</td>
                      <td>FE43243G</td>
                    </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        )
    }
}

export default IncomesTable;