import React from 'react';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

//Components
import {Table, Button, Col, Row, ModalBody, ModalFooter, Modal, ModalHeader, Alert} from 'reactstrap';
import SimpleTooltip from '../../views/General/SimpleTooltip';
import Swal from 'sweetalert2';

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
      startDate: props.startDate,
      endDate: props.endDate,
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
    this.getExpenses();
  }

  componentDidUpdate(prevProps) {
    if (this.props.categoryId != prevProps.categoryId || this.props.campusId != prevProps.campusId) {
        this.getExpenses();
    }
  }

  getExpenses() {
    const params = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      categoryId: this.props.categoryId,
      campusId: this.props.campusId
    }
    axios.post(API_BASE_URL + 'expenses/search', params)
      .then(res => {
        const expenses = res.data;
        const expensesTotal = this.formatter.format(
          res.data.reduce((accum,item) => accum + parseFloat(item.monto), 0)
        )
        this.setState({ expenses, expensesTotal });
        if (this.props.onChange) {
          this.props.onChange(this.state.expensesTotal);
        }
        console.log(this.state);
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

  peticionDelete=()=>{
    axios.delete(API_BASE_URL + 'expenses/' + this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
    })
    Swal.fire(
      'LISTO!',
      'El egreso fue eliminado de manera exitosa.',
      'success'
  )
  }
  
  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }


  render() {
    let months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
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
                  <td>{expense.fecha.split("-")[2]}-{months[expense.fecha.split("-")[1] - 1]}-{expense.fecha.split("-")[0]}</td>
                  <td>{expense.pagoA}</td>
                  <td>{expense.descripcion}</td>
                  <td>{this.formatter.format(expense.monto)}</td>
                  <td>{expense.category.nombre}</td>
                  <td>
                      <Row align="center">
                        <Col md="12">
                        <Button size="sm" id="eliminar" onClick={()=>{this.seleccionarEgreso(expense); this.setState({modalEliminar: true})}} color="danger"><FontAwesomeIcon icon={['fas', 'trash-alt']} /></Button>
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
                <Alert align="center" color="danger">ATENCIÓN: ELIMINAR UN EGRESO ES UNA ACCIÓN PERMANENTE</Alert>
                </ModalHeader>
                <ModalBody align="center">
                   <p style={{'fontSize': '20px'}}>¿Estás segur@ que deseas eliminar el egreso?</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="info"onClick={()=>this.setState({modalEliminar: false})}>Cancelar</Button>
                  <Button color="danger" onClick={()=>this.peticionDelete()}>Eliminar</Button>
                </ModalFooter>
        </Modal>
      </Col>
      </Row>
    )
  }
}

export default ExpensesTable;