import React, { Component } from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../../index';

// react plugin used to create charts
import { Line } from "react-chartjs-2";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col
  } from "reactstrap";

// internal components
import GroupedExpensesTable from "../../components/Reportes/GroupedExpensesTable";

const chartOptions = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          ticks: {
            suggestedMin: 50,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
};

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

const year = (new Date).getFullYear();

class ExpensesResport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            totalExpenses: null,
            chartExpenses: null
        }
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
    }

    getExpenses() {
        const params = {
          startDate: this.props.startDate,
          endDate: this.props.endDate
        }
        axios.post(API_BASE_URL + 'expenses/group', params)
        .then((res) => {
          this.setState({
            expenses: res.data,
            totalExpenses: this.formatter.format(
              res.data.reduce((accum,item) => accum + parseFloat(item.total), 0)
            )
          });
          if (this.props.onChange) {
            this.props.onChange(this.state.totalExpenses);
          }
        });
      }

    componentDidMount() {
        if (this.props.startDate && this.props.endDate) {
            this.getExpenses();
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.props.startDate != prevProps.startDate) ||
            (this.props.endDate != prevProps.endDate)) {
            this.getExpenses();
        }
        
    }

    render() {
        let expensesChartData = {
            data: canvas => {
              let ctx = canvas.getContext("2d");
          
              let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          
              gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
              gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
              gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors
          
              return {
                labels: this.state.expenses.map((el) => monthNames[el.month] + ' ' + el.year).reverse(),
                datasets: [
                  {
                    label: "Data",
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderColor:  "#00d6b4",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#00d6b4",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#00d6b4",
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: this.state.expenses.map((el) => el.total).reverse()
                  }
                ]
              };
            }
        };

        return (
            <div>
              
                <Row>
                    <Col lg="12">
                        <Card className="card-chart">
                            <CardHeader>
                            <h5 className="card-category">Egresos</h5>
                            <CardTitle tag="h3">
                                <i className="tim-icons icon-money-coins text-info" />{" "}
                                {this.state.totalExpenses}
                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-area">
                                    <Line
                                    data={expensesChartData.data}
                                    options={chartOptions}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col lg="11">
                        <GroupedExpensesTable
                            expenses={this.state.expenses}
                            onChange={this.onExpensesChange}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ExpensesResport;