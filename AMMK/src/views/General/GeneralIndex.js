/*!

@Author: Emilio Padilla Miranda
@Date: Sunday, October 11, 2020

*/
import React from "react";
//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    return (
      <>
      <br/><br/><br/>
    <Col>
      <Row className="justify-content-md-center">
        <div className="photo" >
          <img
            alt="..."
            className="avatar"
            src={require("assets/img/logoAMMK.png")}
          />
        </div>
      </Row>
      <br/>
      <Row>
        <Col lg="4">
          <Card className="card-chart text-center">
            {/* <CardHeader>
              <CardTitle tag="h1">
                Beneficiarias
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              <h1>Beneficiarias</h1>
              <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                          e.preventDefault();
                          window.location.href='/admin/Beneficiarias/GeneralViewAdmin';
                        }}>
                <FontAwesomeIcon icon={['fas', 'users']} color="#3388a7"/>
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
              <h1>Empleados</h1>
              <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                          e.preventDefault();
                          window.location.href='/admin/search-employee';
                        }}>
                <FontAwesomeIcon icon={['fas', 'id-card']} color="#3388a7"/>
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
              <h1>Donantes</h1>
              <div className="chart-area" style={{'font-size': '170px'}}>
                <FontAwesomeIcon icon={['fas', 'hand-holding-medical']} color="#3388a7"/>
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
              <h1>Finanzas</h1>
              <div className="chart-area" style={{'font-size': '170px'}}>
                <FontAwesomeIcon icon={['fas', 'money-bill-wave']} color="#3388a7"/>
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
              <h1>Reportes</h1>
              <div className="chart-area" style={{'font-size': '170px'}}>
                <FontAwesomeIcon icon={['fas', 'file-export']} color="#3388a7"/>
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
              <h1>Cuentas</h1>
              <div className="chart-area" style={{'font-size': '170px'}} onClick={(e) => {
                          e.preventDefault();
                          window.location.href='/admin/Cuentas/principal';
                        }}>
                <FontAwesomeIcon icon={['fas', 'user-circle']} color="#3388a7"/>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Col>
<br/><br/>
    <Col>
      <Row>
        <Col>
        <Nav>
          <NavItem>
            Desarrollado por SOFTQ {new Date().getFullYear()} {" "} <i className="tim-icons icon-heart-2" /> Bienvenidos
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
