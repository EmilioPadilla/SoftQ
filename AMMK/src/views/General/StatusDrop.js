import React, { Component, useState} from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

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
    return (
       <div>
        <FormGroup>
          <Label for="status">Estatus</Label>
            <Input type="select" name="status" id="status">
            {this.state.status.map((status) => (
                <option value="${status.id}">{status.nombre}</option>
            ))}
            </Input>
        </FormGroup>
       </div>
    );
  }
}