import React, { Component } from "react";
import axios from 'axios'
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.css';
import { API_BASE_URL } from 'index';

export default class CreateExpense extends Component {
    constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: '',
    }
  }

  onChangeExpenseName(e) {
    this.setState({name: e.target.value})
  }

  onChangeExpenseAmount(e) {
    this.setState({amount: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
     const expense = {
      name: this.state.name,
      amount: this.state.amount,
    };

    axios.post(API_BASE_URL+'expenses/', expense)
      .then(res => console.log(res.data));
    Swal.fire(
  		'Good job!',
  		'Expense Added Successfully',
  		'success'
		)

    this.setState({name: ''})
    this.setState({amount: ''})
  }

  render() {
    return (
      <div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Row>
            <Col>
             <Form.Group controlId="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={this.state.name} onChange=	{this.onChangeExpenseName}/>
             </Form.Group>
            </Col>

            <Col>
             <Form.Group controlId="Amount">
                <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" value={this.state.amount} onChange={this.onChangeExpenseAmount}/>
             </Form.Group>
            </Col>
        </Row>

        <Button variant="primary" size="lg" block="block" type="submit">
          Add Expense
        </Button>
      </Form>
    </div>
		);
  }
}
