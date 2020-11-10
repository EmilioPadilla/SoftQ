import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

class SimpleTooltip extends Component {
  state = {isOpen: false};

  toggle = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render () {
    
    const login = localStorage.getItem("isLoggedIn");
    const idRol = localStorage.getItem("idRol");
    //Redirect in case of wrong role or no login
    if (!login ) {
        window.location = "http://localhost:3000/login";
    }else if(idRol==2){
        window.location = "http://localhost:3000/general/NurseIndex";
    }else if (idRol==1){
        window.location = "http://localhost:3000/admin/Nomina/Nomina";
    }


    return <Tooltip isOpen={this.state.isOpen} toggle={this.toggle} {...this.props} />;
  }
}

export default SimpleTooltip;