import React, { Component } from 'react';

//COMPONENTS
import {Table} from 'reactstrap';

export default class TablaNomina extends Component {
    render() {
        return (
            <div>
                <Table hover>
                    <thead>
                    <tr>
                        <th>Periodo</th>
                        <th>Días laborados</th>
                        <th>Percepciones</th>
                        <th>Deducciones</th>
                        <th>Total</th>
                        <th>Faltas</th>
                        <th>Retardos</th>
                    </tr>
                    </thead>
        
                    <tbody>
                    </tbody>
        
                </Table>
            </div>
        )
    }
}
