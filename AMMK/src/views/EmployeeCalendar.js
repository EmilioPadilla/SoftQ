import React from "react";

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col
  } from "reactstrap";

import EmployeeCalendarTable from "components/EmployeeCalendarTable.js"

class EmployeeCalendar extends React.Component {


    render() {
        return (
            <div className="content">
              <Row>
                <Col md="12">
                  <Card>
                    <CardHeader>
                      <CardTitle tag="h4">Calendario del Empleado</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <EmployeeCalendarTable />
                    </CardBody>
                    <CardFooter>
                        <Row>
                            <Col md="12" align="right">
                            <a href="">
                            <button  className="btn btn-outline-primary">Guardar</button>
                            </a>  
                            </Col>
                        </Row>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
            </div>
        );
    }
}

export default EmployeeCalendar;