/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";
//IMPORTING ICONS FROM thenounproject.com
import donantes1 from '../../images/donantes1.png';
import beneficiarias from '../../images/beneficiarias.png';
import employees from '../../images/employees.png';
import finanzas from '../../images/finanzas.png';
import reportes from '../../images/reportes.png';
import cuentas from '../../images/cuentas.png'

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
} from "reactstrap";


class GeneralIndex extends React.Component {
  render() {
        const login = localStorage.getItem("isLoggedIn");
        const idRol = localStorage.getItem("idRol");
        //Redirect in case of wrong role or no login
        if (!login ) {
            window.location = "http://localhost:3000/login";
        }else if(idRol==2){
            window.location = "http://localhost:3000/general/NurseIndex";
        }else if (idRol==1){
            window.location = "http://localhost:3000/admin/Nomina/Nomina";
        }
    return (
      <>
      <br/><br/><br/>
    <Col>
      <Row className="justify-content-md-center">
          <h1 style={{'font-size': '70px'}}>ASOCIACIÓN</h1>
      </Row>
      <Row className="justify-content-md-center">
      <h1 style={{'font-size': '70px'}}>MAXIMILIANO MARÍA KOLBE</h1>
      </Row>
      <br/>
      <div className="container">
      <Row>
        <Col lg="4">
          <Card className="card-chart text-center">
            {/* <CardHeader>
              <CardTitle tag="h1">
                Beneficiarias
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              <h1>BENEFICIARIAS</h1>
              <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                          e.preventDefault();
                          window.location.href='/admin/Beneficiarias/GeneralViewAdmin';
                        }}>
                <img src={beneficiarias} alt="BENEFICIARIAS" width="260px" style={{'margin-bottom': '45px'}}></img>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart text-center">
            {/* <CardHeader>
              <CardTitle tag="h1">
                Beneficiarias
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              <h1>EMPLEADOS</h1>
              <div className="chart-area" style={{'font-size': '170px', 'color': '#0474ac important!'}} onClick={(e) => {
                          e.preventDefault();
                          window.location.href='/admin/search-employee';
                        }}>
                <img src={employees} alt="EMPLEADOS" height="200px" style={{'margin-bottom': '20px'}}></img>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart text-center">
            {/* <CardHeader>
              <CardTitle tag="h1">
                Beneficiarias
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              <h1>DONANTES</h1>
              <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                          e.preventDefault();
                          window.location.href='/admin/ViewDonors';
                        }}>
                <img src={donantes1} alt="DONANTES" width="220px" style={{'margin-bottom': '40px'}}></img>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <Card className="card-chart text-center">
            {/* <CardHeader>
              <CardTitle tag="h1">
                Beneficiarias
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              <h1>FINANZAS</h1>
              <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                          e.preventDefault();
                          window.location.href='/admin/Finanzas/MonthlyView';
                        }}>
                <img src={finanzas} alt="FINANZAS" height="220px" style={{'margin-bottom': '55px'}}></img>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart text-center">
            {/* <CardHeader>
              <CardTitle tag="h1">
                Beneficiarias
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              <h1>REPORTES</h1>
              <div className="chart-area" style={{'font-size': '170px'}}>
              <img src={reportes} alt="REPORTES" width="180px" style={{'margin-bottom': '55px'}}></img>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart text-center">
            {/* <CardHeader>
              <CardTitle tag="h1">
                Beneficiarias
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              <h1>CUENTAS</h1>
              <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                          e.preventDefault();
                          window.location.href='/admin/Cuentas/principal';
                        }}>
                <img src={cuentas} alt="CUENTAS" width="350px" style={{'margin-bottom': '45px'}}></img>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      </div>
    </Col>
<br/><br/>

    <Col>
      <Row>
        <Col>
        <Nav>
          <NavItem>
            Desarrollado por SOFTQ {new Date().getFullYear()} {" "} <i className="tim-icons icon-heart-2" />
          </NavItem>
        </Nav>
        </Col>
      </Row>
    </Col>

      </>
    );
  }
}
export default GeneralIndex;
