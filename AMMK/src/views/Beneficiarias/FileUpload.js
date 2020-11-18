import React, { Component } from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalBody, ModalFooter, ModalHeader, Button, Modal, Label, Input, FormGroup, CustomInput, Form, Row, Col} from 'reactstrap';
import Swal from 'sweetalert2';
import SimpleTooltip from "../General/SimpleTooltip";

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus } from '@fortawesome/free-solid-svg-icons';

export default class FileUpload extends Component
{
  constructor(props){
    super(props);
    this.state = {
      fileData : String
    };
    this.addFormData = this.addFormData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state={
    modalReingresar: false,
  }

  //FileChange
  handleChange(file){
    this.setState({ 
      fileData: file[0],
    })
  }

  //Form Submission
  addFormData(e){
    
    e.preventDefault();
    
    const fd = new FormData();
    fd.append('file', this.state.fileData);
      axios.post(API_BASE_URL + 'benef_files', fd
      ).then(res=>{
    Swal.fire(
      '¡Listo!',
      'Archivo cargado de manera exitosa',
      'success'
      );
      }
      );
      this.setState.modalReingresar = false;
  }
  
  render(){
    return (
      <div className="content">
        <Button color="primary" size="sm" id="subir" className="float-right" onClick={()=>{this.setState({modalReingresar: true})}}><FontAwesomeIcon icon={faPlus}/></Button>
        <SimpleTooltip placement="top" target="subir">Subir archivos</SimpleTooltip>

        <Modal isOpen={this.state.modalReingresar}>
        <ModalHeader>
        <h3 className="title">SUBIR ARCHIVOS</h3>
        </ModalHeader>
        <Form onSubmit={this.onSubmit} autoComplete="off">
                <ModalBody> 
                <Input type="text" id="id" name="id" value={this.props.id} hidden></Input>
                <Row>
                <Col md="12">
               <label htmlFor="file">Carga de archivo:</label>
               </Col>
               </Row>
               <Row>
                 <Col md="12">
               <input onChange={ (e) => this.handleChange(e.target.files) } type="file" id="file"/>
                </Col>
               </Row>

                <FormGroup>
                  <Label for="comentario">Descripción:</Label>
                  <Input type="text" name="comentario" id="comentario" placeholder="Carga de acta de nacimiento"></Input>
                </FormGroup>

                </ModalBody>
                <ModalFooter>
                <Button color="info" onClick={()=>this.setState({modalReingresar: false})}>Cancelar</Button>
                <Button type="submit" onClick={this.addFormData}>Subir</Button>
                </ModalFooter>
        </Form>
        </Modal>
      </div>   
  )
  }
}