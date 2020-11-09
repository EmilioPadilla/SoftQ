import React from "react";
import axios from 'axios';

import { API_BASE_URL } from '../../index';

// reactstrap components
import {
    Table,
    Row,
    Col
    } from "reactstrap";

const monthNames = {
    1: 'ENE',
    2: 'FEB',
    3: 'MAR',
    4: 'ABR',
    5: 'MAY',
    6: 'JUN',
    7: 'JUL',
    8: 'AGO',
    9: 'SEP',
    10: 'OCT',
    11: 'NOV',
    12: 'DEC',
};

class GroupedIncomesTable extends React.Component {

    constructor(props) {
      super(props);
      this.formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
    }

    render() {        
        return (
            <Row>
            <Col md="12">
              <Table hover >
                  <thead>
                      <tr>
                        <th className="text-center">Año</th>
                        <th className="text-center">Mes</th>
                        <th className="text-center">Egresos</th>
                        <th className="text-center">Total</th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.props.expenses.map((expense) => (
                      <tr key={expense.year * 100 + expense.month}>
                        <td className="text-center">{expense.year}</td>
                        <td className="text-center">{monthNames[expense.month]}</td>
                        <td className="text-center">{expense.count}</td>
                        <td className="text-center">{this.formatter.format(expense.total)}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        )
    }
}

export default GroupedIncomesTable;