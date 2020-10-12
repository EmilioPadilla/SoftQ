import React, { Component } from 'react';
import { Card, CardHeader, CardBody, Form, Row } from 'reactstrap';


export default class RegisterB2 extends Component {
    render() {
        return (
            <div className="content">
                <Card>
                    <CardHeader>

                    </CardHeader>
                    <CardBody>
                        <Form>

                        </Form>
                    </CardBody>
                </Card>
                <Row>
                    <Col  md="6" align="left">
                    <Link to='/admin/RegisterB1'>
                    <button type="submit" class="btn btn-primary">Anterior <i class="fas fa-arrow-circle-left"></i></button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link to='/admin/RegisterB3'>
                    <button type="submit" class="btn btn-primary">Siguiente <i class="fas fa-arrow-circle-right"></i></button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}