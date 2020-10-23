import React from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//Components
import {Table, Button, Row} from 'reactstrap';
import ModifyTreatment from "../../views/Beneficiarias/ModifyTreatment";
import SimpleTooltip from '../../views/General/SimpleTooltip';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)
  
export default class TreatmentTable extends React.Component {
  state = {
    treatments: []
  }
  
  componentDidMount() {
    axios.get(API_BASE_URL + 'treatments')
      .then(res => {
        const treatments = res.data;
        this.setState({ treatments });
      })
  }
  
  deleteRow(id, e){
    axios.delete(API_BASE_URL + 'treatments/' + id)
      .then(res => {
        console.log(res);
        console.log(res.data);
  
        const treatments = this.state.treatments.filter(item => item.id !== id);
        this.setState({ treatments });
      })
  
  }

  render() {
    return (
      <div>
        <Table hover>
            <thead>
              <tr>
                  <th>Nombre medicamento</th>
                  <th>función</th>
                  <th>dosis</th>
                  <th>lapso</th>
                  <th>acciones</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.treatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td>{treatment.nombreMed}</td>
                  <td>{treatment.funcionMed}</td>
                  <td>{treatment.dosis} {treatment.mode_id}</td>
                  <td>{treatment.lapso}</td>
                  <td>
                    <Row>
                        <ModifyTreatment/>

                        <Button size="sm" id="eliminar" onClick={(e) => this.deleteRow(treatment.id, e)} color="danger"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                        <SimpleTooltip placement="top" target="eliminar" >Eliminar</SimpleTooltip>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
  
        </Table>
      </div>
    )
  }
} 