import React, { Component, useState} from 'react';
import {Dropdown, DropdownMenu, DropdownItem, DropdownToggle} from 'reactstrap';

//API CALLS
import axios from 'axios';
import { API_BASE_URL } from '../../index';

export default class StatusDrop extends Component {
    
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            actions: [],
            dropDownValue: 'Select action',
            dropdownOpen: false
        };
    }

    toggle(event) {

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeValue(e) {
        this.setState({dropDownValue: e.currentTarget.textContent});
        let id = e.currentTarget.getAttribute("id");
        console.log(id);
    }

  state = {
    status: []
  }
  
  componentDidMount() {
    const url = API_BASE_URL + 'status/';
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ status: data })
      console.log(this.state.status)
     }).bind(this);
  }

  render() {
    return (
       <div>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
        {this.state.dropDownValue}
        </DropdownToggle>
        <DropdownMenu>
        {this.state.status.map((status) => (
            <DropdownItem header>{status.nombre}</DropdownItem>
        ))}
        </DropdownMenu>
        </Dropdown>
       </div>
    );
  }
}