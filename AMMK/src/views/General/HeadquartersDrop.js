import React, { Component} from 'react';
import {FormGroup, Label, Input} from 'reactstrap';

//API CALLS
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from '../../index';

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