/*!

@Author: Emilio Padilla Miranda
@Date: Monday, October 19, 2020

*/

import React from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL, FRONT_BASE_URL } from 'index';

import SimpleTooltip from "../../views/General/SimpleTooltip";

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// reactstrap components
import {
  Table, 
  Alert,
  Button, 
  Row, 
  ModalBody, 
  ModalFooter, 
  ModalHeader,
  Modal, 
  Col
  } from "reactstrap";

  class TableEmployeeFiles extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        modalEliminar: false,
        modalDescargar: false,
        form:{
            id: '',
            categoria_id: '',
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
      axios.get(API_BASE_URL + 'employee_files/' + urlElements[5])
        .then(res => {
          const files = res.data;
          this.setState({ files });
        })
    }
  
    selectFile=(file)=>{
      this.setState({
        form: {
          id: file.id,
          employees_id: file.employees_id,
          categoria_id: file.categoria_id,
          comentario: file.comentario,
          path: file.path,
          created_at: file.created_at,
        }
      })
    }
  
    peticionDelete=()=>{
      axios.delete(API_BASE_URL + 'employee_files/' + this.state.form.id).then(response=>{
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
      url: API_BASE_URL + 'employee_files/downloadFile/' + this.state.form.id,
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
      let categories = ['No registrado', 'Ingreso', 'Egreso', 'Religioso', 'Escolar', 'salud', 'Imagen de ingreso', 'Imagen de egreso'];
        return (
          <Row>
            <Col md="12">
              <Table hover >
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
                      <td>{categories[file.category_id]}</td>
                      <td>{file.created_at.split("T")[0]}</td>
                      <td>
                      <Row>
                          <Col md="4">
                              <Button color="primary" size="sm" id="descargar" onClick={()=>{this.selectFile(file); this.setState({modalDescargar: true})}}><FontAwesomeIcon icon={['fas', 'download']} /></Button>
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
                <ModalBody>
                   ¿Estás segur@ que deseas eliminar el archivo?
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"onClick={()=>this.setState({modalEliminar: false})}>No</Button>
                  <Button color="danger" onClick={()=>this.peticionDelete()}>Sí</Button>
                </ModalFooter>
              </Modal>

              <Modal isOpen={this.state.modalDescargar}>
                      <ModalBody>
                        ¿Estás segur@ que deseas descargar el archivo?
                      </ModalBody>
                      <ModalFooter>
                        <Button color="primary"onClick={()=>this.setState({modalDescargar: false})}>No</Button>
                        <Button color="success" onClick={()=>this.peticionDownload(this.state.form)}>Sí</Button>
                      </ModalFooter>
              </Modal>

            </Col>
          </Row>
          
        );
    }
  }

  export default TableEmployeeFiles;
