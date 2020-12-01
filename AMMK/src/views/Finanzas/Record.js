import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { API_BASE_URL, FRONT_BASE_URL } from '../../index';
import DropdownRecord from 'components/Finanzas/DropdownRecord';
import DropdownRecordExpenses from 'components/Finanzas/DropdownRecordExpenses';
// reactstrap components
import { Row, Col, Button} from 'reactstrap';

//API calls
import axios from 'axios';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)


export default class Record extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = {
          id: [],
          idExpenses:[],
        }
      }

     componentDidMount(){

         //Buttons for the incomes
        axios.get(API_BASE_URL + 'donaciones/table/getdates')
        .then(res => {
            var dateNew=res.data[0].fechaDonacion.slice(0,7);
            //Filter to avoid repeated months
            res.data.forEach(element => {
                var helper = element.fechaDonacion.slice(0, 7);
                if(helper.localeCompare(dateNew)!=0){
                    this.setState({
                        id: this.state.id.concat(dateNew)
                    });
                    dateNew=helper;
                }
            });

            this.setState({
                id: this.state.id.concat(dateNew)
             });
        })


        //Buttons for the expenses
        axios.get(API_BASE_URL + 'expenses/table/getdates')
        .then(res => {
            var dateNewExp=res.data[0].fecha.slice(0,7);
            //Filter to avoid repeated months
            res.data.forEach(element => {
                var helperExp = element.fecha.slice(0, 7);
                if(helperExp.localeCompare(dateNewExp)!=0){
                    this.setState({
                        idExpenses: this.state.idExpenses.concat(dateNewExp)
                    });
                    dateNewExp=helperExp;
                }
            });

            this.setState({
                idExpenses: this.state.idExpenses.concat(dateNewExp)
            });
        })
      
    }



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
            <div className="content">
                <h1 className="title">FINANZAS</h1>
                <Row>
                    <Col md="6" align="center">
                        <h3 className="title">Ingresos</h3>
                        <div class="overflow-auto" style={ { height: 500 } }>
                            {this.state.id.map((fecha) =>(
                                <Row key={fecha} align="center">
                                    <Col md="12" align="center">
                                        <DropdownRecord id={fecha} align="center"/>
                                    </Col>
                                </Row>
                            ))}
                        </div>                        
                    </Col>
                    <Col md="6" align="center">
                        <h3 className="title">Egresos</h3>
                        <div class="overflow-auto" style={ { height: 500 } }>
                            {this.state.idExpenses.map((fechaExp,index) =>(
                                <Row key={index} align="center">
                                    <Col md="12" align="center">
                                        <DropdownRecordExpenses id={fechaExp} align="center"/>
                                    </Col>
                                </Row>
                            ))}
                        </div>   
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <div class="fixed-bottom"  style={{margin: '15px'}}>
                <Link to='../Finanzas/MonthlyView'>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button color="primary" id="regresar"><FontAwesomeIcon icon={['fas', 'arrow-circle-left']}/>&nbsp;Regresar</Button>
              </Link>
            </div>
            </div>
        )
    }
}
