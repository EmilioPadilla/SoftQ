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
import { idText } from 'typescript';

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

    let id = document.getElementById("id").value;
    let comentario = document.getElementById("comentario").value;
    let categoria = document.getElementById("categoria").value;
    const fd = new FormData();
    fd.append('id', id);
    fd.append('comentario', comentario);
    fd.append('categoria', categoria);
    fd.append('file', this.state.fileData);

    //GET FILE TYPE
    let splitName = (fd.get('file').name).split(".");
    let type = splitName[1];
    console.log(type);
    
    //GET SIZE
    let size = (fd.get('file').size);
    console.log(size);

    if(size <= 18874368){
      if (type === "jpg" || type === "jpeg" || type === "png" || 
          type === "pdf" || type === "doc" || type === "docx" || 
          type === "xls" || type === "xlsx" || type === "ppt" || type === "pptx") { 
            axios.post(API_BASE_URL + 'benef_files', fd
            ).then(res=>{
              this.setState.modalReingresar = false;
              Swal.fire(
                '¡Listo!',
                'Documento cargado de manera exitosa',
                'success',
                ).then(function() {
                    window.location = ("http://localhost:3000/admin/Beneficiarias/SpecificView/" + id);
                });
            }
            );
      } else {
        Swal.fire(
          'ERROR!',
          'Sólo se permiten archivos .pdf, doc/x, xls/x, ppt/x o imágenes .png, .jpg y .jpeg',
          'error'
        );
      }
    } else {
      Swal.fire(
        'ERROR!',
        'El archivo debe ser menor a 18 MB',
        'error'
      );
    }
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
                  <Label for="categoria">Categoria:</Label>
                  <Input type="text" name="categoria" id="categoria" placeholder="Ingreso"></Input>
                </FormGroup>

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