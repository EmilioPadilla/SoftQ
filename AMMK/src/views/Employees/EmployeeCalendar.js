/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
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

import EmployeeCalendarTable from "components/Employees/EmployeeCalendarTable.js"
import { API_BASE_URL, FRONT_BASE_URL } from 'index';


class EmployeeCalendar extends React.Component {


    render() {
      const login = localStorage.getItem("isLoggedIn");
      const idRol = localStorage.getItem("idRol");
      //Redirect in case of wrong role or no login
          if (!login ) {
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
    }
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
