import React, { Component } from 'react';

export default class RegisterB3 extends Component {
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
                    <Link to='/admin/RegisterB2'>
                    <button type="submit" className="btn btn-primary">Anterior <i class="fas fa-arrow-circle-left"></i></button>
                    </Link>
                    </Col>
                    <Col  md="6" align="right">
                    <Link>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                    </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}