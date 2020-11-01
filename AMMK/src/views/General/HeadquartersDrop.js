import React, { Component} from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

export default class HeadquartersDrop extends Component {

  state = {
    headquarters: [],
    form:{
      fruit: "1",
    }
  }

  peticionGet=()=>{
    axios.get(API_BASE_URL + 'headquarters').then(response=>{
      this.setState({headquarters: response.data});
      console.log(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
    }    


  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        fuit: e.target.value
      }
    });
    console.log(this.state.form);
    }
  
  componentDidMount() {
    this.peticionGet();
  }

  render() {
    return (
       <div>
        <FormGroup>
          <Label for="sede">Filtrar por sede:</Label>
            <Input type="select" name="sede" id="sede">
            <option>Seleccionar sede...</option>
            {this.state.headquarters.map((headquarter) => (
                <option value={headquarter.id}>{headquarter.nombre}</option>
            ))}
            </Input>
        </FormGroup>
       </div>
    );
  }
}