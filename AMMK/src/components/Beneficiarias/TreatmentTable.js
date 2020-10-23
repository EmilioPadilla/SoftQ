import React from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//Components
import {Table, Button, Row, ModalBody, ModalFooter, Modal} from 'reactstrap';
import ModifyTreatment from "../../views/Beneficiarias/ModifyTreatment";
import SimpleTooltip from '../../views/General/SimpleTooltip';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)
  
export default class TreatmentTable extends React.Component {
  state = {
    treatments: [],
    modalEliminar: false,
    form:{
        id: '',
        nombreMed: '',
        funcionMed: '',
        dosis: '',
        mode_id:'',
        lapso: '',
        fechaInicio:'',
        fechaTermino: ''
    }
  }
  
  componentDidMount() {
    axios.get(API_BASE_URL + 'treatments')
      .then(res => {
        const treatments = res.data;
        this.setState({ treatments });
      })
  }
  
  peticionDelete=()=>{
    axios.delete(API_BASE_URL + 'medical_appointments/' + this.state.form.id).then(response=>{
        console.log(response);
        console.log(response.data);
      this.setState({modalEliminar: false});

      const appointments = this.state.appointments.filter(item => item.id !== this.state.form.id);
    this.setState({ appointments });
    })
  }

  seleccionarEmpresa=(treatment)=>{
    this.setState({
      form: {
        id: treatment.id,
        nombreMed: treatment.nombreMed,
        funcionMed: treatment.funcionMed,
        dosis: treatment.dosis,
        mode_id: treatment.mode_id,
        lapso: treatment.lapso,
        fechaInicio: treatment.fechaInicio,
        fechaTermino: treatment.fechaTermino
      }
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
                  <td>{treatment.dosis} {treatment.mode.nombre}</td>
                  <td>Cada {treatment.lapso} hrs</td>
                  <td>
                    <Row>
                        <ModifyTreatment/>

                        <Button size="sm" id="eliminar" onClick={()=>{this.seleccionarEmpresa(treatment); this.setState({modalEliminar: true})}} color="danger"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                        <SimpleTooltip placement="top" target="eliminar" >Eliminar</SimpleTooltip>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
  
        </Table>

        <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                   ¿Estás segur@ que deseas eliminar la consulta médica?
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"onClick={()=>this.setState({modalEliminar: false})}>No</Button>
                  <Button color="danger" onClick={()=>this.peticionDelete()}>Sí</Button>
                </ModalFooter>
        </Modal>

      </div>
    )
  }
} 