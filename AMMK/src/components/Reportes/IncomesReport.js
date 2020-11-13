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
    Col,
    Button
  } from "reactstrap";

// internal components
import GroupedIncomesTable from "../../components/Reportes/GroupedIncomesTable";

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
  count: "Ingresos",
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
            suggestedMin: 60,
            suggestedMax: 125,
            padding: 20,
            fontColor: "#9a9a9a"
          }
        }
      ],
      xAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9a9a9a"
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

class IncomesResport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            incomes: [],
            totalIncomes: null,
            chartIncomes: null
        }
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        });
        this.exportIncomes = this.exportIncomes.bind(this);
    }

    getIncomes() {
        const params = {
          startDate: this.props.startDate,
          endDate: this.props.endDate
        }
        axios.post(API_BASE_URL + 'incomes/group', params)
        .then((res) => {
          this.setState({
            incomes: res.data,
            totalIncomes: this.formatter.format(
              res.data.reduce((accum,item) => accum + parseFloat(item.total), 0)
            )
          });
          if (this.props.onChange) {
            this.props.onChange(this.state.totalIncomes);
          }
        });
    }

    exportIncomes() {
      var incomesFormatted = [];

      // format the data
      this.state.incomes.forEach((item) => {
          incomesFormatted.push({
              year: item.year,
              month: item.month,
              count: item.count,
              total: item.total
          });
      });

      var fileTitle = 'ingresos';

      exportCSVFile(headers, incomesFormatted, fileTitle);
    }

    componentDidMount() {
        if (this.props.startDate && this.props.endDate) {
            this.getIncomes();
        }
    }

    componentDidUpdate(prevProps) {
        if ((this.props.startDate != prevProps.startDate) ||
            (this.props.endDate != prevProps.endDate)) {
            this.setState({
                startDate: this.props.startDate,
                endDate: this.props.endDate
            });
            console.log('Here');
            this.getIncomes();
        }
        
    }

    render() {
        let incomesChartData = {
            data: canvas => {
              let ctx = canvas.getContext("2d");
          
              let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
          
              gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
              gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
              gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
          
              return {
                labels: this.state.incomes.map((el) => monthNames[el.month] + ' ' + el.year).reverse(),
                datasets: [
                  {
                    label: "Data",
                    fill: true,
                    backgroundColor: gradientStroke,
                    borderColor: "#1f8ef1",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: "#1f8ef1",
                    pointBorderColor: "rgba(255,255,255,0)",
                    pointHoverBackgroundColor: "#1f8ef1",
                    pointBorderWidth: 20,
                    pointHoverRadius: 4,
                    pointHoverBorderWidth: 15,
                    pointRadius: 4,
                    data: this.state.incomes.map((el) => el.total).reverse()
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
                            <h5 className="card-category">Ingresos</h5>
                            <CardTitle tag="h3">
                                <i className="tim-icons icon-money-coins text-info" />{" "}
                                {this.state.totalIncomes}
                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-area">
                                    <Line
                                    data={incomesChartData.data}
                                    options={chartOptions}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Button onClick={this.exportIncomes} className="mb-3 d-print-none">Exportar</Button>
                <Row className="d-flex justify-content-center">
                    <Col lg="11">
                        <GroupedIncomesTable
                            incomes={this.state.incomes}
                            onChange={this.onIncomesChange}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default IncomesResport;