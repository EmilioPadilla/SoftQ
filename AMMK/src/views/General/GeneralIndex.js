/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";

import { Link } from "react-router-dom";

// import AccountPlusIcon from 'mdi-react/AccountPlusIcon';
// import AccountSearchIcon from 'mdi-react/AccountSearchIcon';
// import DeleteIcon from 'mdi-react/DeleteIcon';



// reactstrap components
import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardBody,
  CardFooter,
  FormGroup,
  Input,
  Row,
  Col,
  Progress,
  CustomInput,
  Label,
  Table
} from "reactstrap";


class GeneralIndex extends React.Component {
  render() {
    return (
      <>
      <div className="content">
      <Row>
        <div className="photo">
          <img
            alt="..."
            className="avatar"
            src={require("assets/img/emilyz.jpg")}
          />
        </div>
      </Row>
      <Row>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Total Shipments</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-bell-55 text-info" />{" "}
                763,215
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                {/* <Line
                  data={chartExample2.data}
                  options={chartExample2.options}
                /> */}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Daily Sales</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                3,500€
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                {/* <Bar
                  data={chartExample3.data}
                  options={chartExample3.options}
                /> */}
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Completed Tasks</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-send text-success" /> 12,100K
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                {/* <Line
                  data={chartExample4.data}
                  options={chartExample4.options}
                /> */}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
      </>
    );
  }
}
export default GeneralIndex;
