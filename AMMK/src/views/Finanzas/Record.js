import React, { Component } from 'react';
import { API_BASE_URL } from '../../index';
import DropdownRecord from 'components/Finanzas/DropdownRecord';
// reactstrap components
import { Row, Col} from 'reactstrap';

//API calls
import axios from 'axios';


export default class Record extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = {
          id: [],
        }
      }

     componentWillMount(){
        axios.get(API_BASE_URL + 'donaciones/table/getdates')
      .then(res => {
        var dateNew=res.data[0].fechaDonacion.slice(0,7);
        //Filter to avoid repeated months
        res.data.forEach(element => {
            var helper = element.fechaDonacion.slice(0, 7);
            if(helper!=dateNew){
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
                <h1 className="title">FINANZAS</h1>
                <Row>
                    <Col md="6" align="center">
                        <h3 className="title">Ingresos</h3>
                        <div class="overflow-auto" style={ { height: 400 } }>
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
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
        )
    }
}
