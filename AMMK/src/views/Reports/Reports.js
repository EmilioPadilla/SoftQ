import React, { Component } from 'react';

import axios from 'axios';
import { API_BASE_URL } from 'index';

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
  import Form from "react-bootstrap/Form";
import { createNoSubstitutionTemplateLiteral } from 'typescript';

library.add(fas)

const year = (new Date).getFullYear();

class Reports extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedType : "egresos",
            selectedCategory: 0,
            selectedheadquarter: 0,
            categories: [],
            headquarters: [],
            startDate: year + "-01-01",
            endDate: year + "-12-31",
            expenses: [],
            
        }
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onCalendarChange = this.onCalendarChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onHeadquarterChange = this.onHeadquarterChange.bind(this);
        this.printReport = this.printReport.bind(this);
        this.getCategories = this.getCategories.bind(this);
        this.getHeadquarters = this.getHeadquarters.bind(this);
        
    }

    printReport() {
        window.print()
    }

    getCategories() {
        axios.get(API_BASE_URL + "categories").then((resp) => {
            console.log(resp.data);
            this.setState({categories: resp.data});
        });
    }

    getHeadquarters() {
        axios.get(API_BASE_URL + "headquarters").then((resp) => {
            console.log(resp.data);
            this.setState({headquarters: resp.data});
        });
    }
    
    onCategoryChange(e) {
        e.preventDefault();
        this.setState({ selectedCategory: e.target.value });
    }

    onHeadquarterChange(e) {
        e.preventDefault();
        this.setState({ selectedHeadquarter: e.target.value });
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

    componentDidMount() {
        this.getCategories();
        this.getHeadquarters();
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
                <FormGroup className="float-right d-print-none">
                    <Input type="select" id="selectType" onChange={this.onTypeChange}>
                        <option value="egresos">Egresos</option>
                        <option value="ingresos">Ingresos</option>
                    </Input>
                </FormGroup>
                <h1 className="title">REPORTES</h1>
                <Row className="mb-3 d-flex align-items-center justify-content-center">
                    
                    <Col lg="2" className="d-flex align-items-center justify-content-center mr-4">
                        <FormGroup className="m-0">
                            <Input type="date" id="startDate" value={this.state.startDate}
                                name="startDate" onChange={this.onCalendarChange}></Input>
                        </FormGroup>
                    </Col>
                    <Col lg="2" className="d-flex align-items-center justify-content-center mr-5">
                        <FormGroup className="m-0">
                            <Input type="date" id="endDate" value={this.state.endDate}
                                name="endDate" onChange={this.onCalendarChange}></Input>
                        </FormGroup>
                    </Col>
                    {this.state.selectedType == "egresos" &&
                    <Col lg="2">
                        <FormGroup className="m-0">
                            <Input type="select" id="selectType" defaultValue={0} onChange={this.onCategoryChange}>
                                <option value={0} key={0}>Categoría</option>
                                {this.state.categories.map((el) => {
                                    return <option value={el.id} key={el.id}>{el.nombre}</option>;
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    }
                    {this.state.selectedType == "egresos" &&
                    <Col lg="2">
                        <FormGroup className="m-0">
                            <Input type="select" id="selectType" defaultValue={0} onChange={this.onHeadquarterChange}>
                                <option value={0} key={0}>Sede</option>
                                {this.state.headquarters.map((el) => {
                                    return <option value={el.id} key={el.id}>{el.nombre}</option>;
                                })}
                            </Input>
                        </FormGroup>
                    </Col>
                    }
                </Row>
                <Button className="mb-3" onClick={this.printReport}>Imprimir</Button>
                {this.state.selectedType == "ingresos" &&
                <div id="section-to-print">
                    <IncomesReport
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                    />
                </div>
                }
                {this.state.selectedType == "egresos" &&
                <div id="section-to-print">
                    <ExpensesReport
                        categoryId={this.state.selectedCategory}
                        headquarterId={this.state.selectedHeadquarter}
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                    />
                </div>
                }
            </div>
        )
    }
}

export default Reports;