import React, { Component } from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL, FRONT_BASE_URL } from '../../index';

//COMPONENTS
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Badge, ModalBody, ModalFooter, ModalHeader, Button, Modal, Label, Input, FormGroup, CustomInput, Form, Row, Col } from 'reactstrap';
import Swal from 'sweetalert2';
import SimpleTooltip from "../General/SimpleTooltip";

//ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { idText } from 'typescript';

//SELECT FOR FILE CATEGORIES
function parseFileCategory(file_categories) {
  return file_categories.map((file_category) => {
    return { label: file_category.name, value: file_category.id };
  });
}

const validAlphanumericInput = RegExp(/^[A-Za-zÀ-ÖØ-öø-ÿ \0-9]+$/); //acepta numeros y letras y saltos de linea

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

export default class FileUpload extends Component {

  //CALL PARA SELECT 
  getFileCategories() {
    axios.get(API_BASE_URL + 'file_category')
      .then(res => this.setState({ file_categories: parseFileCategory(res.data) }));
  }

  constructor(props) {
    super(props);
    this.state = {
      file_categories: [],
      comentario: null,
      errors: {
        comentario: '',
      },
      fileData: String
    };
    this.addFormData = this.addFormData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }

  state = {
    modalArchivos: false,
  }

  //FileChange
  handleChange(file) {
    this.setState({
      fileData: file[0],
    })
  }

  //ERROR VALIDATION IN INPUTS
  handleInputs = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'comentario':
        errors.comentario =
          value.length === 0
            ? "La descripción del archivo es obligatorio."
            : "" ||
              validAlphanumericInput.test(value)
              ? ""
              : "El texto ingresado no es válido.";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  }

  //Form Submission
  addFormData(e) {

    e.preventDefault();

    if(validateForm(this.state.errors)) {

    let id = document.getElementById("id").value;
    let view = document.getElementById("view").value;
    let comentario = document.getElementById("comentario").value;
    let categoria = document.getElementById("file_category").value;

    if (categoria === 0 || comentario === '' || (this.state.fileData) === '') {
      Swal.fire(
        'ERROR!',
        'Verifica que todos los campos obligatorios estén completos.',
        'error'
      );
    } else {
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

      if (size <= 18874368) {
        if (type === "jpg" || type === "jpeg" || type === "png" ||
          type === "pdf" || type === "doc" || type === "docx" ||
          type === "xls" || type === "xlsx" || type === "ppt" || type === "pptx") {
          if (view == 2) {
            axios.post(API_BASE_URL + 'employee_files', fd
            ).then(res => {
              this.setState.modalArchivos = false;
              Swal.fire(
                '¡Listo!',
                'Documento cargado de manera exitosa.',
                'success',
              );
                setTimeout(() => { this.setState.modalArchivos= false; }, 2000);
                setTimeout(() => { window.location.reload(false); }, 3000);
                
            });
          } else if (view == 3) {
            axios.post(API_BASE_URL + 'employee_files', fd
            ).then(res => {
              this.setState.modalArchivos = false;
              Swal.fire(
                '¡Listo!',
                'Documento cargado de manera exitosa.',
                'success',
              );
            });
          } else if (view == 1) {
            axios.post(API_BASE_URL + 'beneficiary_files', fd
            ).then(res => {
              this.setState.modalArchivos = false;
              Swal.fire(
                '¡Listo!',
                'Documento cargado de manera exitosa.',
                'success',
              )
              setTimeout(() => { this.setState.modalArchivos= false; }, 2000);
              setTimeout(() => { window.location.reload(false); }, 3000);
            }
            );
          }

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
  }else{
    Swal.fire(
      '!ERROR!',
      'Verifica que todos los campos sean correctos.',
      'error'
    )
  }
  }

  componentDidMount() {
    this.getFileCategories();
  }

  render() {
    const { errors, formValid } = this.state;
    return (
      <div className="content">
        <Button color="primary" size="sm" id="subir" className="float-right" onClick={() => { this.setState({ modalArchivos: true }) }}><FontAwesomeIcon icon={faPlus} /></Button>
        <SimpleTooltip placement="top" target="subir">Añadir archivos</SimpleTooltip>
        <Modal isOpen={this.state.modalArchivos}>
          <Form onSubmit={this.onSubmit} autoComplete="off">
            <Row align="center"><Col md="12">
              <ModalHeader>
                <h3 className="title" align="center">Añadir Archivos</h3>
                <Badge color="primary"><p style={{ 'font-size': '15px', 'color': 'white' }} >Los campos marcados con un asterisco (*) son obligatorios.</p></Badge>
              </ModalHeader>
            </Col></Row>
            <ModalBody>
              <Input type="text" id="id" name="id" value={this.props.id} hidden></Input>
              <Input type="text" id="view" name="view" value={this.props.view} hidden></Input>
              <Row>
                <Col md="12">
                  <label htmlFor="file">* Carga de archivo:</label>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <input onChange={(e) => this.handleChange(e.target.files)} type="file" id="file" />
                </Col>
              </Row>
              <Badge color="info">* Recuerda subir un archivo o imagen .pdf, .jpg, .jpeg, .png, .doc/x, .xls/x o .ppt/x</Badge>

              <FormGroup>
                <Label htmlFor="file_category">* Categoría:</Label>
                <Input type="select" name="file_category" id="file_category" value={this.state.value} onChange={this.onChange}>
                  <option value="0" selected>Selecciona una opción...</option>
                  {this.state.file_categories.map((file_category) => <option key={file_category.value} value={file_category.value}>{file_category.label}</option>)}
                </Input>
              </FormGroup>

              <FormGroup>
                <Label for="comentario">* Descripción:</Label>
                <Input type="text" name="comentario" id="comentario" placeholder="Carga de acta de nacimiento" onChange={this.handleInputs}></Input>
                {errors.comentario.length > 0 && <span className='error'>{errors.comentario}</span>
                  ||
                  errors.comentario.length == 0 && <span className='error'>{errors.comentario}</span>}
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="info" onClick={() => this.setState({ modalArchivos: false })}>Cancelar</Button>
              <Button type="submit" onClick={this.addFormData}>Subir</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    )
  }
}