import React from 'react';
import { Link } from "react-router-dom";

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//COMPONENTS
import {Table, Button, Row, ModalBody, ModalFooter, Modal, Col} from 'reactstrap';
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
    let urlElements = window.location.href.split('/');
    axios.get(API_BASE_URL + 'benef_files/' + urlElements[6])
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
    axios.delete(API_BASE_URL + 'benef_files/' + this.state.form.id).then(response=>{
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
                  <td>{file.categoria}</td>
                  <td>{file.created_at.split("T")[0]}</td>
                  <td>
                  <Row>
                                        <Col md="4">
                                            <Button color="info" size="sm" id="verArchivo"><FontAwesomeIcon icon={['fas', 'eye']} /></Button>
                                            <SimpleTooltip placement="top" target="verArchivo" >Ver archivo</SimpleTooltip>
                                        </Col>

                                        <Col md="4">
                                            <Button color="primary" size="sm" id="descargar"><FontAwesomeIcon icon={['fas', 'download']} /></Button>
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
                <ModalBody>
                   ¿Estás segur@ que deseas eliminar el archivo?
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
