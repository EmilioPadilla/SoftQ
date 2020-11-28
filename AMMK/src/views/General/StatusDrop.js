import React, { Component, useState} from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

//API CALLS
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from '../../index';

export default class StatusDrop extends Component {

  state = {
    status: []
  }

  peticionGet=()=>{
    axios.get(API_BASE_URL + 'status').then(response=>{
      this.setState({status: response.data});
      console.log(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
    }    
  
  componentDidMount() {
    this.peticionGet();
  }

  render() {
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
        window.location = FRONT_BASE_URL+"login";
    }else if(idRol==2){
        window.location = FRONT_BASE_URL+"general/NurseIndex";
    }else if (idRol==1){
        window.location = FRONT_BASE_URL+"admin/Nomina/Nomina";
    }
    return (
       <div>
        <FormGroup>
          <Label for="status">Estatus</Label>
            <Input type="select" name="status" id="status">
            {this.state.status.map((status) => (
                <option value={status.id}>{status.nombre}</option>
            ))}
            </Input>
        </FormGroup>
       </div>
    );
  }
}