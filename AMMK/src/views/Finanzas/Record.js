import React, { Component } from 'react';
import DropdownRecord from 'components/Finanzas/DropdownRecord';
// reactstrap components
import { Row, Col} from 'reactstrap';

//API calls
import axios from 'axios';
import { API_BASE_URL } from 'index';

export default class Record extends Component {
     id=[1,2,3,4,5];
     idPush (){
         this.id.push(6);
     }
    render() {
        this.idPush();
        return (
            <div className="content">
                <h1 className="title">FINANZAS</h1>
                <Row>
                    <Col md="6" align="center">
                        <h3 className="title">Ingresos</h3>
                        <div class="overflow-auto" style={ { height: 400 } }>
                            {this.id.map((number) =>(
                                <Row key={number} align="center">
                                    <Col md="12" align="center">
                                        <DropdownRecord id={number} align="center"/>
                                    </Col>
                                </Row>
                            ))}
                        </div>                        
                    </Col>
                    <Col md="6" align="center">
                        <h3 className="title">Egresos</h3>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
        )
    }
}
