import React, { Component, useState } from 'react';

// reactstrap components
import {Button, Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)

class TakeOutB extends Component {
    constructor() {
      super();
      this.state = {
        show: false
      }
    }
  
    handleModal() {
      this.setState({ show: !this.state.show });
    }
  
  
    render() {
      return (
        <React.StrictMode>
          <Modal className="modalOferta" show={this.state.show} onHide={() => this.handleModal()} centered>
            {/*<Modal.Header closeButton>
              <h6 className="modal-title">Registrar Oferta</h6>
            </Modal.Header>*/}
            <Modal.Body>
              <div class="row">
                <div class="col-12">
                  <center><h3>Datos de contacto</h3></center> <br/>
                  <p><strong>Nombre completo: </strong>
                  <p class="bigger-text">{this.props.nombre}</p></p>
                  <p>
                    <strong>Celular/Teléfono: </strong> <br/>
                    <p class="bigger-text">{this.props.cel}</p>
                  </p>
                  <p>
                    <strong>Correo: </strong> <br/>
                    <p class="bigger-text">{this.props.correo}</p>
                  </p>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </React.StrictMode>
      );
    }
  }
  
  export default TakeOutB;
