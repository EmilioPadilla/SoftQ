import React from "react";
//IMPORTING ICONS FROM thenounproject.com
import nomina from '../../images/nomina.png';
import beneficiarias from '../../images/beneficiarias.png';
import {FRONT_BASE_URL } from 'index';

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
        this.props.history.push('/login');
    }else if(idRol==2){
      this.props.history.push('/general/NurseIndex');
    }else if (idRol==1){
      this.props.history.push('/admin/Nomina/Nomina');
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
        <Col lg="6">
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
                          this.props.history.push('/admin/Beneficiarias/GeneralViewNurse');
                        }}>
                <img src={beneficiarias} alt="BENEFICIARIAS" width="260px" style={{'margin-bottom': '45px'}}></img>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6">
          <Card className="card-chart text-center">
            {/* <CardHeader>
              <CardTitle tag="h1">
                Beneficiarias
              </CardTitle>
            </CardHeader> */}
            <CardBody>
              <h1>MI NÓMINA</h1>
              <div className="chart-area" style={{'font-size': '170px', 'color': '#0474ac important!'}} onClick={(e) => {
                          e.preventDefault();
                          this.props.history.push('/admin/Nomina/Nomina');
                        }}>
                <img src={nomina} alt="MI NÓMINA" height="200px" style={{'margin-bottom': '20px'}}></img>
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
