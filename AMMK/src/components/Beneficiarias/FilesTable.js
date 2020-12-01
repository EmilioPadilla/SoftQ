import React from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import {Table, Button, Row, ModalBody, ModalFooter, Modal, Col, ModalHeader, Alert} from 'reactstrap';
import SimpleTooltip from '../../views/General/SimpleTooltip';
import Swal from 'sweetalert2';

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas)
  
export default class FilesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        modalEliminar: false,
        modalDescargar: false,
        form:{
            id: '',
            categoria: '',
            comentario: '',
            beneficiary_id: '',
            created_at:'',
            path: '',
        },
      files: [],
    }
  }
  
  componentDidMount() {
    this.getFiles();
  }
  
  getFiles() {
    let id = this.props.id;
    console.log(API_BASE_URL + 'beneficiary_files/' + id);
    axios.get(API_BASE_URL + 'beneficiary_files/' + id)
      .then(res => {
        const files = res.data;
        this.setState({ files });
        console.log(this.state);
      })
  }

  selectFile=(file)=>{
    this.setState({
      form: {
        id: file.id,
        beneficiary_id: file.beneficiary_id,
        categoria: file.categoria,
        comentario: file.comentario,
        path: file.path,
        created_at: file.created_at,
      }
    })
  }

  peticionDelete=()=>{
    axios.delete(API_BASE_URL + 'beneficiary_files/' + this.state.form.id).then(response=>{
        console.log(response);
        console.log(response.data);
      this.setState({modalEliminar: false});
      Swal.fire(
        'LISTO!',
        'El archivo fue eliminado de manera exitosa.',
        'success'
    )
      const files = this.state.files.filter(item => item.id !== this.state.form.id);
    this.setState({ files });
    })
  }

peticionDownload=()=>{
  axios({
    url: API_BASE_URL + 'beneficiary_files/downloadFile/' + this.state.form.id,
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', this.state.form.path);
    document.body.appendChild(link);
    link.click();
  });
  this.setState({modalDescargar: false});
}

  render() {
    return (
      <div>
        <Table hover>
            <thead>
              <tr>
                <th>Nombre de archivo</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.files.map((file) => (
                <tr key={file.id}>
                  <td>{file.path}</td>
                  <td>{file.comentario}</td>
                  <td>{file.categoria.name}</td>
                  <td>{file.created_at.split("T")[0]}</td>
                  <td>
                  <Row>
                                        <Col md="4">
                                            <Button color="info" size="sm" id="descargar" onClick={()=>{this.selectFile(file); this.setState({modalDescargar: true})}}><FontAwesomeIcon icon={['fas', 'download']} /></Button>
                                            <SimpleTooltip placement="top" target="descargar" >Descargar</SimpleTooltip>
                                        </Col>

                                        <Col md="4">
                                            <Button onClick={()=>{this.selectFile(file); this.setState({modalEliminar: true})}} size="sm" id="eliminar" color="danger"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
                                            <SimpleTooltip placement="top" target="eliminar" >Eliminar</SimpleTooltip>
                                        </Col>
                                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
  
        </Table>

        <Modal isOpen={this.state.modalEliminar}>
                <ModalHeader>
                <Alert align="center" color="danger">ATENCIÓN: ELIMINAR UN ARCHIVO ES UNA ACCIÓN PERMANENTE</Alert>
                </ModalHeader>
                <ModalBody align="center">
                   <p style={{'fontSize': '20px'}}>¿Estás segur@ que deseas eliminar el archivo?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="info" onClick={()=>this.setState({modalEliminar: false})}>Cancelar</Button>
                  <Button color="danger" onClick={()=>this.peticionDelete()}>Eliminar</Button>
                </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalDescargar}>
        <ModalBody align="center">
                   <p style={{'fontSize': '20px'}}>¿Estás segur@ que deseas descargar el archivo?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="info" onClick={()=>this.setState({modalDescargar: false})}>Cancelar</Button>
                  <Button color="primary" onClick={()=>this.peticionDownload(this.state.form)}>Descargar</Button>
                </ModalFooter>
        </Modal>

      </div>
    )
  }
} 
