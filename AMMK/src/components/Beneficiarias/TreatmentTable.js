import React from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import {Table, Button, Row, ModalBody, ModalFooter, Modal, Col} from 'reactstrap';
import ModifyTreatment from "../../views/Beneficiarias/ModifyTreatment";
import SimpleTooltip from '../../views/General/SimpleTooltip';
import Swal from 'sweetalert2';

//ICONS
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
    const {id} = this.props.id;
    axios.get(API_BASE_URL + 'treatments/' + id + '/med')
      .then(res => {
        const treatments = res.data;
        console.log(treatments);
        this.setState({ treatments });
      })
  }
  
  peticionDelete=()=>{
    axios.delete(API_BASE_URL + 'treatments/' + this.state.form.id).then(response=>{
        console.log(response);
        console.log(response.data);
      this.setState({modalEliminar: false});
      Swal.fire(
        'LISTO!',
        'El tratamiento fue eliminado de manera exitosa.',
        'success'
    )
      const treatments = this.state.treatments.filter(item => item.id !== this.state.form.id);
    this.setState({ treatments });
    })
  }

  selectTreatment=(treatment)=>{
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
    let months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
    return (
      <div>
        <Table hover>
            <thead>
              <tr>
                  <th>Nombre medicamento</th>
                  <th>Inicio</th>
                  <th>Fin</th>
                  <th>dosis</th>
                  <th>lapso</th>
                  <th>acciones</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.treatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td>{treatment.nombreMed}</td>
                  <td>{treatment.fechaInicio.split("-")[2]}-{months[treatment.fechaInicio.split("-")[1] - 1]}-{treatment.fechaInicio.split("-")[0]}</td>
                  <td>{treatment.fechaTermino.split("-")[2]}-{months[treatment.fechaTermino.split("-")[1] - 1]}-{treatment.fechaTermino.split("-")[0]}</td>
                  <td>{treatment.dosis} {treatment.mode.nombre}</td>
                  <td>Cada {treatment.lapso} hrs</td>
                  <td>
                    <Row>
                        <Col md="4">
                        <ModifyTreatment name={treatment.id}/>
                        </Col>

                        <Col md="4">
                        <Button size="sm" id="eliminar" onClick={()=>{this.selectTreatment(treatment); this.setState({modalEliminar: true})}} color="danger"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                        <SimpleTooltip placement="top" target="eliminar" >Eliminar</SimpleTooltip>
                        </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
  
        </Table>

        <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                   ¿Estás segur@ que deseas eliminar el tratamiento?
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