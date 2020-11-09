import React from "react";
import axios from 'axios';

import { API_BASE_URL } from '../../index';

// reactstrap components
import {
    Table,
    Row,
    Button,
    Col
    } from "reactstrap";

class IncomesTable extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        incomes: [],
        totalIncomes: null,
        startDate: props.startDate,
        endDate: props.endDate
      }
      this.formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
    }

    getIncomes() {
      const params = {
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
      axios.post(API_BASE_URL + 'incomes/search', params)
      .then((res) => {
        this.setState({
          incomes: res.data,
          totalIncomes: this.formatter.format(
            res.data.reduce((accum,item) => accum + parseFloat(item.monto), 0)
          )
        });
        if (this.props.onChange) {
          this.props.onChange(this.state.totalIncomes);
        }
      });
    }

    componentDidMount() {
      if (this.props.startDate && this.props.endDate) {
        this.getIncomes();
      }
    }

    componentDidUpdate(prevProps) {
      if ((this.props.startDate != prevProps.startDate) ||
          (this.props.endDate != prevProps.endDate)) {
          this.getIncomes();
      }
    }

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
                    {this.state.incomes.map((income) => (
                      <tr key={income.id}>
                        <td>{income.fechaDonacion}</td>
                        <td>{income.nombreCompleto1}</td>
                        <td>{this.formatter.format(income.monto)}</td>
                        <td>{income.folio}</td>
                        <td>{income.factura}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )
    }
}

export default IncomesTable;