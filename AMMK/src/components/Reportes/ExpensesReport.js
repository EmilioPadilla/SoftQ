import React, { Component } from 'react';
import axios from 'axios';

import { API_BASE_URL } from '../../index';

// react plugin used to create charts
import { Line, Doughnut } from "react-chartjs-2";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Button
  } from "reactstrap";

// internal components
import GroupedExpensesTable from "../../components/Reportes/GroupedExpensesTable";

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }

  return str;
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
      items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);
  console.log(jsonObject);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

const headers = {
  year: 'Año',
  month: "Mes",
  count: "Egresos",
  total: "Total"
};


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

const doughnutOptions = {
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
  responsive: true
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

const colors = [
  '#586ba4',
  '#f5dd90',
  '#f68e5f',
  '#f76c5e',
  '#f0b67f',
  '#519e8a',
  '#854d27',
  '#dd7230',
  '#f4c95d',
  '#007ea7',
]

const year = (new Date).getFullYear();

class ExpensesResport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            categoryExpenses: [],
            totalExpenses: null,
            chartExpenses: null,
            doughnutColors: []
        }
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        this.exportExpenses = this.exportExpenses.bind(this);
    }

    getExpenses() {
        const params = {
          startDate: this.props.startDate,
          endDate: this.props.endDate
        }
        axios.post(API_BASE_URL + 'expenses/group/month', params)
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

    getCategoryExpenses() {
      const params = {
        startDate: this.props.startDate,
        endDate: this.props.endDate
      }
      axios.post(API_BASE_URL + 'expenses/group/category', params)
      .then((res) => {
        this.setState({
          categoryExpenses: res.data
        });
        this.doughnutColors();
      });
    }

    exportExpenses() {
      var expensesFormatted = [];

      // format the data
      this.state.expenses.forEach((item) => {
        expensesFormatted.push({
              year: item.year,
              month: item.month,
              count: item.count,
              total: item.total
          });
      });

      var fileTitle = 'egresos';

      exportCSVFile(headers, expensesFormatted, fileTitle);
    }
  
    componentDidMount() {
        if (this.props.startDate && this.props.endDate) {
            this.getExpenses();
            this.getCategoryExpenses();
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.props.startDate != prevProps.startDate) ||
            (this.props.endDate != prevProps.endDate)) {
            this.getExpenses();
            this.getCategoryExpenses();
        }
        
    }

    doughnutColors() {
      const chartColors = this.state.categoryExpenses.map((el) => colors[Math.floor(Math.random() * colors.length-1)]);
      this.setState({doughnutColors: chartColors});
    }

    render() {
        let lineChartData = {
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

        let doughnutChartData = {
          labels: this.state.categoryExpenses.map((el) => el.nombre),
          datasets: [{
            data: this.state.categoryExpenses.map((el) => el.total),
            borderColor:  "rgba(255,255,255,0)",
            borderWidth: 4,
            backgroundColor: this.state.doughnutColors,
            hoverBackgroundColor: this.state.doughnutColors,
          }]
        };

        return (
            <div>
              
                <Row>
                    <Col lg="6">
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
                                    data={lineChartData.data}
                                    options={chartOptions}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card className="card-chart">
                            <CardHeader>
                            <h5 className="card-category">Egresos por Categoría</h5>
                            <CardTitle tag="h3">
                                <i className="tim-icons icon-money-coins text-info" />{" "}
                                {this.state.totalExpenses}
                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-area">
                                  <Doughnut 
                                  data={doughnutChartData}
                                  options={doughnutOptions} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Button onClick={this.exportExpenses} className="mb-3">Exportar</Button>
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