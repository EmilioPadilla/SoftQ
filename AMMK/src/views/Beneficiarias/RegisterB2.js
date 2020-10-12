import React, { Component } from 'react';
import { Link } from "react-router-dom";

// reactstrap components
import { Card, CardHeader, CardBody, Form, Row, Progress, Alert, Col} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

export default class RegisterB2 extends Component {
    render() {
        return (
            <div className="content">
                <h2 className="title">Registrar Beneficiaria</h2>
                <Card>
                    <CardHeader>
                        <h3 className="title">Datos de ingreso</h3>
                        <Progress striped color="info" value="66.66"></Progress>
                        <br></br>
                        <Alert color="light">Los campos marcados con un asterisco (*) son obligatorios.</Alert>
                    </CardHeader>
                    <CardBody>
                        <Form>

                        </Form>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/Beneficiarias/RegisterB1'>
                    <button type="submit" class="btn btn-primary">Anterior <i class="fas fa-arrow-circle-left"></i></button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link to='/admin/Beneficiarias/RegisterB3'>
                    <button type="submit" class="btn btn-primary">Siguiente <i class="fas fa-arrow-circle-right"></i></button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}