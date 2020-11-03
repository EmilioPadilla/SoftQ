import React from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//Components
import { Link } from "react-router-dom";
import {Table, Button, Col, Row, ModalBody, ModalFooter, Modal} from 'reactstrap';
import SimpleTooltip from '../../views/General/SimpleTooltip';

//Importing Icon library
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas)
  
class ExpensesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expenses: [],
      expensesTotal: null,
      modalEliminar: false,
      form:{
          id: '',
          fecha: '',
          pagoA: '',
          descripcion: '',
          monto: '',
          category_id: '',
          totalExpenses: null
      }
    }
    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });
  }
  
  
  componentDidMount() {
    let id = this.props.dataFromParent;
    console.log(id);
    axios.get(API_BASE_URL + 'expenses/')
      .then(res => {
        const expenses = res.data;
        const expensesTotal = this.formatter.format(
          res.data.reduce((accum,item) => accum + parseFloat(item.monto), 0)
        )
        this.setState({ expenses, expensesTotal });
        if (this.props.onChange) {
          this.props.onChange(this.state.expensesTotal);
        }
      })
  }

  seleccionarEgreso=(expense)=>{
    this.setState({
      form: {
        id: expense.id,
        fecha: expense.fecha,
        pagoA: expense.pagoA,
        descripcion: expense.descripcion,
        monto: expense.monto,
        category_id: expense.category_id,
      }
    })
  }

  peticionGet=()=>{
    axios.get(API_BASE_URL + 'expenses').then(response=>{
      this.setState({
        data: response.data
      });
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionDelete=()=>{
    axios.delete(API_BASE_URL + 'expenses/' + this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }


  render() {
    return (
      <Row>
      <Col md="12">
        <Table hover>
            <thead>
              <tr>
                  <th>Fecha</th>
                  <th>Pago a</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
              </tr>
            </thead>
  
            <tbody>
              {this.state.expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.fecha}</td>
                  <td>{expense.pagoA}</td>
                  <td>{expense.descripcion}</td>
                  <td>{expense.monto}</td>
                  <td>{expense.category.nombre}</td>
                  <td>
                      <Row>
                        <Button size="sm" id="eliminar" onClick={()=>{this.seleccionarEgreso(expense); this.setState({modalEliminar: true})}} color="danger"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
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
      </Col>
      </Row>
    )
  }
}

export default ExpensesTable;