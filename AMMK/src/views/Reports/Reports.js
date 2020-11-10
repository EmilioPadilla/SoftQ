import React, { Component } from 'react';
import axios from 'axios';

// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// internal components
import GroupedIncomesTable from "../../components/Reportes/GroupedIncomesTable";
import IncomesReport from "../../components/Reportes/IncomesReport";
import ExpensesReport from "../../components/Reportes/ExpensesReport";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// reactstrap components
import {
    Button,
    FormGroup,
    Input,
    Row,
    Col
  } from "reactstrap";
import { createNoSubstitutionTemplateLiteral } from 'typescript';

library.add(fas)

const year = (new Date).getFullYear();

class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedType : "ingresos",
            startDate: year + "-01-01",
            endDate: year + "-12-31",
            chartIncomes: [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130],
            expenses: []
        }
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onCalendarChange = this.onCalendarChange.bind(this);
    }

    onTypeChange(e) {
        e.preventDefault();
        this.setState({ selectedType: e.target.value });
    }

    onCalendarChange(e) {
        e.preventDefault();
        console.log(e.target.name);
        if (e.target.name == "startDate"){
            this.setState({ startDate: e.target.value });
        } else if (e.target.name == "endDate") {
            this.setState({ endDate: e.target.value });
        }
        console.log(this.state);
    }

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
            <div className="content">
                <FormGroup className="float-right">
                    <Input type="select" id="selectType" onChange={this.onTypeChange}>
                        <option value="ingresos">Ingresos</option>
                        <option value="egresos">Egresos</option>
                    </Input>
                </FormGroup>
                <h1 className="title">REPORTES</h1>
                <Row className="mb-3 d-flex justify-content-center justify-content-center">
                    <Col lg="2" className="d-flex align-items-center  justify-content-center">
                        <FormGroup className="m-0">
                            <Input type="date" id="startDate" value={this.state.startDate}
                                name="startDate" onChange={this.onCalendarChange}></Input>
                        </FormGroup>
                    </Col>
                    <Col lg="1" className="d-flex align-items-center justify-content-center">
                        <p className="m-0 text-center">-</p>
                    </Col>
                    <Col lg="2" className="d-flex align-items-center  justify-content-center">
                        <FormGroup className="m-0">
                            <Input type="date" id="endDate" value={this.state.endDate}
                                name="endDate" onChange={this.onCalendarChange}></Input>
                        </FormGroup>
                    </Col>
                </Row>
                {this.state.selectedType == "ingresos" && 
                <IncomesReport
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
                }
                {this.state.selectedType == "egresos" && 
                <ExpensesReport
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                />
                }
            </div>
        )
    }
}

export default Reports;