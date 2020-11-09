import React from "react";

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
                        <th className="text-center">Ingresos</th>
                        <th className="text-center">Total</th>
                      </tr>
                  </thead>
                  <tbody>
                    {this.props.incomes.map((income) => (
                      <tr key={income.year * 100 + income.month}>
                        <td className="text-center">{income.year}</td>
                        <td className="text-center">{monthNames[income.month]}</td>
                        <td className="text-center">{income.count}</td>
                        <td className="text-center">{this.formatter.format(income.total)}</td>
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