import React, { Component } from 'react';

// reactstrap components
import { Row, Col} from 'reactstrap';

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

export default class Record extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">FINANZAS</h1>
                <Row>
                    <Col md="6">
                        <h3 className="title">Ingresos</h3>
                    </Col>
                    <Col md="6">
                        <h3 className="title">Egresos</h3>
                    </Col>
                </Row>
            </div>
        )
    }
}
