import React, { Component } from 'react';

//COMPONENTS
import TablaNomina from "../../components/Nomina/TablaNomina";

export default class Nomina extends Component {
    render() {
        return (
            <div className="content">
                <h1 className="title">MI NÓMINA</h1>
                <TablaNomina/>
            </div>
        )
    }
}
