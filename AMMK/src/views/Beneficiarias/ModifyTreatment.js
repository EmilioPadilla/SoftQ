import React, { Component } from 'react';

//COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, Col, Label, Input, FormGroup, Row, Button, Form, ModalHeader, Badge} from 'reactstrap';
import Swal from 'sweetalert2';

//API CALLS
import axios from "axios";
import { API_BASE_URL } from '../../index';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)

export default class ModifyTreatment extends Component {
  
  constructor(props){
    super(props);
    this.state = {
        fechaInicio: '',
        fechaTermino: '',
        treatments: [],
      };

    this.onChangeFechaInicio = this.onChangeFechaInicio.bind(this);
    this.onChangeFechaTermino = this.onChangeFechaTermino.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
}

  state={
    modalEditar: false,
  }

  onChangeFechaInicio(e) {
    this.setState({ fechaInicio: e.target.value })
  }

  onChangeFechaTermino(e) {
    this.setState({ fechaTermino: e.target.value })
  }

  componentDidMount() {
    let id = this.props.id;
    console.log(id);
    axios.get(API_BASE_URL + 'treatments/' + id)
    .then(res => {
      this.setState({
        fechaInicio: res.data.fechaInicio,
        fechaTermino: res.data.fechaTermino,
      });
        const treatments = res.data;
        this.setState({ treatments });
        console.log(treatments);
      })
  }
    
onSubmit(e){
    
    e.preventDefault()

    //Agarrar los valores 
    let id = document.getElementById("id").value;
    let beneficiary_id = document.getElementById("beneficiary_id").value;
    let nombreMed = document.getElementById("nombreMed").value;
    let funcionMed = document.getElementById("funcionMed").value;
    let dosis = document.getElementById("dosis").value;
    let mode_id = document.getElementById("mode_id").value;
    let lapso = document.getElementById("lapso").value;
    let fechaInicio = document.getElementById("fechaInicio").value;
    let fechaTermino = document.getElementById("fechaTermino").value;

    if(fechaInicio !== ''){
    const treatment = {
        id: id,
        beneficiary_id: beneficiary_id,
        funcionMed: funcionMed,
        nombreMed: nombreMed,
        dosis: dosis,
        mode_id: mode_id,
        lapso: lapso,
        fechaInicio: fechaInicio,
        fechaTermino: fechaTermino,
    };
    axios.put(API_BASE_URL + "treatments/" + id, treatment).then(res => {console.log(res)});
    
    Swal.fire(
        '¡Listo!',
        'Tratamiento modificado de manera exitosa',
        'success',
        ).then(function() {
            window.location = "http://localhost:3000/admin/Beneficiarias/MedicalRecordView/" + beneficiary_id;
        });
        }else{
            Swal.fire(
                'ERROR!',
                'Verifica que los campos obligatorios estén llenos',
                'error'
            )
        }
    
}


  render(){
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
    const {errors, formValid} = this.state;
  return (
    <div className="content">
      <Button color="secondary" size="sm" onClick={()=>{this.setState({modalEditar: true})}}><FontAwesomeIcon icon={['fas', 'pencil-alt']} /></Button>

          <Modal isOpen={this.state.modalEditar}>
          <Form onSubmit={this.onSubmit} autocomplete="off">
          <ModalHeader>
            <h3 className="title">MODIFICAR TRATAMIENTO</h3>
            <Badge color="primary"><p style={{'font-size': '15px'}} >Los campos marcados con un asterisco (*) son obligatorios.</p></Badge>
          </ModalHeader>
          <ModalBody>
                  <Row>
                    <Col md="12">
                    {this.state.treatments.map((treatment) => (
                <>
                            <Input type="text" id="id" name="id" value={treatment.id} ></Input>
                            <Input type="text" id="beneficiary_id" name="beneficiary_id" value={treatment.beneficiary_id} ></Input>
                            <Input type="text" id="nombreMed" name="nombreMed" value={treatment.nombreMed} hidden></Input>
                            <Input type="text" id="funcionMed" name="funcionMed" value={treatment.funcionMed} hidden></Input>
                            <Input type="text" id="dosis" name="dosis" value={treatment.dosis} hidden></Input>
                            <Input type="text" id="mode_id" name="mode_id" value={treatment.mode_id} hidden></Input>
                            <Input type="text" id="lapso" name="lapso" value={treatment.lapso} hidden></Input>

                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                            <Label for="fechaInicio">&nbsp;Fecha de inicio:</Label>
                            <Input type="date" id="fechaInicio" name="fechaInicio" value={treatment.fechaInicio} onChange={this.onChangeFechaInicio} ></Input>
                        </FormGroup>
                        <FormGroup>
                            <FontAwesomeIcon icon={["fas", "calendar-alt"]} />
                            <Label for="fechaTermino">&nbsp;Fecha de finalización:</Label>
                            <Input type="date" id="fechaTermino" name="fechaTermino" value={this.state.fechaTermino} onChange={this.onChangeFechaTermino}></Input>
                        </FormGroup>
                        </>
                ))}
                    </Col>
                </Row>
        </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={()=>this.setState({modalEditar: false})}>Cancelar</Button>
              <Button color="secondary" type="submit">Modificar</Button>
            </ModalFooter>
            </Form>
          </Modal>
  </div>
  );
}
}