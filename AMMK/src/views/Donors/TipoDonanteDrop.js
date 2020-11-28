import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form} from 'react-bootstrap';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from 'index.js';

export default class TipoDonanteDrop extends Component {
  state = {
    tipo_de_donante: []
  }
  
  componentDidMount() {
    const url = API_BASE_URL + 'tipo_de_donante/';
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ tipo_de_donante: data })
      console.log(this.state.tipo_de_donante)
     })
  }

  render() {

    return (
       <div>
        <Form.Control as="select" custom>
        {this.state.tipo_de_donante.map((tipo_de_donante) => (
            <option>{tipo_de_donante.nombre} </option>
        ))}
        </Form.Control>
       </div>
    );
  }
}