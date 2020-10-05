/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Alert,
  UncontrolledAlert,
  Button,
  // ButtonGroup, USADO PARA TABLAS
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardFooter,
  CardText,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Form,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// IMPORT DE COMPONENTES PARA CREAR TABLAS
// core components
import {
//   chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bigChartData: "data1"
    };
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
      <>
        <div className="content">
          {/*
            EJEMPLOS DE TABLAS DINAMICAS PARA POSIBLE USO EN MODULO DE REPORTES Y FINANZAS

             <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <h5 className="card-category">Total Shipments</h5>
                      <CardTitle tag="h2">Performance</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Accounts
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Purchases
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Sessions
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample1[this.state.bigChartData]}
                      options={chartExample1.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
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
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
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
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
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
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          <Row>
            <h1>
              Ejemplos
            </h1>
          </Row>
          <Row>
            <h3>
              Reportes
            </h3>
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
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
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
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
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
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <h3>
              Notificaciones
            </h3>
          </Row>

          <Row>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Notifications Style</CardTitle>
                </CardHeader>
                <CardBody>
                  <Alert color="info">
                    <span>This is a plain notification</span>
                  </Alert>
                  <UncontrolledAlert color="info">
                    <span>This is a notification with close button.</span>
                  </UncontrolledAlert>
                  <UncontrolledAlert className="alert-with-icon" color="info">
                    <span
                      className="tim-icons icon-bell-55"
                      data-notify="icon"
                    />
                    <span data-notify="message">
                      This is a notification with close button and icon.
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert className="alert-with-icon" color="info">
                    <span
                      className="tim-icons icon-bell-55"
                      data-notify="icon"
                    />
                    <span data-notify="message">
                      This is a notification with close button and icon and have
                      many lines. You can see that the icon and the close button
                      are always vertically aligned. This is a beautiful
                      notification. So you don't have to worry about the style.
                    </span>
                  </UncontrolledAlert>
                </CardBody>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Notification states</CardTitle>
                </CardHeader>
                <CardBody>
                  <UncontrolledAlert color="primary">
                    <span>
                      <b>Primary - </b>
                      This is a regular notification made with ".alert-primary"
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="info">
                    <span>
                      <b>Info - </b>
                      This is a regular notification made with ".alert-info"
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="success">
                    <span>
                      <b>Success - </b>
                      This is a regular notification made with ".alert-success"
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="warning">
                    <span>
                      <b>Warning - </b>
                      This is a regular notification made with ".alert-warning"
                    </span>
                  </UncontrolledAlert>
                  <UncontrolledAlert color="danger">
                    <span>
                      <b>Danger - </b>
                      This is a regular notification made with ".alert-danger"
                    </span>
                  </UncontrolledAlert>
                </CardBody>
              </Card>
            </Col>
            <Col md="12">
              <Card>
                <CardBody>
                  <div className="places-buttons">
                    <Row>
                      <Col className="ml-auto mr-auto text-center" md="6">
                        <CardTitle tag="h4">
                          Notifications Places<p className="category">
                            Click to view notifications
                          </p>
                        </CardTitle>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-auto mr-auto" lg="8">
                        <Row>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tl")}
                            >
                              Top Left
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tc")}
                            >
                              Top Center
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("tr")}
                            >
                              Top Right
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="ml-auto mr-auto" lg="8">
                        <Row>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("bl")}
                            >
                              Bottom Left
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("bc")}
                            >
                              Bottom Center
                            </Button>
                          </Col>
                          <Col md="4">
                            <Button
                              block
                              color="primary"
                              onClick={() => this.notify("br")}
                            >
                              Bottom Right
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <h3>
              Registros
            </h3>
          </Row>

          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="Creative Code Inc."
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue="michael23"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="mike@email.com" type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/emilyz.jpg")}
                      />
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <h3>
              Tablas
            </h3>
          </Row>
          <Row>
            <Col lg="6" md="12">
              <Card className="card-tasks">
                <CardHeader>
                  <h6 className="title d-inline">Tasks(5)</h6>
                  <p className="card-category d-inline"> today</p>
                  <UncontrolledDropdown>
                    <DropdownToggle
                      caret
                      className="btn-icon"
                      color="link"
                      data-toggle="dropdown"
                      type="button"
                    >
                      <i className="tim-icons icon-settings-gear-63" />
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="dropdownMenuLink" right>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Another action
                      </DropdownItem>
                      <DropdownItem
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Something else
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Update the Documentation</p>
                            <p className="text-muted">
                              Dwuamish Head, Seattle, WA 8:47 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip636901683"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip636901683"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input
                                  defaultChecked
                                  defaultValue=""
                                  type="checkbox"
                                />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">GDPR Compliance</p>
                            <p className="text-muted">
                              The GDPR is a regulation that requires businesses
                              to protect the personal data and privacy of Europe
                              citizens for transactions that occur within EU
                              member states.
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip457194718"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip457194718"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Solve the issues</p>
                            <p className="text-muted">
                              Fifty percent of all respondents said they would
                              be more likely to shop at a company
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip362404923"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip362404923"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Release v2.0.0</p>
                            <p className="text-muted">
                              Ra Ave SW, Seattle, WA 98116, SUA 11:19 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip818217463"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip818217463"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Export the processed files</p>
                            <p className="text-muted">
                              The report also shows that consumers will not
                              easily forgive a company once a breach exposing
                              their personal data occurs.
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip831835125"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip831835125"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultValue="" type="checkbox" />
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </Label>
                            </FormGroup>
                          </td>
                          <td>
                            <p className="title">Arival at export process</p>
                            <p className="text-muted">
                              Capitol Hill, Seattle, WA 12:34 AM
                            </p>
                          </td>
                          <td className="td-actions text-right">
                            <Button
                              color="link"
                              id="tooltip217595172"
                              title=""
                              type="button"
                            >
                              <i className="tim-icons icon-pencil" />
                            </Button>
                            <UncontrolledTooltip
                              delay={0}
                              target="tooltip217595172"
                              placement="right"
                            >
                              Edit Task
                            </UncontrolledTooltip>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Simple Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-center">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-center">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-center">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-center">$56,142</td>
                      </tr>
                      <tr>
                        <td>Philip Chaney</td>
                        <td>Korea, South</td>
                        <td>Overland Park</td>
                        <td className="text-center">$38,735</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-center">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-center">$78,615</td>
                      </tr>
                      <tr>
                        <td>Jon Porter</td>
                        <td>Portugal</td>
                        <td>Gloucester</td>
                        <td className="text-center">$98,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <h3>
              Iconos
            </h3>
          </Row>

          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5 className="title">100 Awesome Nucleo Icons</h5>
                  <p className="category">
                    Handcrafted by our friends from{" "}
                    <a href="https://nucleoapp.com/?ref=1712">NucleoApp</a>
                  </p>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-alert-circle-exc" />
                        <p>icon-alert-circle-exc</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-align-center" />
                        <p>icon-align-center</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-align-left-2" />
                        <p>icon-align-left-2</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-app" />
                        <p>icon-app</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-atom" />
                        <p>icon-atom</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-attach-87" />
                        <p>icon-attach-87</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-badge" />
                        <p>icon-badge</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-bag-16" />
                        <p>icon-bag-16</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-bank" />
                        <p>icon-bank</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-basket-simple" />
                        <p>icon-basket-simple</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-bell-55" />
                        <p>icon-bell-55</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-bold" />
                        <p>icon-bold</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-book-bookmark" />
                        <p>icon-book-bookmark</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-double-right" />
                        <p>icon-double-right</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-bulb-63" />
                        <p>icon-bulb-63</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-bullet-list-67" />
                        <p>icon-bullet-list-67</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-bus-front-12" />
                        <p>icon-bus-front-12</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-button-power" />
                        <p>icon-button-power</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-camera-18" />
                        <p>icon-camera-18</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-calendar-60" />
                        <p>icon-calendar-60</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-caps-small" />
                        <p>icon-caps-small</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-cart" />
                        <p>icon-cart</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-chart-bar-32" />
                        <p>icon-chart-bar-32</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-chart-pie-36" />
                        <p>icon-chart-pie-36</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-chat-33" />
                        <p>icon-chat-33</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-check-2" />
                        <p>icon-check-2</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-cloud-download-93" />
                        <p>icon-cloud-download-93</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-cloud-upload-94" />
                        <p>icon-cloud-upload-94</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-coins" />
                        <p>icon-coins</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-compass-05" />
                        <p>icon-compass-05</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-controller" />
                        <p>icon-controller</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-credit-card" />
                        <p>icon-credit-card</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-delivery-fast" />
                        <p>icon-delivery-fast</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-email-85" />
                        <p>icon-email-85</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-gift-2" />
                        <p>icon-gift-2</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-globe-2" />
                        <p>icon-globe-2</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-headphones" />
                        <p>icon-headphones</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-heart-2" />
                        <p>icon-heart-2</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-html5" />
                        <p>icon-html5</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-double-left" />
                        <p>icon-double-left</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-image-02" />
                        <p>icon-image-02</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-istanbul" />
                        <p>icon-istanbul</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-key-25" />
                        <p>icon-key-25</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-laptop" />
                        <p>icon-laptop</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-light-3" />
                        <p>icon-light-3</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-link-72" />
                        <p>icon-link-72</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-lock-circle" />
                        <p>icon-lock-circle</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-map-big" />
                        <p>icon-map-big</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-minimal-down" />
                        <p>icon-minimal-down</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-minimal-left" />
                        <p>icon-minimal-left</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-minimal-right" />
                        <p>icon-minimal-right</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-minimal-up" />
                        <p>icon-minimal-up</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-mobile" />
                        <p>icon-mobile</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-molecule-40" />
                        <p>icon-molecule-40</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-money-coins" />
                        <p>icon-money-coins</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-notes" />
                        <p>icon-notes</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-palette" />
                        <p>icon-palette</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-paper" />
                        <p>icon-paper</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-pin" />
                        <p>icon-pin</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-planet" />
                        <p>icon-planet</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-puzzle-10" />
                        <p>icon-puzzle-10</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-pencil" />
                        <p>icon-pencil</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-satisfied" />
                        <p>icon-satisfied</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-scissors" />
                        <p>icon-scissors</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-send" />
                        <p>icon-send</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-settings-gear-63" />
                        <p>icon-settings-gear-63</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-settings" />
                        <p>icon-settings</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-wifi" />
                        <p>icon-wifi</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-single-02" />
                        <p>icon-single-02</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-single-copy-04" />
                        <p>icon-single-copy-04</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-sound-wave" />
                        <p>icon-sound-wave</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-spaceship" />
                        <p>icon-spaceship</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-square-pin" />
                        <p>icon-square-pin</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-support-17" />
                        <p>icon-support-17</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-tablet-2" />
                        <p>icon-tablet-2</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-tag" />
                        <p>icon-tag</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-tap-02" />
                        <p>icon-tap-02</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-tie-bow" />
                        <p>icon-tie-bow</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-time-alarm" />
                        <p>icon-time-alarm</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-trash-simple" />
                        <p>icon-trash-simple</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-trophy" />
                        <p>icon-trophy</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-tv-2" />
                        <p>icon-tv-2</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-upload" />
                        <p>icon-upload</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-user-run" />
                        <p>icon-user-run</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-vector" />
                        <p>icon-vector</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-video-66" />
                        <p>icon-video-66</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-wallet-43" />
                        <p>icon-wallet-43</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-volume-98" />
                        <p>icon-volume-98</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-watch-time" />
                        <p>icon-watch-time</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-world" />
                        <p>icon-world</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-zoom-split" />
                        <p>icon-zoom-split</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-refresh-01" />
                        <p>icon-refresh-01</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-refresh-02" />
                        <p>icon-refresh-02</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-shape-star" />
                        <p>icon-shape-star</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-components" />
                        <p>icon-components</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-triangle-right-17" />
                        <p>icon-triangle-right-17</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-button-pause" />
                        <p>icon-button-pause</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-simple-remove" />
                        <p>icon-simple-remove</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-simple-add" />
                        <p>icon-simple-add</p>
                      </div>
                    </Col>
                    <Col
                      className="font-icon-list col-xs-6 col-xs-6"
                      lg="2"
                      md="3"
                      sm="4"
                    >
                      <div className="font-icon-detail">
                        <i className="tim-icons icon-simple-delete" />
                        <p>icon-simple-delete</p>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <h3>
              Tipografía
            </h3>
          </Row>

          <Row>
            <Col md="12">
              <Card>
                <CardHeader className="mb-5">
                  <h5 className="card-category">Black Table Heading</h5>
                  <CardTitle tag="h3">
                    Created using Poppins Font Family
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="typography-line">
                    <h1>
                      <span>Header 1</span>
                      The Life of Black Dashboard React
                    </h1>
                  </div>
                  <div className="typography-line">
                    <h2>
                      <span>Header 2</span>
                      The Life of Black Dashboard React
                    </h2>
                  </div>
                  <div className="typography-line">
                    <h3>
                      <span>Header 3</span>
                      The Life of Black Dashboard React
                    </h3>
                  </div>
                  <div className="typography-line">
                    <h4>
                      <span>Header 4</span>
                      The Life of Black Dashboard React
                    </h4>
                  </div>
                  <div className="typography-line">
                    <h5>
                      <span>Header 5</span>
                      The Life of Black Dashboard React
                    </h5>
                  </div>
                  <div className="typography-line">
                    <h6>
                      <span>Header 6</span>
                      The Life of Black Dashboard React
                    </h6>
                  </div>
                  <div className="typography-line">
                    <p>
                      <span>Paragraph</span>
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers. I
                      understand culture. I am the nucleus. I think that’s a
                      responsibility that I have, to push possibilities, to show
                      people, this is the level that things could be at.
                    </p>
                  </div>
                  <div className="typography-line">
                    <span>Quote</span>
                    <blockquote>
                      <p className="blockquote blockquote-primary">
                        "I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at."{" "}
                        <br />
                        <br />
                        <small>- Noaa</small>
                      </p>
                    </blockquote>
                  </div>
                  <div className="typography-line">
                    <span>Muted Text</span>
                    <p className="text-muted">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                    </p>
                  </div>
                  <div className="typography-line">
                    <span>Primary Text</span>
                    <p className="text-primary">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                    </p>
                  </div>
                  <div className="typography-line">
                    <span>Info Text</span>
                    <p className="text-info">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                    </p>
                  </div>
                  <div className="typography-line">
                    <span>Success Text</span>
                    <p className="text-success">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                    </p>
                  </div>
                  <div className="typography-line">
                    <span>Warning Text</span>
                    <p className="text-warning">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                    </p>
                  </div>
                  <div className="typography-line">
                    <span>Danger Text</span>
                    <p className="text-danger">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                    </p>
                  </div>
                  <div className="typography-line">
                    <h2>
                      <span>Small Tag</span>
                      Header with small subtitle <br />
                      <small>Use "small" tag for the headers</small>
                    </h2>
                  </div>
                  <div className="typography-line">
                    <span>Lists</span>
                    <Row>
                      <Col md="3">
                        <h5>Unordered List</h5>
                        <ul>
                          <li>List Item</li>
                          <li>List Item</li>
                          <li className="list-unstyled">
                            <ul>
                              <li>List Item</li>
                              <li>List Item</li>
                              <li>List Item</li>
                            </ul>
                          </li>
                          <li>List Item</li>
                        </ul>
                      </Col>
                      <Col md="3">
                        <h5>Ordered List</h5>
                        <ol>
                          <li>List Item</li>
                          <li>List Item</li>
                          <li>List item</li>
                          <li>List Item</li>
                        </ol>
                      </Col>
                      <Col md="3">
                        <h5>Unstyled List</h5>
                        <ul className="list-unstyled">
                          <li>List Item</li>
                          <li>List Item</li>
                          <li>List item</li>
                          <li>List Item</li>
                        </ul>
                      </Col>
                      <Col md="3">
                        <h5>Inline List</h5>
                        <ul className="list-inline">
                          <li className="list-inline-item">List1</li>
                          <li className="list-inline-item">List2</li>
                          <li className="list-inline-item">List3</li>
                        </ul>
                      </Col>
                    </Row>
                  </div>
                  <div className="typography-line">
                    <span>Code</span>
                    <p>
                      This is <code>.css-class-as-code</code>
                      , an example of an inline code element. Wrap inline code
                      within a <code>{`<code>...</code>`}</code>
                      tag.
                    </p>
                    <pre>
                      1. #This is an example of preformatted text.<br />
                      2. #Here is another line of code
                    </pre>
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

export default Dashboard;
